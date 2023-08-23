import { Keypair } from '@solana/web3.js';

export const mockWallet = {
    publicKey: Keypair.generate().publicKey,
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject(),
};
