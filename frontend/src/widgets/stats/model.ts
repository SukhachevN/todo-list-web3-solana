import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { getStats, getUserTodoTokenATA } from '@/shared/accounts';
import { StatsStateType } from '@/shared/types';

export const useStats = () => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const [isLoading, setIsLoading] = useState(true);
    const [todoTokenBalance, setTodoTokenBalance] = useState(0);
    const [stats, setStats] = useState<StatsStateType | null>(null);

    const toast = useToast();

    useEffect(() => {
        const fetchStats = async () => {
            if (publicKey && program && connection) {
                setIsLoading(true);

                const statsAccount = await getStats({
                    program,
                    publicKey,
                    toast,
                });

                const userAta = await getUserTodoTokenATA({
                    connection,
                    publicKey,
                    toast,
                });

                setTodoTokenBalance(userAta ? Number(userAta.amount) : 0);
                setStats(statsAccount);

                setIsLoading(false);
            }
        };

        fetchStats();
    }, [publicKey, program]);

    return { stats, isLoading, todoTokenBalance };
};
