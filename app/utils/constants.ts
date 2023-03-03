import { PublicKey } from '@solana/web3.js';

export const emptyArray = new Array(20).fill(0);

export const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID ?? ''
);

export const TOKEN_MINT = new PublicKey(
    process.env.NEXT_PUBLIC_TOKEN_MINT ?? ''
);
