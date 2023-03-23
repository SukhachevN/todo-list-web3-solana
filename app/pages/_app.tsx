import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import WalletContextProvider from '@/components/WalletContextProvider';
import { theme } from '@/utils/theme';
import { WorkspaceProvider } from '@/components/WorkspaceProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
    <ChakraProvider theme={theme}>
        <WalletContextProvider>
            <WorkspaceProvider>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </WorkspaceProvider>
        </WalletContextProvider>
    </ChakraProvider>
);

export default App;
