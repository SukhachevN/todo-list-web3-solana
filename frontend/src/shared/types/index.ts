import { CreateToastFnReturn } from '@chakra-ui/react';
import { BN, Program, web3 } from '@project-serum/anchor';
import { Dispatch, SetStateAction } from 'react';
import { Updater } from 'use-immer';

import { TodoListWeb3 } from '@/shared/todo-list/todo_list_web3';

export type TodoType = {
    user: web3.PublicKey;
    title: string;
    description: string;
    deadline: BN;
    completeDate: BN;
    isCompleted: boolean;
    createDate: BN;
};

export type TodoAccountType = {
    account: TodoType;
    publicKey: web3.PublicKey;
};

export type TodoStateType = {
    title: string;
    description: string;
    isCompleted: boolean;
    deadline: string;
};

export type TodoCardType = {
    todo: TodoType | null;
    index: number;
    setTodos: Updater<TodoAccountType[]>;
};

export type TodoInfoModalType = {
    isOpen: boolean;
    title: string;
    description: string;
    createDate: BN;
    onClose: () => void;
};

export type CurrentTodoStateType = {
    index: number;
    todo: TodoType | null;
};

export type StatsStateType = {
    created: BN;
    completed: BN;
    deleted: BN;
};

export type AchievementAccountType = {
    createOneTodo: web3.PublicKey;
    completeOneTodo: web3.PublicKey;
    deleteOneTodo: web3.PublicKey;
    createTenTodos: web3.PublicKey;
    completeTenTodos: web3.PublicKey;
    deleteTenTodos: web3.PublicKey;
    createHundreedTodos: web3.PublicKey;
    completeHundreedTodos: web3.PublicKey;
    deleteHundreedTodos: web3.PublicKey;
    createThousandTodos: web3.PublicKey;
    completeThousandTodos: web3.PublicKey;
    deleteThousandTodos: web3.PublicKey;
};

export type AmountType = 'one' | 'ten' | 'hundreed' | 'thousand';
export type ActionType = 'create' | 'complete' | 'delete';

export type MintArgType = {
    amount: Partial<Record<AmountType, {}>>;
    actionType: Partial<Record<ActionType, {}>>;
};

export type AchievementsMetadataType = {
    title: string;
    description: string;
    achievementKey: keyof AchievementAccountType;
    mintArg: MintArgType;
    statsStateKey: keyof StatsStateType;
    amount: 1 | 10 | 100 | 1000;
    image: string;
};

export type AchievementsType = {
    stats: StatsStateType | null;
};

export type DefaultFetchAccountArgsType = {
    publicKey: web3.PublicKey;
    program: Program<TodoListWeb3>;
    toast: CreateToastFnReturn;
};

export type SavedAiImageType = {
    name: string;
    description: string;
    image: string;
    mint: string;
    uri: string;
};

export type AiImageCounterType = {
    tryCount: number;
};

export type FetchUserAtaArgsType = {
    publicKey: web3.PublicKey;
    connection: web3.Connection;
    toast: CreateToastFnReturn;
};

export type AiImageGeneratorElementType = {
    todoTokenBalance: number;
    tryCount: number | null;
    setTryCount: Dispatch<SetStateAction<number | null>>;
    setTodoTokenBalance: Dispatch<SetStateAction<number | null>>;
};
