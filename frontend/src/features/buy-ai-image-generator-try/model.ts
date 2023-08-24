import { Program, web3 } from '@project-serum/anchor';
import { Dispatch, SetStateAction } from 'react';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { CreateToastFnReturn } from '@chakra-ui/react';

import { AI_IMAGE_GENERATOR_TRY_PRICE, TOKEN_MINT } from '@/shared/constants';
import { getBuyGeneratorTriesErrorAlert } from '@/shared/alerts';
import { TodoListWeb3 } from '@/shared/todo-list/todo_list_web3';
import { aiImageGeneratorCounterSeed, mintAuthoritySeed } from '@/shared/seeds';

export type BuyMoreTriesType = {
    publicKey: web3.PublicKey | null;
    program?: Program<TodoListWeb3>;
    connection?: web3.Connection;
    amount: number;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setTodoTokenBalance: Dispatch<SetStateAction<number | null>>;
    setTryCount: Dispatch<SetStateAction<number | null>>;
    toast: CreateToastFnReturn;
};

export const buyMoreTries = async ({
    publicKey,
    program,
    connection,
    amount,
    setIsLoading,
    setTryCount,
    setTodoTokenBalance,
    toast,
}: BuyMoreTriesType) => {
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
