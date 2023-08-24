import { web3 } from '@project-serum/anchor';

export const airdropSolIfNeeded = async (
    signer: web3.Keypair,
    connection: web3.Connection
) => {
    const balance = await connection.getBalance(signer.publicKey);
    console.log('Current balance is', balance / web3.LAMPORTS_PER_SOL);

    if (balance < web3.LAMPORTS_PER_SOL) {
        console.log('Airdropping 1 SOL...');
        const airdropSignature = await connection.requestAirdrop(
            signer.publicKey,
            web3.LAMPORTS_PER_SOL
        );

        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: airdropSignature,
        });

        const newBalance = await connection.getBalance(signer.publicKey);
        console.log('New balance is', newBalance / web3.LAMPORTS_PER_SOL);
    }
};
