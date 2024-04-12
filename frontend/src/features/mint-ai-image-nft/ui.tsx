import { Button, useToast } from '@chakra-ui/react';
import { MintAiImageNftArgsType, mintAiImageNft } from './model';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { useMetaplex } from '@/shared/hooks/use-metaplex';
import { Dispatch, SetStateAction } from 'react';
import { GENERATE_AI_IMAGE_NFT_PRICE } from '@/shared/constants';
import { notEnoughTodoTokensErrorAlert } from '@/shared/alerts';

type MintAiImageNftButtonType = {
    isLoading: boolean;
    todoTokenBalance: number;
    setTodoTokenBalance: Dispatch<SetStateAction<number | null>>;
} & Omit<
    MintAiImageNftArgsType,
    'program' | 'publicKey' | 'metaplex' | 'toast' | 'connection'
>;

export const MintAiImageNftButton = ({
    isLoading,
    todoTokenBalance,
    setTodoTokenBalance,
    ...otherProps
}: MintAiImageNftButtonType) => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const { metaplex } = useMetaplex();

    const toast = useToast();

    const mintNft = async () => {
        if (todoTokenBalance < GENERATE_AI_IMAGE_NFT_PRICE) {
            toast(notEnoughTodoTokensErrorAlert);
            return;
        }

        await mintAiImageNft({
            publicKey,
            program,
            metaplex,
            connection,
            toast,
            ...otherProps,
        });

        setTodoTokenBalance(
            (prev) => Number(prev) - GENERATE_AI_IMAGE_NFT_PRICE
        );
    };

    return (
        <Button onClick={mintNft} isLoading={isLoading}>
            Mint NFT
        </Button>
    );
};

export default MintAiImageNftButton;
