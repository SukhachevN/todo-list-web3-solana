import { Box, Flex, Skeleton, Text, useToast } from '@chakra-ui/react';
import { web3 } from '@project-serum/anchor';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

import { useWorkspace } from '@/components/WorkspaceProvider';
import { fetchStatsErrorAlert } from '@/utils/alerts';
import { TODO_DECIMAL, TOKEN_MINT } from '@/utils/constants';
import { StatsState } from '@/utils/types';

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
        <Box>
            <Flex gap="50px">
                <Box>
                    <Flex fontSize="2xl" align="center">
                        Created:&nbsp;
                        {isLoading ? (
                            <Skeleton w="100px" h="24px" />
                        ) : (
                            <Text variant="gradient-1">{created}</Text>
                        )}
                    </Flex>
                    <Flex fontSize="2xl" align="center">
                        Completed:&nbsp;
                        {isLoading ? (
                            <Skeleton w="100px" h="24px" />
                        ) : (
                            <Text variant="gradient-2">{completed}</Text>
                        )}
                    </Flex>
                    <Flex fontSize="2xl" align="center">
                        Deleted:&nbsp;
                        {isLoading ? (
                            <Skeleton w="100px" h="24px" />
                        ) : (
                            <Text variant="gradient-3">{deleted}</Text>
                        )}
                    </Flex>
                    <Flex fontSize="2xl" align="center">
                        Balance:&nbsp;
                        {isLoading ? (
                            <Skeleton w="100px" h="24px" />
                        ) : (
                            <Text variant="gradient-main">
                                {todoTokenBalance / Math.pow(10, TODO_DECIMAL)}
                                &nbsp;$TODO
                            </Text>
                        )}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default Stats;
