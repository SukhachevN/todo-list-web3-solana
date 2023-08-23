import {
    Box,
    Button,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    useToast,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { web3 } from '@project-serum/anchor';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useState } from 'react';

import {
    aiImageGeneratorCounterSeed,
    mintAuthoritySeed,
    savedAiImageSeed,
} from '@/shared/seeds';
import {
    getBuyGeneratorTriesErrorAlert,
    getInitializeCounterErrorAlert,
} from '@/shared/alerts';
import { AI_IMAGE_GENERATOR_TRY_PRICE, TOKEN_MINT } from '@/shared/constants';
import { AiImageGeneratorElementType } from '@/shared/types';
import { useWorkspace } from '@/app/providers/WorkspaceProvider';

const TriesCount: FC<AiImageGeneratorElementType> = ({
    tryCount,
    todoTokenBalance,
    setTodoTokenBalance,
    setTryCount,
}) => {
    const { publicKey } = useWallet();
    const { program, connection } = useWorkspace();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(1);

    const toast = useToast();

    const tryWord = tryCount === 1 ? 'try' : 'tries';

    const initializeCounter = async () => {
        if (!publicKey || !program || !connection) return;

        try {
            setIsLoading(true);

            const [counterPda] = web3.PublicKey.findProgramAddressSync(
                [aiImageGeneratorCounterSeed, publicKey.toBuffer()],
                program.programId
            );

            const [savedAiImagePda] = web3.PublicKey.findProgramAddressSync(
                [savedAiImageSeed, publicKey.toBuffer()],
                program.programId
            );

            await program.methods
                .initAiImageGenerator()
                .accounts({
                    user: publicKey,
                    aiImageGeneratorCounter: counterPda,
                    savedAiImage: savedAiImagePda,
                })
                .rpc();

            setTryCount(1);
        } catch (error) {
            if (error instanceof Error) {
                const alert = getInitializeCounterErrorAlert(error.message);
                toast(alert);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const buyMoreTries = async () => {
        if (!publicKey || !program || !connection) return;

        try {
            setIsLoading(true);

            const [counterPda] = web3.PublicKey.findProgramAddressSync(
                [aiImageGeneratorCounterSeed, publicKey.toBuffer()],
                program.programId
            );

            const [mintAuthorityPda] = web3.PublicKey.findProgramAddressSync(
                [mintAuthoritySeed],
                program.programId
            );

            const tokenAccount = await getAssociatedTokenAddress(
                TOKEN_MINT,
                publicKey
            );

            await program.methods
                .buyAiImageGeneratorTry(amount)
                .accounts({
                    user: publicKey,
                    aiImageGeneratorCounter: counterPda,
                    mint: TOKEN_MINT,
                    mintAuthority: mintAuthorityPda,
                    tokenAccount,
                })
                .rpc();

            setTryCount((prev) => Number(prev) + amount);
            setTodoTokenBalance(
                (prev) => Number(prev) - AI_IMAGE_GENERATOR_TRY_PRICE
            );
        } catch (error) {
            if (error instanceof Error) {
                const alert = getBuyGeneratorTriesErrorAlert(error.message);
                toast(alert);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (_: string, newAmount: number) => setAmount(newAmount);

    return (
        <Box display="flex" justifyContent="center" w="100%">
            {typeof tryCount === 'number' ? (
                <Box display="flex" alignItems="center" gap="10px">
                    You have
                    <Text variant="gradient-main">{tryCount}</Text>
                    {tryWord} and{' '}
                    <Text variant="gradient-main">
                        {todoTokenBalance} $TODO
                    </Text>
                    , buy more
                    <NumberInput
                        defaultValue={1}
                        min={1}
                        w="100px"
                        onChange={onChange}
                        isDisabled={isLoading}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Tooltip label="1 try = 1000 $TODO">
                        <Button isLoading={isLoading} onClick={buyMoreTries}>
                            Buy
                        </Button>
                    </Tooltip>
                </Box>
            ) : (
                <Button isLoading={isLoading} onClick={initializeCounter}>
                    Get 1 free try
                </Button>
            )}
        </Box>
    );
};

export default TriesCount;
