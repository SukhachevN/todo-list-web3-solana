import { web3 } from '@project-serum/anchor';
import {
    Account,
    getAccount,
    getAssociatedTokenAddress,
    TokenAccountNotFoundError,
} from '@solana/spl-token';

import {
    getFetchAchievementsAccountErrorAlert,
    getFetchAiImageGeneratorCounterErrorAlert,
    getFetchSavedImageErrorAlert,
    getFetchStatsErrorAlert,
    getFetchUserAtaErrorAlert,
} from './alerts';
import { ACCOUNT_DOES_NOT_EXIST, TOKEN_MINT } from './constants';
import {
    achievementsSeed,
    aiImageGeneratorCounterSeed,
    savedAiImageSeed,
    statsSeed,
} from './seeds';
import {
    AchievementAccountType,
    AiImageCounterType,
    DefaultFetchAccountArgsType,
    FetchUserAtaArgsType,
    SavedAiImageType,
    StatsStateType,
} from './types';

export const getSavedAiImage = async ({
    program,
    publicKey,
    toast,
}: DefaultFetchAccountArgsType) => {
    let savedAiImage: SavedAiImageType | null = null;

    const [savedAiImagePda] = web3.PublicKey.findProgramAddressSync(
        [savedAiImageSeed, publicKey.toBuffer()],
        program.programId
    );

    try {
        const { uri, mint } = await program.account.savedAiImageState.fetch(
            savedAiImagePda
        );

        const stringMint = mint.toBase58();

        const realMint =
            stringMint === web3.SystemProgram.programId.toBase58()
                ? ''
                : stringMint;

        if (uri) {
            const metadataResponse = await fetch(uri);
            const metadata = await metadataResponse.json();
            savedAiImage = { ...metadata, mint: realMint, uri };
        }
    } catch (error) {
        if (error instanceof Error) {
            const isAccountNotExist = error.message.includes(
                ACCOUNT_DOES_NOT_EXIST
            );

            const alert =
                !isAccountNotExist &&
                getFetchSavedImageErrorAlert(error.message);

            alert && toast(alert);
        }
    }

    return savedAiImage;
};

export const getAiImageGeneratorCounter = async ({
    program,
    publicKey,
    toast,
}: DefaultFetchAccountArgsType) => {
    let aiImageGeneratorCounter: AiImageCounterType | null = null;

    const [aiImageGeneratorCounterPda] = web3.PublicKey.findProgramAddressSync(
        [aiImageGeneratorCounterSeed, publicKey.toBuffer()],
        program.programId
    );

    try {
        aiImageGeneratorCounter =
            await program.account.aiImageGeneratingCounterState.fetch(
                aiImageGeneratorCounterPda
            );
    } catch (error) {
        if (error instanceof Error) {
            const isAccountNotExist = error.message.includes(
                ACCOUNT_DOES_NOT_EXIST
            );

            const alert =
                !isAccountNotExist &&
                getFetchAiImageGeneratorCounterErrorAlert(error.message);

            alert && toast(alert);
        }
    }

    return aiImageGeneratorCounter;
};

export const getStats = async ({
    program,
    publicKey,
    toast,
}: DefaultFetchAccountArgsType) => {
    let stats: StatsStateType | null = null;

    const [statsPda] = web3.PublicKey.findProgramAddressSync(
        [statsSeed, publicKey.toBuffer()],
        program.programId
    );

    try {
        stats = await program.account.statsState.fetch(statsPda);
    } catch (error) {
        if (error instanceof Error) {
            const isAccountNotExist = error.message.includes(
                ACCOUNT_DOES_NOT_EXIST
            );

            const alert =
                !isAccountNotExist && getFetchStatsErrorAlert(error.message);

            alert && toast(alert);
        }
    }

    return stats;
};

export const getUserTodoTokenATA = async ({
    publicKey,
    connection,
    toast,
}: FetchUserAtaArgsType) => {
    let userAta: Account | null = null;
    try {
        const tokenAccount = await getAssociatedTokenAddress(
            TOKEN_MINT,
            publicKey
        );

        userAta = await getAccount(connection, tokenAccount);
    } catch (error) {
        if (error instanceof Error) {
            const isAccountNotExist =
                error instanceof TokenAccountNotFoundError;

            const alert =
                !isAccountNotExist && getFetchUserAtaErrorAlert(error.message);

            alert && toast(alert);
        }
    }

    return userAta;
};

export const getAchievementsAccount = async ({
    publicKey,
    program,
    toast,
}: DefaultFetchAccountArgsType) => {
    let achievements: AchievementAccountType | null = null;

    const [achievementsPda] = web3.PublicKey.findProgramAddressSync(
        [achievementsSeed, publicKey.toBuffer()],
        program.programId
    );

    try {
        achievements = await program.account.achievementsState.fetch(
            achievementsPda
        );
    } catch (error) {
        if (error instanceof Error) {
            const isAccountNotExist = error.message.includes(
                ACCOUNT_DOES_NOT_EXIST
            );

            const alert =
                !isAccountNotExist &&
                getFetchAchievementsAccountErrorAlert(error.message);

            alert && toast(alert);
        }
    }

    return achievements;
};
