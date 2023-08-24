import { Button, Link, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { MintArgType } from '@/shared/types';

import { mintNft } from './model';

type MintAchievementNftButtonType = {
    mint: web3.PublicKey | null;
    mintArg: MintArgType;
};

const MintAchievementNftButton = ({
    mint,
    mintArg,
}: MintAchievementNftButtonType) => {
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

    const [isMinting, setIsMinting] = useState(false);
    const [nftMint, setNftMint] = useState('');

    const toast = useToast();

    const onClick = () => {
        mintNft({
            nftMint,
            publicKey,
            program,
            mintArg,
            setIsMinting,
            setNftMint,
            toast,
        });
    };

    useEffect(() => {
        if (
            mint &&
            mint.toBase58() !== web3.SystemProgram.programId.toBase58()
        ) {
            setNftMint(mint.toBase58());
        }
    }, [mint]);

    return nftMint ? (
        <Link
            target="_blank"
            href={`https://explorer.solana.com/address/${nftMint}?cluster=devnet`}
        >
            View
        </Link>
    ) : (
        <Button onClick={onClick} isLoading={isMinting}>
            Mint
        </Button>
    );
};

export default MintAchievementNftButton;
