import { Link, UseToastOptions } from '@chakra-ui/react';

const errorAlertBase: UseToastOptions = {
    isClosable: true,
    status: 'error',
    title: 'Error',
    duration: 5000,
};

const warningAlertBase: UseToastOptions = {
    isClosable: true,
    status: 'warning',
    title: 'Warning',
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

export const fetchStatsErrorAlert = {
    ...warningAlertBase,
    description:
        "Looks like you still did'nt created any todo! Let's go create todo and come back here later",
};

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
