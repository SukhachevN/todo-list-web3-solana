import { Center, Flex, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

import { AchievementsType } from '@/shared/types';
import AchievementCard from '@/entities/achievement';

import { useAchievements } from './model';

const Achievements: FC<AchievementsType> = ({ stats }) => {
    const { achievements, achievementsAccount, isLoading } = useAchievements();

    return (
        <>
            {isLoading ? (
                <Center h="calc(100% - 200px)">
                    <Spinner w="100px" h="100px" />
                </Center>
            ) : (
                <Flex
                    wrap="wrap"
                    w="100%"
                    gap="20px"
                    justifyContent="center"
                    h="calc(100% - 200px)"
                    overflow="auto"
                    pb="20px"
                >
                    {achievements?.map((props) => (
                        <AchievementCard
                            {...props}
                            key={props.achievementKey}
                            stats={stats}
                            mint={
                                achievementsAccount?.[props.achievementKey] ??
                                null
                            }
                        />
                    ))}
                </Flex>
            )}
        </>
    );
};

export default Achievements;
