import { Center, Flex, Spinner, useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useEffect, useState } from 'react';

import { ACHIEVEMENTS } from '@/utils/constants';
import {
    AchievementAccountType,
    AchievementsMetadataType,
    AchievementsType,
} from '@/utils/types';
import { getAchievementsAccount } from '@/utils/accounts';
import { getFetchAchievementsListErrorAlert } from '@/utils/alerts';

import AchievementCard from './AchievementCard';
import { useWorkspace } from './WorkspaceProvider';

const Achievements: FC<AchievementsType> = ({ stats }) => {
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

    const [achievements, setAchievements] = useState<
        AchievementsMetadataType[] | null
    >(null);
    const [achievementsAccount, setAchievementAccount] =
        useState<AchievementAccountType | null>(null);

    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!publicKey || !program) return;

            try {
                setIsLoading(true);

                const response = await fetch(ACHIEVEMENTS);
                const { achievements } = await response.json();

                setAchievements(achievements);

                const achievementsAccount = await getAchievementsAccount({
                    publicKey,
                    program,
                    toast,
                });

                setAchievementAccount(achievementsAccount);
            } catch (error) {
                if (error instanceof Error) {
                    const alert = getFetchAchievementsListErrorAlert(
                        error.message
                    );

                    toast(alert);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [publicKey]);

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
                >
                    {achievements?.map((props) => (
                        <AchievementCard
                            {...props}
                            key={props.achievementKey}
                            stats={stats}
                            mint={
                                (achievementsAccount &&
                                    achievementsAccount[
                                        props.achievementKey
                                    ]) ??
                                null
                            }
                        />
                    ))}
                </Flex>
            )}
        </Center>
    );
};

export default Achievements;
