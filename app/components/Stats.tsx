import { Box, Divider, Flex, Skeleton, Text, useToast } from '@chakra-ui/react';
import { web3 } from '@project-serum/anchor';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

import { useWorkspace } from '@/components/WorkspaceProvider';
import { fetchStatsErrorAlert } from '@/utils/alerts';
import { TOKEN_MINT } from '@/utils/constants';
import { StatsState } from '@/utils/types';
import StatsInfo from './StatsInfo';
import Achievements from './Achievements';

const Stats = () => {
    const { publicKey } = useWallet();
    const { program, connection } = useWorkspace();

    const [stats, setStats] = useState<StatsState | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [todoTokenBalance, setTodoTokenBalance] = useState(0);

    const toast = useToast();

    const created = stats?.created.toNumber() ?? 0;
    const completed = stats?.completed.toNumber() ?? 0;
    const deleted = stats?.deleted.toNumber() ?? 0;

    useEffect(() => {
        const fetchStats = async () => {
            if (publicKey && program && connection) {
                setIsLoading(true);
                const [statsPda] = web3.PublicKey.findProgramAddressSync(
                    [Buffer.from('stats'), publicKey.toBuffer()],
                    program.programId
                );

                try {
                    const statsAccount = await program.account.statsState.fetch(
                        statsPda
                    );

                    const tokenAccount = await getAssociatedTokenAddress(
                        TOKEN_MINT,
                        publicKey
                    );

                    const userAta = await getAccount(connection, tokenAccount);

                    setTodoTokenBalance(Number(userAta.amount));
                    setStats(statsAccount);
                } catch (error) {
                    toast(fetchStatsErrorAlert);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchStats();
    }, [publicKey, program]);

    return (
        <Box h="100%">
            <StatsInfo
                isLoading={isLoading}
                created={created}
                completed={completed}
                deleted={deleted}
                todoTokenBalance={todoTokenBalance}
            />
            <Divider m="20px 0" />
            <Achievements stats={stats} />
        </Box>
    );
};

export default Stats;
