import { Program, web3 } from '@project-serum/anchor';
import { Dispatch, SetStateAction } from 'react';
import { CreateToastFnReturn } from '@chakra-ui/react';

import { TodoListWeb3 } from '@/shared/todo-list/todo_list_web3';
import { aiImageGeneratorCounterSeed, savedAiImageSeed } from '@/shared/seeds';
import { getInitializeCounterErrorAlert } from '@/shared/alerts';

export type InitializeCounterType = {
    publicKey: web3.PublicKey | null;
    program?: Program<TodoListWeb3>;
    connection?: web3.Connection;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setTryCount: Dispatch<SetStateAction<number | null>>;
    toast: CreateToastFnReturn;
};

export const initializeCounter = async ({
    publicKey,
    program,
    connection,
    setIsLoading,
    setTryCount,
    toast,
}: InitializeCounterType) => {
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
