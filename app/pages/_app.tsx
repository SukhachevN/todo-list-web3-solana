import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import WalletContextProvider from '@/components/WalletContextProvider';

import { theme } from '@/utils/theme';
import { WorkspaceProvider } from '@/components/WorkspaceProvider';

const App = ({ Component, pageProps }: AppProps) => (
    <ChakraProvider theme={theme}>
        <WalletContextProvider>
            <WorkspaceProvider>
                <Component {...pageProps} />
            </WorkspaceProvider>
        </WalletContextProvider>
    </ChakraProvider>
);

export default App;
