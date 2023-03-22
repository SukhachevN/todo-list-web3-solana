import { toMetaplexFile } from '@metaplex-foundation/js';
import { web3 } from '@project-serum/anchor';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';

import { AI_IMAGE_SYMBOL, TOKEN_MINT } from '../constants';
import { getMintAiImageNftErrorAlert, getMintAImageNftAlert } from '../alerts';
import { SavedAiImageType } from '../types';
import { getNftMintData } from './getNftMintData';
import { HandleSaveAiImageArgsType } from './handleSaveAiImage';
import { mintAuthoritySeed, savedAiImageSeed } from '../seeds';

export type HandleMintAiImageNftArgsType = HandleSaveAiImageArgsType & {
    isFormChanged: boolean;
    savedAiImage: SavedAiImageType | null;
    connection?: web3.Connection;
};

export const handleMintAiImageNft = async ({
    publicKey,
    program,
    name,
    toast,
    img,
    description,
    metaplex,
    connection,
    isFormChanged,
    savedAiImage,
    setIsLoading,
    setSavedAiImage,
    onClose,
}: HandleMintAiImageNftArgsType) => {
    if (!publicKey || !program || !connection) return;

    try {
        setIsLoading(true);

        const buffer = Buffer.from(
            img.split('data:image/png;base64,').pop() as string,
            'base64'
        );

        const { uri } =
            isFormChanged || !savedAiImage
                ? await metaplex.nfts().uploadMetadata({
                      name,
                      description,
                      symbol: AI_IMAGE_SYMBOL,
                      image: toMetaplexFile(buffer, `${name}.png`),
                  })
                : savedAiImage;

        const [mintAuthorityPda] = web3.PublicKey.findProgramAddressSync(
            [mintAuthoritySeed],
            program.programId
        );

        const [savedAiImagePda] = web3.PublicKey.findProgramAddressSync(
            [savedAiImageSeed, publicKey.toBuffer()],
            program.programId
        );

        const tokenAccount = await getAssociatedTokenAddress(
            TOKEN_MINT,
            publicKey
        );

        const {
            mintKeypair,
            mint: nftMint,
            tokenAddress,
            metadataPda,
            masterEditionPda,
        } = await getNftMintData(publicKey);

        await program.methods
            .mintAiImageNft(name, uri)
            .accounts({
                masterEdition: masterEditionPda,
                metadata: metadataPda,
                nftMint,
                nftTokenAccount: tokenAddress,
                user: publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                todoTokenMint: TOKEN_MINT,
                mintAuthority: mintAuthorityPda,
                todoTokenAccount: tokenAccount,
                savedAiImage: savedAiImagePda,
            })
            .signers([mintKeypair])
            .rpc();

        if (isFormChanged || !savedAiImage) {
            const metadataResponse = await fetch(uri);
            const metadata = await metadataResponse.json();

            setSavedAiImage({ ...metadata, mint: nftMint.toBase58(), uri });
        } else {
            setSavedAiImage({
                ...savedAiImage,
                mint: nftMint.toBase58(),
            });
        }

        const alert = getMintAImageNftAlert(nftMint.toBase58());
        toast(alert);
    } catch (error) {
        if (error instanceof Error) {
            const alert = getMintAiImageNftErrorAlert(error.message);
            toast(alert);
        }
    } finally {
        setIsLoading(false);
        onClose();
    }
};
