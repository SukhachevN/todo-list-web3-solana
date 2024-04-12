import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { GenerateAiImageType, useGenerateAiImage } from './model';

type GenerateAiImageButtonType = {
    isDisabled: boolean;
} & GenerateAiImageType;

export const GenerateAiImageButton: FC<GenerateAiImageButtonType> = ({
    isDisabled,
    ...otherProps
}) => {
    const { isGenerating, handleGenerate } = useGenerateAiImage(otherProps);

    return (
        <Button
            onClick={handleGenerate}
            isLoading={isGenerating}
            isDisabled={isDisabled}
        >
            Generate
        </Button>
    );
};

export default GenerateAiImageButton;
