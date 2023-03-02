import { Keypair } from '@solana/web3.js';

const mockWallet = {
    publicKey: Keypair.generate().publicKey,
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject(),
};

export default mockWallet;
