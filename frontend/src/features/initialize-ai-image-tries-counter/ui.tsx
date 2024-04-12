import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { InitializeCounterType, useInitializeCounter } from './model';

type InitializeAiImageTriesCounterButtonType = {
    isLoading: boolean;
} & InitializeCounterType;

export const InitializeAiImageTriesCounterButton: FC<
    InitializeAiImageTriesCounterButtonType
> = ({ isLoading, ...otherProps }) => {
    const initializeCounter = useInitializeCounter(otherProps);

    return (
        <Button isLoading={isLoading} onClick={initializeCounter}>
            Get 1 free try
        </Button>
    );
};

export default InitializeAiImageTriesCounterButton;
