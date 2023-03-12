import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createContext, ReactNode, useContext, useMemo } from 'react';

const MetaplexContext = createContext({});

const MetaplexProvider = ({ children }: { children: ReactNode }) => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const metaplex = useMemo(
        () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
        [connection, wallet]
    );

    return (
        <MetaplexContext.Provider value={{ metaplex }}>
            {children}
        </MetaplexContext.Provider>
    );
};

const useMetaplex = (): { metaplex?: Metaplex } => useContext(MetaplexContext);

export { MetaplexProvider, useMetaplex };
