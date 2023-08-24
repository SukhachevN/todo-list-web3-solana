import { Button, useToast } from '@chakra-ui/react';
import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';

import { InitializeCounterType, initializeCounter } from './model';

type InitializeAiImageTriesCounterButtonType = {
    isLoading: boolean;
} & Omit<
    InitializeCounterType,
    'program' | 'connection' | 'publicKey' | 'toast'
>;

export const InitializeAiImageTriesCounterButton: FC<
    InitializeAiImageTriesCounterButtonType
> = ({ isLoading, ...otherProps }) => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const toast = useToast();

    const onClick = () =>
        initializeCounter({
            publicKey,
            program,
            connection,
            toast,
            ...otherProps,
        });

    return (
        <Button isLoading={isLoading} onClick={onClick}>
            Get 1 free try
        </Button>
    );
};

export default InitializeAiImageTriesCounterButton;
