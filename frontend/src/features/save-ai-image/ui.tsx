import { Button, useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { useMetaplex } from '@/shared/hooks/use-metaplex';

import { HandleSaveAiImageArgsType, saveAiImage } from './model';

type SaveAiImageType = {
    isLoading: boolean;
    isFormChanged: boolean;
} & Omit<
    HandleSaveAiImageArgsType,
    'publicKey' | 'program' | 'metaplex' | 'toast'
>;

export const SaveAiImageButton = ({
    isFormChanged,
    isLoading,
    ...otherProps
}: SaveAiImageType) => {
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

    const { metaplex } = useMetaplex();

    const toast = useToast();

    const onClick = () => {
        saveAiImage({ publicKey, program, metaplex, toast, ...otherProps });
    };

    return (
        <Button
            onClick={onClick}
            isDisabled={!isFormChanged}
            isLoading={isLoading}
        >
            Save
        </Button>
    );
};

export default SaveAiImageButton;
