import { Button, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

import { AI_IMAGE_GENERATOR_TRY_PRICE } from '@/shared/constants';

import { BuyMoreTriesType, useBuyMoreTries } from './model';

type BuyAiImageGeneratorCounterType = {
    isLoading: boolean;
} & BuyMoreTriesType;

export const BuyAiImageGeneratorCounterTriesButton: FC<
    BuyAiImageGeneratorCounterType
> = ({ isLoading, ...otherProps }) => {
    const buyMoreTries = useBuyMoreTries(otherProps);

    return (
        <Tooltip label={`1 try = ${AI_IMAGE_GENERATOR_TRY_PRICE} $TODO`}>
            <Button isLoading={isLoading} onClick={buyMoreTries}>
                Buy
            </Button>
        </Tooltip>
    );
};

export default BuyAiImageGeneratorCounterTriesButton;
