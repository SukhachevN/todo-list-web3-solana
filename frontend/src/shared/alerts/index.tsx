import { Link, UseToastOptions } from '@chakra-ui/react';

import { MAX_LOAD_AI_IMG_RETRY_COUNT } from '@/shared/constants';

const errorAlertBase: UseToastOptions = {
    isClosable: true,
    status: 'error',
    title: 'Error',
    duration: 5000,
};

const successAlertBase: UseToastOptions = {
    isClosable: true,
    status: 'success',
    title: 'Success',
    duration: 5000,
};

export const getCreateTodoAlert = (title: string) => ({
    ...successAlertBase,
    description: `Todo "${title}" successfully created`,
});

export const getUpdateTodoAlert = (title: string) => ({
    ...successAlertBase,
    description: `Todo "${title}" successfully updated`,
});

export const getCreateTodoErrorAlert = (title: string, error: string) => ({
    ...errorAlertBase,
    description: `Todo "${title}" was not created. ${error}`,
});

export const getUpdateTodoErrorAlert = (title: string, error: string) => ({
    ...errorAlertBase,
    description: `Todo "${title}" was not updated. ${error}`,
});

export const getDeleteTodoAlert = (title: string) => ({
    ...successAlertBase,
    description: `Todo "${title}" successfully deleted`,
});

export const getDeleteTodoErrorAlert = (title: string, error: string) => ({
    ...errorAlertBase,
    description: `Todo "${title}" was not deleted. ${error}`,
});

export const getFetchTodosErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant fetch todos. ${error}`,
});

export const getInitializeCounterErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant initialize Ai Image Generator Counter. ${error}`,
});

export const getBuyGeneratorTriesErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant buy more Ai Image Generator tries. ${error}`,
});

export const getMintAchievementAlert = (mint: string) => ({
    ...successAlertBase,
    description: (
        <>
            Whoa! Your achievement NFT mint -{' '}
            <Link
                target="_blank"
                href={`https://explorer.solana.com/address/${mint}?cluster=devnet`}
            >
                https://explorer.solana.com/address/${mint}?cluster=devnet
            </Link>
        </>
    ),
});

export const getMintAchievementErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant mint achievement NFT. ${error}`,
});

export const loadTimeAiImageErrorAlert = {
    ...errorAlertBase,
    description: `Model still loading after ${MAX_LOAD_AI_IMG_RETRY_COUNT} retries. Try request again in 5 minutes.`,
};

export const loadAiImageErrorAlert = {
    ...errorAlertBase,
    description: `Cant load AI image.`,
};

export const getUseGeneratorTryErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant use AI image generator try. ${error}`,
});

export const getMintAImageNftAlert = (mint: string) => ({
    ...successAlertBase,
    description: (
        <>
            Whoa! Your AI image NFT mint -{' '}
            <Link
                target="_blank"
                href={`https://explorer.solana.com/address/${mint}?cluster=devnet`}
            >
                https://explorer.solana.com/address/${mint}?cluster=devnet
            </Link>
        </>
    ),
});

export const getMintAiImageNftErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant mint AI image NFT. ${error}`,
});

export const getFetchSavedImageErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant fetch saved image state. ${error}`,
});

export const getFetchAiImageGeneratorCounterErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant fetch AI Image Generator counter state. ${error}`,
});

export const addNameToNftErrorAlert = {
    ...errorAlertBase,
    description: 'NFT name cant be empty!',
};

export const saveAiImageAlert = {
    ...successAlertBase,
    description: 'AI Image successfully saved',
};

export const getSaveAiImageErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant save AI Image. ${error}`,
});

export const getFetchStatsErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant fetch stats. ${error}`,
});

export const getFetchUserAtaErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant fetch user TODO token balance. ${error}`,
});

export const getFetchAchievementsAccountErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant fetch achievements state account. ${error}`,
});

export const getFetchAchievementsListErrorAlert = (error: string) => ({
    ...errorAlertBase,
    description: `Cant fetch achievements list. ${error}`,
});

export const notEnoughTodoTokensErrorAlert = {
    ...errorAlertBase,
    description: `Not enough $TODO on your balance to mint AI Image NFT. For now you can only save your image`,
};
