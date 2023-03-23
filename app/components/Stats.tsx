import { Box, Divider, Text, useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

import { useWorkspace } from '@/components/WorkspaceProvider';
import { StatsStateType } from '@/utils/types';
import { getStats, getUserTodoTokenATA } from '@/utils/accounts';

import StatsInfo from './StatsInfo';
import Achievements from './Achievements';

const Stats = () => {
    const { publicKey } = useWallet();
    const { program, connection } = useWorkspace();

    const [stats, setStats] = useState<StatsStateType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [todoTokenBalance, setTodoTokenBalance] = useState(0);

    const toast = useToast();

    const created = stats?.created.toNumber() ?? 0;
    const completed = stats?.completed.toNumber() ?? 0;
    const deleted = stats?.deleted.toNumber() ?? 0;

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

    return (
        <Box h="100%">
            {!isLoading && !stats ? (
                <Text
                    mt="50px"
                    textAlign="center"
                    fontSize="2xl"
                    variant="gradient-main"
                >
                    Create at least 1 todo to unlock this section
                </Text>
            ) : (
                stats && (
                    <>
                        <StatsInfo
                            isLoading={isLoading}
                            created={created}
                            completed={completed}
                            deleted={deleted}
                            todoTokenBalance={todoTokenBalance}
                        />
                        <Divider m="20px 0" />
                        <Achievements stats={stats} />
                    </>
                )
            )}
        </Box>
    );
};

export default Stats;
