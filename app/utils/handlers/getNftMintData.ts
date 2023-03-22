import { web3, utils } from '@project-serum/anchor';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { masterEditionSeed, metadataSeed } from '../seeds';

export const getNftMintData = async (publicKey: web3.PublicKey) => {
    const mintKeypair = web3.Keypair.generate();

    const mint = mintKeypair.publicKey;

    const tokenAddress = await utils.token.associatedAddress({
        mint,
        owner: publicKey,
    });

    const [metadataPda] = web3.PublicKey.findProgramAddressSync(
        [metadataSeed, TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        TOKEN_METADATA_PROGRAM_ID
    );

    const [masterEditionPda] = web3.PublicKey.findProgramAddressSync(
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
