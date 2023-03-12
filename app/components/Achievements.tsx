import { StatsState } from '@/utils/types';
import { Box, Center, Flex, SimpleGrid, Spinner } from '@chakra-ui/react';

import { FC, useEffect, useState } from 'react';
import AchievementCard from './AchievementCard';
import { useMetaplex } from './MetaplexProvider';

type AchievementsType = {
    stats: StatsState | null;
};

const Achievements: FC<AchievementsType> = ({ stats }) => {
    const { metaplex } = useMetaplex();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {}, [metaplex]);

    return (
        <Center h="calc(100% - 200px)" overflow="auto" mb="10px">
            {isLoading ? (
                <Spinner w="100px" h="100px" />
            ) : (
                <Flex
                    wrap="wrap"
                    w="100%"
                    h="100%"
                    gap="20px"
                    justifyContent="center"
                ></Flex>
            )}
        </Center>
    );
};

export default Achievements;
