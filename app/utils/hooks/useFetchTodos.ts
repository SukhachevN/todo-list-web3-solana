import {
    ACCOUNT_DISCRIMINATOR_SIZE,
    Program,
    web3,
} from '@project-serum/anchor';
import { useQuery } from 'react-query';
import { Updater } from 'use-immer';

import { TodoListWeb3 } from '../todo_list_web3';
import { TodoAccountType } from '../types';

type UseFetchTodosType = {
    program?: Program<TodoListWeb3>;
    publicKey: web3.PublicKey | null;
    setTodos: Updater<TodoAccountType[]>;
};

export const useFetchTodos = ({
    program,
    publicKey,
    setTodos,
}: UseFetchTodosType) => {
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
        enabled: !!(program && publicKey),
    });

    return { isLoading, error };
};
