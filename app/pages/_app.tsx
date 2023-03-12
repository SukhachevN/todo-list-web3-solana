import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import WalletContextProvider from '@/components/WalletContextProvider';
import { theme } from '@/utils/theme';
import { WorkspaceProvider } from '@/components/WorkspaceProvider';
import { MetaplexProvider } from '@/components/MetaplexProvider';

const App = ({ Component, pageProps }: AppProps) => (
    <ChakraProvider theme={theme}>
        <WalletContextProvider>
            <WorkspaceProvider>
                <MetaplexProvider>
                    <Component {...pageProps} />
                </MetaplexProvider>
            </WorkspaceProvider>
        </WalletContextProvider>
    </ChakraProvider>
);

export default App;
