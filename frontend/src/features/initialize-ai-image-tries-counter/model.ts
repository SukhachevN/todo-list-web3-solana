import { web3 } from '@project-serum/anchor';
import { Dispatch, SetStateAction } from 'react';
import { useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';

import { aiImageGeneratorCounterSeed, savedAiImageSeed } from '@/shared/seeds';
import { getInitializeCounterErrorAlert } from '@/shared/alerts';
import { useWorkspace } from '@/app/providers/WorkspaceProvider';

export type InitializeCounterType = {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setTryCount: Dispatch<SetStateAction<number | null>>;
};

export const useInitializeCounter = ({
    setIsLoading,
    setTryCount,
}: InitializeCounterType) => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const toast = useToast();

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

    return initializeCounter;
};
