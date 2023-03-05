import { Flex, Spacer, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic';

import styles from '@/styles/Home.module.css';

const WalletMultiButton = dynamic(
    async () =>
        (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const ActiveLink = dynamic(
    async () => await import('@/components/ActiveLink'),
    {
        ssr: false,
    }
);

const NavBar = () => (
    <Flex h="48px">
        <Flex gap="40px">
            <ActiveLink href="/">Todos</ActiveLink>
            <ActiveLink href="/stats">Stats</ActiveLink>
        </Flex>
        <Spacer />
        <WalletMultiButton
            className={styles['wallet-adapter-button-trigger']}
        />
    </Flex>
);

export default NavBar;
