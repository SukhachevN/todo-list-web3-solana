import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Link,
    Progress,
    Tooltip,
    useToast,
} from '@chakra-ui/react';
import { utils, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';

import { imgPlaceholder } from '@/utils/constants';
import { AchievementsMetadataType, StatsState } from '@/utils/types';
import {
    getMintAchievementAlert,
    getMintAchievementErrorAlert,
} from '@/utils/alerts';

import { useWorkspace } from './WorkspaceProvider';

type AchievementCardType = {
    mint: web3.PublicKey | null;
    stats: StatsState | null;
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
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

    const [nftMint, setNftMint] = useState('');
    const [isMinting, setIsMinting] = useState(false);

    const toast = useToast();

    const currentAmount = stats ? stats[statsStateKey].toNumber() : 0;

    const isDisabled = currentAmount < amount;

    const mintNft = async () => {
        if (nftMint || !publicKey || !program) return;

        try {
            setIsMinting(true);

            const mintKeypair = web3.Keypair.generate();

            const mint = mintKeypair.publicKey;

            const tokenAddress = await utils.token.associatedAddress({
                mint,
                owner: publicKey,
            });

            const [metadataPda] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from('metadata'),
                    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                    mint.toBuffer(),
                ],
                TOKEN_METADATA_PROGRAM_ID
            );

            const [masterEditionPda] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from('metadata'),
                    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                    mint.toBuffer(),
                    Buffer.from('edition'),
                ],
                TOKEN_METADATA_PROGRAM_ID
            );

            const [achievementsPda] = web3.PublicKey.findProgramAddressSync(
                [Buffer.from('achievements'), publicKey.toBuffer()],
                program.programId
            );

            const [statsPda] = web3.PublicKey.findProgramAddressSync(
                [Buffer.from('stats'), publicKey.toBuffer()],
                program.programId
            );

            await program.methods
                .mintAchievementNft(mintArg)
                .accounts({
                    stats: statsPda,
                    achievements: achievementsPda,
                    masterEdition: masterEditionPda,
                    metadata: metadataPda,
                    mint,
                    tokenAccount: tokenAddress,
                    user: publicKey,
                    tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                })
                .signers([mintKeypair])
                .rpc();

            setNftMint(mint.toBase58());

            const alert = getMintAchievementAlert(mint.toBase58());
            toast(alert);
        } catch (error) {
            if (error instanceof Error) {
                const alert = getMintAchievementErrorAlert(error.message);
                toast(alert);
            }
        } finally {
            setIsMinting(false);
        }
    };

    useEffect(() => {
        if (
            mint &&
            mint.toBase58() != web3.SystemProgram.programId.toBase58()
        ) {
            setNftMint(mint.toBase58());
        }
    }, [mint]);

    const UnlockedAchievementFooter = () =>
        nftMint ? (
            <Link
                target="_blank"
                href={`https://explorer.solana.com/address/${nftMint}?cluster=devnet`}
            >
                View
            </Link>
        ) : (
            <Button onClick={mintNft} isLoading={isMinting}>
                Mint
            </Button>
        );

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
                    <Image
                        alt={title}
                        width={150}
                        height={150}
                        src={image}
                        placeholder="blur"
                        blurDataURL={imgPlaceholder}
                    />
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
                    <UnlockedAchievementFooter />
                )}
            </CardFooter>
        </Card>
    );
};

export default AchievementCard;
