import { PublicKey } from '@solana/web3.js';
import { AchievementsMetadataType } from './types';

export const emptyTodoArray = new Array(20).fill(0);

export const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID ?? ''
);

export const TOKEN_MINT = new PublicKey(
    process.env.NEXT_PUBLIC_TOKEN_MINT ?? ''
);

export const TODO_DECIMAL = 2;

export const ACHIEVEMENTS =
    'https://gateway.pinata.cloud/ipfs/QmfDMVmNjAjHqe1jTM9hCPAH7LmSUHuxr9fcbun2Qtn4bx';

export const imgPlaceholder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAABDklEQVR42u3SQREAAAQAME4Q/VNSwNNzy7Dsrgl4lmIhFmIhlliIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWYomFWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYsFtAU3vvBf4P8NVAAAAAElFTkSuQmCC';
