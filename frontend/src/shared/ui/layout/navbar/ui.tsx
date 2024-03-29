import { Flex, Spacer } from '@chakra-ui/react';

import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
    async () =>
        (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const ActiveLink = dynamic(async () => await import('./active-link'), {
    ssr: false,
});

const NavBar = () => (
    <Flex h="48px">
        <Flex gap="40px">
            <ActiveLink href="/">Todos</ActiveLink>
            <ActiveLink href="/stats">Stats</ActiveLink>
            <ActiveLink href="/ai-image-generator">
                AI Image Generator
            </ActiveLink>
        </Flex>
        <Spacer />
        <WalletMultiButton />
    </Flex>
);

export default NavBar;
