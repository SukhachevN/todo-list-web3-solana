import { useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { getAchievementsAccount } from '@/shared/accounts';
import { getFetchAchievementsListErrorAlert } from '@/shared/alerts';
import { ACHIEVEMENTS } from '@/shared/constants';
import {
    AchievementAccountType,
    AchievementsMetadataType,
} from '@/shared/types';

export const useAchievements = () => {
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

    const [achievements, setAchievements] = useState<
        AchievementsMetadataType[] | null
    >(null);
    const [isLoading, setIsLoading] = useState(false);
    const [achievementsAccount, setAchievementAccount] =
        useState<AchievementAccountType | null>(null);

    const toast = useToast();

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

    return { achievements, achievementsAccount, isLoading };
};
