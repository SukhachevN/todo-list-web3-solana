import { Program } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { CreateToastFnReturn } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';

import { getNftMintData } from '@/shared/helpers/get-nft-mint-data';
import { achievementsSeed, statsSeed } from '@/shared/seeds';
import { TodoListWeb3 } from '@/shared/todo-list/todo_list_web3';
import { MintArgType } from '@/shared/types';
import {
    getMintAchievementAlert,
    getMintAchievementErrorAlert,
} from '@/shared/alerts';

type MintNftType = {
    nftMint: string;
    publicKey: PublicKey | null;
    program?: Program<TodoListWeb3>;
    mintArg: MintArgType;
    setIsMinting: Dispatch<SetStateAction<boolean>>;
    setNftMint: Dispatch<SetStateAction<string>>;
    toast: CreateToastFnReturn;
};

export const mintNft = async ({
    nftMint,
    publicKey,
    program,
    mintArg,
    setIsMinting,
    setNftMint,
    toast,
}: MintNftType) => {
    if (nftMint || !publicKey || !program) return;

    try {
        setIsMinting(true);

        const {
            mintKeypair,
            mint,
            tokenAddress,
            metadataPda,
            masterEditionPda,
        } = await getNftMintData(publicKey);

        const [achievementsPda] = PublicKey.findProgramAddressSync(
            [achievementsSeed, publicKey.toBuffer()],
            program.programId
        );

        const [statsPda] = PublicKey.findProgramAddressSync(
            [statsSeed, publicKey.toBuffer()],
            program.programId
        );

        await program.methods
            .mintAchievementNft(mintArg)
            .accounts({
                stats: statsPda,
                achievements: achievementsPda,
                masterEdition: masterEditionPda,
                metadata: metadataPda,
                mint,
                tokenAccount: tokenAddress,
                user: publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            })
            .signers([mintKeypair])
            .rpc();

        setNftMint(mint.toBase58());

        const alert = getMintAchievementAlert(mint.toBase58());
        toast(alert);
    } catch (error) {
        if (error instanceof Error) {
            const alert = getMintAchievementErrorAlert(error.message);
            toast(alert);
        }
    } finally {
        setIsMinting(false);
    }
};
