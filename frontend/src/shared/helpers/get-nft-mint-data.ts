import { Keypair, PublicKey } from '@solana/web3.js';
import { utils } from '@project-serum/anchor';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';

import { masterEditionSeed, metadataSeed } from '@/shared/seeds';

export const getNftMintData = async (publicKey: PublicKey) => {
    const mintKeypair = Keypair.generate();

    const mint = mintKeypair.publicKey;

    const tokenAddress = await utils.token.associatedAddress({
        mint,
        owner: publicKey,
    });

    const [metadataPda] = PublicKey.findProgramAddressSync(
        [metadataSeed, TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        TOKEN_METADATA_PROGRAM_ID
    );

    const [masterEditionPda] = PublicKey.findProgramAddressSync(
        [
            metadataSeed,
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            masterEditionSeed,
        ],
        TOKEN_METADATA_PROGRAM_ID
    );

    return {
        mintKeypair,
        mint,
        tokenAddress,
        metadataPda,
        masterEditionPda,
    };
};
