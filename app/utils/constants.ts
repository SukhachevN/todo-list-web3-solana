import { PublicKey } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_TODO_LIST_WEB3_PROGRAM_ID ?? ''
);
