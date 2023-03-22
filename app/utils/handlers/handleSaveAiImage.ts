import { CreateToastFnReturn } from '@chakra-ui/react';
import { Metaplex, toMetaplexFile } from '@metaplex-foundation/js';
import { Program, web3 } from '@project-serum/anchor';

import {
    addNameToNftErrorAlert,
    saveAiImageAlert,
    getSaveAiImageErrorAlert,
} from '../alerts';
import { AI_IMAGE_SYMBOL } from '../constants';
import { savedAiImageSeed } from '../seeds';
import { TodoListWeb3 } from '../todo_list_web3';
import { SavedAiImageType } from '../types';

export type HandleSaveAiImageArgsType = {
    publicKey: web3.PublicKey | null;
    program: Program<TodoListWeb3> | undefined;
    name: string;
    toast: CreateToastFnReturn;
    img: string;
    description: string;
    metaplex: Metaplex;
    setIsLoading: (value: boolean) => void;
    setSavedAiImage: (savedImage: SavedAiImageType | null) => void;
    onClose: () => void;
};

export const handleSaveAiImage = async ({
    publicKey,
    program,
    name,
    toast,
    img,
    description,
    metaplex,
    setIsLoading,
    setSavedAiImage,
    onClose,
}: HandleSaveAiImageArgsType) => {
    if (!publicKey || !program) return;

    if (!name) {
        toast(addNameToNftErrorAlert);
        return;
    }

    const buffer = Buffer.from(
        img.split('data:image/png;base64,').pop() as string,
        'base64'
    );

    try {
        setIsLoading(true);

        const { uri } = await metaplex.nfts().uploadMetadata({
            name,
            description,
            symbol: AI_IMAGE_SYMBOL,
            image: toMetaplexFile(buffer, `${name}.png`),
        });

        const [savedAiImagePda] = web3.PublicKey.findProgramAddressSync(
            [savedAiImageSeed, publicKey.toBuffer()],
            program.programId
        );

        await program.methods
            .saveAiImage(uri)
            .accounts({
                user: publicKey,
                savedAiImage: savedAiImagePda,
            })
            .rpc();

        toast(saveAiImageAlert);

        const metadataResponse = await fetch(uri);
        const metadata = await metadataResponse.json();

        setSavedAiImage({ ...metadata, mint: '', uri });

        onClose();
    } catch (error) {
        if (error instanceof Error) {
            const alert = getSaveAiImageErrorAlert(error.message);

            toast(alert);
        }
    } finally {
        setIsLoading(false);
    }
};
