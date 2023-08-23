import {
    Box,
    Input,
    Button,
    Center,
    Spinner,
    useDisclosure,
    Link,
    Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { ChangeEvent, FC, useState } from 'react';

import GenerateAiImageButton from '@/features/generate-ai-image/ui';
import { AiImageGeneratorElementType, SavedAiImageType } from '@/shared/types';
import { aiImgPlaceholder } from '@/shared/constants';

import SaveAiImageModal from './save-modal';
import { useSetSavedAiImage } from '../model';

const AiImage: FC<AiImageGeneratorElementType> = ({
    tryCount,
    todoTokenBalance,
    setTryCount,
    setTodoTokenBalance,
}) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const [finalPrompt, setFinalPrompt] = useState('');
    const [img, setImg] = useState('');
    const [savedAiImage, setSavedAiImage] = useState<SavedAiImageType | null>(
        null
    );

    const { isOpen, onOpen, onClose } = useDisclosure();

    const imgSrc = img ? img : savedAiImage?.image ?? '';

    const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setInput(value);
    };

    useSetSavedAiImage(setSavedAiImage);

    return (
        <Box w="100%" h="100%">
            <Box w="100%" display="flex" justifyContent="center" gap="20px">
                <Input
                    w="60%"
                    value={input}
                    onChange={onChange}
                    isDisabled={isGenerating}
                />
                <GenerateAiImageButton
                    isGenerating={isGenerating}
                    input={input}
                    setInput={setInput}
                    isDisabled={!tryCount || isLoading}
                    setTryCount={setTryCount}
                    setFinalPrompt={setFinalPrompt}
                    setImg={setImg}
                    setSavedAiImage={setSavedAiImage}
                    setIsGenerating={setIsGenerating}
                    setIsLoading={setIsLoading}
                />
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
