import {
    Box,
    Input,
    useToast,
    Button,
    Center,
    Spinner,
    useDisclosure,
    Link,
    Text,
} from '@chakra-ui/react';
import { web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { AiImageGeneratorElementType, SavedAiImageType } from '@/utils/types';
import { getSavedAiImage } from '@/utils/accounts';
import { aiImageGeneratorCounterSeed } from '@/utils/seeds';
import {
    getUseGeneratorTryErrorAlert,
    loadAiImageErrorAlert,
    loadTimeAiImageErrorAlert,
} from '@/utils/alerts';
import {
    aiImgPlaceholder,
    MAX_LOAD_AI_IMG_RETRY_COUNT,
} from '@/utils/constants';

import { useWorkspace } from './WorkspaceProvider';
import SaveAiImageModal from './SaveAiImageModal';

const AiImage: FC<AiImageGeneratorElementType> = ({
    tryCount,
    todoTokenBalance,
    setTryCount,
    setTodoTokenBalance,
}) => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const [input, setInput] = useState('');
    const [img, setImg] = useState('');
    const [retry, setRetry] = useState(0);
    const [retryCount, setRetryCount] = useState(MAX_LOAD_AI_IMG_RETRY_COUNT);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [finalPrompt, setFinalPrompt] = useState('');
    const [savedAiImage, setSavedAiImage] = useState<SavedAiImageType | null>(
        null
    );

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    const imgSrc = img ? img : savedAiImage?.image ?? '';

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const generateAction = async () => {
        if (isGenerating && !retry) return;

        setIsGenerating(true);

        if (retry > 0) {
            setRetryCount((prev) => (prev ? prev - 1 : 0));
            setRetry(0);
        }

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/png',
            },
            body: JSON.stringify({ input }),
        });

        const data = await response.json();

        if (response.status === 503) {
            setRetry(data.estimated_time);
            return;
        }

        if (!response.ok) {
            setIsGenerating(false);
            toast(loadAiImageErrorAlert);
            return;
        }

        setFinalPrompt(input);
        setInput('');
        setImg(data.image);
        setIsGenerating(false);
        setSavedAiImage(null);
    };

    const handleGenerate = async () => {
        if (!publicKey || !program || !connection) return;

        try {
            const [counterPda] = web3.PublicKey.findProgramAddressSync(
                [aiImageGeneratorCounterSeed, publicKey.toBuffer()],
                program.programId
            );

            await program.methods
                .useAiImageGeneratorTry()
                .accounts({
                    user: publicKey,
                    aiImageGeneratorCounter: counterPda,
                })
                .rpc();

            setTryCount((prev) => (typeof prev === 'number' ? prev - 1 : null));
            generateAction();
        } catch (error) {
            if (error instanceof Error) {
                const alert = getUseGeneratorTryErrorAlert(error.message);

                toast(alert);
            }
        }
    };

    useEffect(() => {
        const runRetry = async () => {
            if (!retryCount) {
                toast(loadTimeAiImageErrorAlert);
                setIsLoading(false);
                setRetryCount(MAX_LOAD_AI_IMG_RETRY_COUNT);
                return;
            }

            await new Promise<void>((resolve) =>
                setTimeout(() => resolve(), retry * 1000)
            );

            await generateAction();
        };

        if (!retry) return;

        runRetry();
    }, [retry]);

    useEffect(() => {
        const fetchData = async () => {
            if (!program || !publicKey) return;

            const savedImageAccount = await getSavedAiImage({
                program,
                publicKey,
                toast,
            });
            setSavedAiImage(savedImageAccount);
        };
        fetchData();
    }, [program, publicKey]);

    return (
        <Box w="100%" h="100%">
            <Box w="100%" display="flex" justifyContent="center" gap="20px">
                <Input
                    w="60%"
                    value={input}
                    onChange={onChange}
                    isDisabled={isGenerating}
                />
                <Button
                    onClick={handleGenerate}
                    isLoading={isGenerating}
                    isDisabled={!tryCount || isLoading}
                >
                    Generate
                </Button>
            </Box>
            {isGenerating && (
                <Center h="512px">
                    <Spinner w="100px" h="100px" />
                </Center>
            )}
            {imgSrc && !isGenerating && (
                <Box
                    mt="30px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    gap="20px"
                    flexDirection="column"
                >
                    <Image
                        src={imgSrc}
                        width={512}
                        height={512}
                        alt={finalPrompt}
                        placeholder="blur"
                        blurDataURL={aiImgPlaceholder}
                    />
                    <Text>{savedAiImage?.description ?? finalPrompt}</Text>
                    {savedAiImage?.mint ? (
                        <Link
                            target="_blank"
                            href={`https://explorer.solana.com/address/${savedAiImage?.mint}?cluster=devnet`}
                        >
                            View
                        </Link>
                    ) : (
                        <Button isLoading={isLoading} onClick={onOpen}>
                            {savedAiImage ? 'Mint NFT' : 'Save'}
                        </Button>
                    )}
                </Box>
            )}
            <SaveAiImageModal
                isOpen={isOpen}
                isLoading={isLoading}
                todoTokenBalance={todoTokenBalance}
                img={img}
                description={savedAiImage?.description ?? finalPrompt}
                savedAiImage={!img ? savedAiImage : null}
                setSavedAiImage={setSavedAiImage}
                setIsLoading={setIsLoading}
                onClose={onClose}
                setTodoTokenBalance={setTodoTokenBalance}
            />
        </Box>
    );
};

export default AiImage;
