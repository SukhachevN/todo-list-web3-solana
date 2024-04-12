import { useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { getSavedAiImage } from '@/shared/accounts';
import { SavedAiImageType } from '@/shared/types';

export const useSetSavedAiImage = (
    setSavedAiImage: Dispatch<SetStateAction<SavedAiImageType | null>>
) => {
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            if (!program || !publicKey) return;

            const savedImageAccount = await getSavedAiImage({
                program,
                publicKey,
                toast,
            });

            setSavedAiImage(savedImageAccount);
        };
        fetchData();
    }, [program, publicKey]);
};
