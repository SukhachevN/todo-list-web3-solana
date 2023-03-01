import { BN, web3 } from '@project-serum/anchor';
import { Updater } from 'use-immer';

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

export type TodoModalType = {
    todo: TodoType | null;
    isOpen: boolean;
    onClose: () => void;
    setTodos: Updater<TodoAccountType[]>;
    index: number;
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
