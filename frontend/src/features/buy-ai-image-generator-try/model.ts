import { web3 } from '@project-serum/anchor';
import { Dispatch, SetStateAction } from 'react';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';

import { AI_IMAGE_GENERATOR_TRY_PRICE, TOKEN_MINT } from '@/shared/constants';
import { getBuyGeneratorTriesErrorAlert } from '@/shared/alerts';
import { aiImageGeneratorCounterSeed, mintAuthoritySeed } from '@/shared/seeds';
import { useWorkspace } from '@/app/providers/WorkspaceProvider';

export type BuyMoreTriesType = {
    amount: number;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setTodoTokenBalance: Dispatch<SetStateAction<number | null>>;
    setTryCount: Dispatch<SetStateAction<number | null>>;
};

export const useBuyMoreTries = ({
    amount,
    setIsLoading,
    setTryCount,
    setTodoTokenBalance,
}: BuyMoreTriesType) => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const toast = useToast();

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

    return buyMoreTries;
};
