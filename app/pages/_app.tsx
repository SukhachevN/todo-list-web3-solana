import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import WalletContextProvider from '@/components/WalletContextProvider';

import { theme } from '@/styles/theme';
import { WorkspaceProvider } from '@/components/WorkSpaceProvider';

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
