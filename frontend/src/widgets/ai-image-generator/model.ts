import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import {
    getAiImageGeneratorCounter,
    getUserTodoTokenATA,
} from '@/shared/accounts';
import { TODO_DECIMAL } from '@/shared/constants';

export const useAiImageGeneratorInfo = () => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const [isLoading, setIsLoading] = useState(false);
    const [todoTokenBalance, setTodoTokenBalance] = useState<number | null>(
        null
    );
    const [tryCount, setTryCount] = useState<number | null>(null);

    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            if (publicKey && program && connection) {
                setIsLoading(true);

                const userAta = await getUserTodoTokenATA({
                    publicKey,
                    connection,
                    toast,
                });

                const counterAccount = await getAiImageGeneratorCounter({
                    program,
                    publicKey,
                    toast,
                });

                setTodoTokenBalance(
                    userAta
                        ? Number(userAta.amount) / Math.pow(10, TODO_DECIMAL)
                        : null
                );
                setTryCount(counterAccount?.tryCount ?? null);

                setIsLoading(false);
            }
        };

        fetchData();
    }, [publicKey, program]);

    return {
        tryCount,
        isLoading,
        todoTokenBalance,
        setTryCount,
        setTodoTokenBalance,
    };
};
