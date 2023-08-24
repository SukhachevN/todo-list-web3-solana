import { useImmer } from 'use-immer';
import { ACCOUNT_DISCRIMINATOR_SIZE } from '@project-serum/anchor';
import { useQuery } from 'react-query';
import { useWallet } from '@solana/wallet-adapter-react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { TodoAccountType } from '@/shared/types';

export const useTodos = () => {
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

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
