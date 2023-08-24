import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { AI_IMAGE_GENERATOR_TRY_PRICE } from '@/shared/constants';

import { BuyMoreTriesType, buyMoreTries } from './model';

type BuyAiImageGeneratorCounterType = {
    isLoading: boolean;
} & Omit<BuyMoreTriesType, 'program' | 'connection' | 'publicKey' | 'toast'>;

export const BuyAiImageGeneratorCounterTriesButton: FC<
    BuyAiImageGeneratorCounterType
> = ({ isLoading, ...otherProps }) => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const toast = useToast();

    const onClick = () => {
        buyMoreTries({ publicKey, program, connection, toast, ...otherProps });
    };

    return (
        <Tooltip label={`1 try = ${AI_IMAGE_GENERATOR_TRY_PRICE} $TODO`}>
            <Button isLoading={isLoading} onClick={onClick}>
                Buy
            </Button>
        </Tooltip>
    );
};

export default BuyAiImageGeneratorCounterTriesButton;
