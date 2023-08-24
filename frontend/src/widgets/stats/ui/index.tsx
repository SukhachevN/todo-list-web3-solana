import { Box, Divider, Text } from '@chakra-ui/react';

import Info from './info';
import Achievements from './achievements';
import { useStats } from '../model';

const Stats = () => {
    const { stats, isLoading, todoTokenBalance } = useStats();

    const created = stats?.created.toNumber() ?? 0;
    const completed = stats?.completed.toNumber() ?? 0;
    const deleted = stats?.deleted.toNumber() ?? 0;

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
                        <Info
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
