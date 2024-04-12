import { web3 } from '@project-serum/anchor';

export const mockWallet = {
    publicKey: web3.Keypair.generate().publicKey,
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject(),
};
