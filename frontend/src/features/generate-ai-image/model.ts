import { useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { web3 } from '@project-serum/anchor';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import {
    getUseGeneratorTryErrorAlert,
    loadAiImageErrorAlert,
    loadTimeAiImageErrorAlert,
} from '@/shared/alerts';
import { aiImageGeneratorCounterSeed } from '@/shared/seeds';
import { SavedAiImageType } from '@/shared/types';
import { MAX_LOAD_AI_IMG_RETRY_COUNT } from '@/shared/constants';

export type GenerateAiImageType = {
    input: string;
    isGenerating: boolean;
    setIsGenerating: Dispatch<SetStateAction<boolean>>;
    setInput: Dispatch<SetStateAction<string>>;
    setFinalPrompt: Dispatch<SetStateAction<string>>;
    setImg: Dispatch<SetStateAction<string>>;
    setSavedAiImage: Dispatch<SetStateAction<SavedAiImageType | null>>;
    setTryCount: Dispatch<SetStateAction<number | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const useGenerateAiImage = ({
    input,
    isGenerating,
    setIsGenerating,
    setInput,
    setFinalPrompt,
    setImg,
    setSavedAiImage,
    setTryCount,
    setIsLoading,
}: GenerateAiImageType) => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const [retry, setRetry] = useState(0);
    const [retryCount, setRetryCount] = useState(MAX_LOAD_AI_IMG_RETRY_COUNT);

    const toast = useToast();

    const generateAction = async () => {
        if (isGenerating && !retry) return;

        setIsGenerating(true);

        if (retry > 0) {
            setRetryCount((prev) => (prev ? prev - 1 : 0));
            setRetry(0);
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/png',
                },
                body: JSON.stringify({ input }),
            });
            const data = await response.json();

            if (response.status === 503) {
                setRetry(data.estimated_time);
                return;
            }

            if (!response.ok) {
                setIsGenerating(false);
                toast(loadAiImageErrorAlert);
                return;
            }

            setImg(data.image);
        } catch {
            toast(loadAiImageErrorAlert);
        }

        setFinalPrompt(input);
        setInput('');
        setIsGenerating(false);
        setSavedAiImage(null);
    };

    const handleGenerate = async () => {
        if (!publicKey || !program || !connection) return;

        try {
            const [counterPda] = web3.PublicKey.findProgramAddressSync(
                [aiImageGeneratorCounterSeed, publicKey.toBuffer()],
                program.programId
            );

            await program.methods
                .useAiImageGeneratorTry()
                .accounts({
                    user: publicKey,
                    aiImageGeneratorCounter: counterPda,
                })
                .rpc();

            setTryCount((prev) => (typeof prev === 'number' ? prev - 1 : null));
            generateAction();
        } catch (error) {
            if (error instanceof Error) {
                const alert = getUseGeneratorTryErrorAlert(error.message);

                toast(alert);
            }
        }
    };

    useEffect(() => {
        const runRetry = async () => {
            if (!retryCount) {
                toast(loadTimeAiImageErrorAlert);
                setIsLoading(false);
                setRetryCount(MAX_LOAD_AI_IMG_RETRY_COUNT);
                return;
            }

            await new Promise<void>((resolve) =>
                setTimeout(() => resolve(), retry * 1000)
            );

            await generateAction();
        };

        if (!retry) return;

        runRetry();
    }, [retry]);

    return { isGenerating, handleGenerate };
};
