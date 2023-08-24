import { FC, PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '@/shared/theme';

import WalletContextProvider from './WalletContextProvider';
import { WorkspaceProvider } from './WorkspaceProvider';

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => (
    <ChakraProvider theme={theme}>
        <WalletContextProvider>
            <WorkspaceProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WorkspaceProvider>
        </WalletContextProvider>
    </ChakraProvider>
);

export default Provider;
