import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Progress,
    Tooltip,
} from '@chakra-ui/react';
import { web3 } from '@project-serum/anchor';
import Image from 'next/image';
import { FC } from 'react';

import { imgPlaceholder } from '@/shared/constants';
import { AchievementsMetadataType, StatsStateType } from '@/shared/types';
import MintAchievementNftButton from '@/features/mint-achievement-nft';

type AchievementCardType = {
    mint: web3.PublicKey | null;
    stats: StatsStateType | null;
} & Omit<AchievementsMetadataType, 'key'>;

const AchievementCard: FC<AchievementCardType> = ({
    image,
    title,
    mint,
    stats,
    amount,
    statsStateKey,
    description,
    mintArg,
}) => {
    const currentAmount = stats ? stats[statsStateKey].toNumber() : 0;

    const isDisabled = currentAmount < amount;

    return (
        <Card
            h="320px"
            w="300px"
            filter={isDisabled ? 'grayscale(1)' : ''}
            cursor={isDisabled ? 'not-allowed' : ''}
        >
            <CardHeader textAlign="center">{title}</CardHeader>
            <CardBody pt={0} display="flex" justifyContent="center">
                <Tooltip label={description}>
                    <Box
                        borderRadius="10px"
                        overflow="hidden"
                        w="150px"
                        h="150px"
                    >
                        <Image
                            alt={title}
                            width={150}
                            height={150}
                            src={image}
                            placeholder="blur"
                            blurDataURL={imgPlaceholder}
                        />
                    </Box>
                </Tooltip>
            </CardBody>
            <CardFooter
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="80px"
            >
                {isDisabled ? (
                    <Tooltip label={`${currentAmount}/${amount}`}>
                        <Progress
                            value={currentAmount}
                            max={amount}
                            hasStripe
                            w="100%"
                        />
                    </Tooltip>
                ) : (
                    <MintAchievementNftButton mint={mint} mintArg={mintArg} />
                )}
            </CardFooter>
        </Card>
    );
};

export default AchievementCard;
