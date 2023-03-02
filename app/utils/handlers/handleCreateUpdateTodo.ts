import { BN, Program, web3 } from '@project-serum/anchor';
import { type WalletAdapterProps } from '@solana/wallet-adapter-base';
import { CreateToastFnReturn } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import {
    getCreateTodoAlert,
    getCreateTodoErrorAlert,
    getUpdateTodoAlert,
    getUpdateTodoErrorAlert,
} from '../alerts';
import { TodoAccountType, TodoStateType, TodoType } from '../types';
import { TodoListWeb3 } from '../todo_list_web3';

export type HandleCreateUpdateTodoArgs = {
    index: number;
    toast: CreateToastFnReturn;
    connection?: web3.Connection;
    todo: TodoType | null;
    todoState: TodoStateType;
    publicKey: web3.PublicKey | null;
    program?: Program<TodoListWeb3>;
    setIsUpdating: (value: boolean) => void;
    sendTransaction: WalletAdapterProps['sendTransaction'];
    onClose?: () => void;
    setTodos: Dispatch<SetStateAction<TodoAccountType[]>>;
};

export const handleCreateUpdateTodo = async ({
    index,
    toast,
    connection,
    todo,
    todoState,
    program,
    publicKey,
    setIsUpdating,
    sendTransaction,
    onClose,
    setTodos,
}: HandleCreateUpdateTodoArgs) => {
    if (!publicKey || !program || !connection) {
        return;
    }

    setIsUpdating(true);

    const { title, description, deadline, isCompleted } = todoState;

    const deadlineDate = deadline ? new Date(deadline).getTime() : 0;

    const newTodo = {
        title,
        description,
        deadline: new BN(deadlineDate),
    };

    const [todoPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(newTodo.title), publicKey.toBuffer()],
        program.programId
    );

    const [statsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('stats'), publicKey.toBuffer()],
        program.programId
    );

    const transaction = new web3.Transaction();

    const accounts = { todo: todoPda, stats: statsPda };

    if (todo) {
        const instruction = await program.methods
            .updateTodo({ ...newTodo, isCompleted })
            .accounts(accounts)
            .transaction();

        transaction.add(instruction);
    } else {
        const instruction = await program.methods
            .createTodo(newTodo)
            .accounts(accounts)
            .transaction();

        transaction.add(instruction);
    }

    try {
        await sendTransaction(transaction, connection);

        const alertFunction = todo ? getUpdateTodoAlert : getCreateTodoAlert;
        const alert = alertFunction(title);

        toast(alert);

        if (todo) {
            setTodos((todos) => {
                const todo = todos[index].account;

                todo.isCompleted = isCompleted;
                todo.description = description;
                todo.deadline = newTodo.deadline;

                if (isCompleted) {
                    todo.completeDate = new BN(Date.now());
                }

                return todos;
            });
        } else {
            setTodos((todos) => {
                const todo: TodoAccountType = {
                    account: {
                        ...newTodo,
                        user: publicKey,
                        isCompleted: false,
                        completeDate: new BN(0),
                        createDate: new BN(Date.now()),
                    },
                    publicKey: todoPda,
                };

                todos.unshift(todo);

                return todos;
            });
        }

        onClose?.();
    } catch (error) {
        if (error instanceof Error) {
            const { message } = error;

            const alertFunction = todo
                ? getUpdateTodoErrorAlert
                : getCreateTodoErrorAlert;

            const alert = alertFunction(title, message);

            toast(alert);
        }
    } finally {
        setIsUpdating(false);
    }
};
