import { StatsState } from '@/utils/types';
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Skeleton,
    SkeletonText,
} from '@chakra-ui/react';
import { FindNftByMetadataInput } from '@metaplex-foundation/js';
import { web3 } from '@project-serum/anchor';
import Image from 'next/image';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMetaplex } from './MetaplexProvider';

type AchievementCardType = {
    uri: string;
    stats: StatsState | null;
};

type Achievement = {
    name: string;
    description: string;
    image: string;
    attributes: [
        {
            trait_type: 'key';
            value: keyof StatsState;
        },
        {
            trait_type: 'amount';
            value: number;
        }
    ];
};

const AchievementCard: FC<AchievementCardType> = ({ uri, stats }) => {
    const [achievement, setAchievement] = useState<Achievement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isDisabled = useMemo(() => {
        if (achievement && stats) {
            const key = achievement.attributes[0].value;
            const amount = achievement.attributes[1].value;

            const currentAmount = stats[key].toNumber();

            return currentAmount < amount;
        }
    }, [stats, achievement]);

    useEffect(() => {
        const fetchNft = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(uri);
                const result = await response.json();

                setAchievement(result);
            } catch (error) {
                console.log(error);
                // TODO
            } finally {
                setIsLoading(false);
            }
        };
        fetchNft();
    }, []);

    return (
        <Card
            h="300px"
            w="300px"
            filter={isDisabled ? 'grayscale(1)' : ''}
            cursor={isDisabled ? 'not-allowed' : ''}
        >
            <CardHeader textAlign="center">
                {isLoading ? <SkeletonText noOfLines={1} /> : achievement?.name}
            </CardHeader>
            <CardBody pt={0} display="flex" justifyContent="center">
                {achievement && (
                    <Image
                        alt={achievement?.name ?? ''}
                        width={150}
                        height={150}
                        src={achievement?.image ?? ''}
                    />
                )}
            </CardBody>
            <CardFooter>
                <Box>
                    {isLoading ? (
                        <SkeletonText noOfLines={1} />
                    ) : (
                        achievement?.description
                    )}
                </Box>
            </CardFooter>
        </Card>
    );
};

export default AchievementCard;
