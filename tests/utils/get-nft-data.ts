import * as anchor from '@project-serum/anchor';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';

export const getNftData = async (user: anchor.web3.Keypair) => {
    const mintKeypair = anchor.web3.Keypair.generate();

    const mint = mintKeypair.publicKey;

    const tokenAddress = await anchor.utils.token.associatedAddress({
        mint,
        owner: user.publicKey,
    });

    const [metadataPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
    );

    const [masterEditionPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from('edition'),
        ],
        TOKEN_METADATA_PROGRAM_ID
    );

    return { mintKeypair, mint, tokenAddress, metadataPda, masterEditionPda };
};
