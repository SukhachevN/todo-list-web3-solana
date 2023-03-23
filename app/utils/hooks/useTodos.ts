import {
    ACCOUNT_DISCRIMINATOR_SIZE,
    Program,
    web3,
} from '@project-serum/anchor';
import { useQuery } from 'react-query';
import { useImmer } from 'use-immer';

import { TodoListWeb3 } from '../todo_list_web3';
import { TodoAccountType } from '../types';

export const useTodos = (
    program: Program<TodoListWeb3> | undefined,
    publicKey: web3.PublicKey | null
) => {
    const [todos, setTodos] = useImmer<TodoAccountType[]>([]);

    const fetchTodos = async () => {
        if (program && publicKey) {
            const accounts = await program.account.todoState.all([
                {
                    memcmp: {
                        offset: ACCOUNT_DISCRIMINATOR_SIZE,
                        bytes: publicKey.toBase58(),
                    },
                },
            ]);

            return accounts.sort(
                (a, b) =>
                    b.account.createDate.toNumber() -
                    a.account.createDate.toNumber()
            );
        }

        return [];
    };

    const { isLoading, error } = useQuery({
        queryKey: ['todos', publicKey],
        queryFn: fetchTodos,
        onSuccess: (fetchedTodos) => {
            setTodos(fetchedTodos);
        },
        refetchOnWindowFocus: false,
        enabled: !!(program && publicKey),
    });

    return { todos, setTodos, isLoading, error };
};
