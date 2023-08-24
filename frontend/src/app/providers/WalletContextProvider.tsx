import { Adapter } from '@solana/wallet-adapter-base';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, PropsWithChildren, useMemo } from 'react';

require('@solana/wallet-adapter-react-ui/styles.css');

const wallets: Adapter[] = [];

const WalletContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const url = useMemo(() => clusterApiUrl('devnet'), []);

    return (
        <ConnectionProvider endpoint={url}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
