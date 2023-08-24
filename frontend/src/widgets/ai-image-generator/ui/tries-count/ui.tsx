import {
    Box,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { AiImageGeneratorElementType } from '@/shared/types';
import BuyAiImageGeneratorCounterTriesButton from '@/features/buy-ai-image-generator-try/ui';
import { InitializeAiImageTriesCounterButton } from '@/features/initialize-ai-image-tries-counter/ui';

const TriesCount: FC<AiImageGeneratorElementType> = ({
    tryCount,
    todoTokenBalance,
    setTodoTokenBalance,
    setTryCount,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(1);

    const tryWord = tryCount === 1 ? 'try' : 'tries';

    const onChange = (_: string, newAmount: number) => setAmount(newAmount);

    return (
        <Box display="flex" justifyContent="center" w="100%">
            {typeof tryCount === 'number' ? (
                <Box display="flex" alignItems="center" gap="10px">
                    You have
                    <Text variant="gradient-main">{tryCount}</Text>
                    {tryWord} and
                    <Text variant="gradient-main">
                        {todoTokenBalance} $TODO
                    </Text>
                    , buy more
                    <NumberInput
                        defaultValue={1}
                        min={1}
                        w="100px"
                        onChange={onChange}
                        isDisabled={isLoading}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <BuyAiImageGeneratorCounterTriesButton
                        isLoading={isLoading}
                        amount={amount}
                        setIsLoading={setIsLoading}
                        setTodoTokenBalance={setTodoTokenBalance}
                        setTryCount={setTryCount}
                    />
                </Box>
            ) : (
                <InitializeAiImageTriesCounterButton
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setTryCount={setTryCount}
                />
            )}
        </Box>
    );
};

export default TriesCount;
