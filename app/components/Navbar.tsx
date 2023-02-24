import { Flex, HStack, Spacer } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import styles from '@/styles/Home.module.css';

const WalletMultiButton = dynamic(
    async () =>
        (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const NavBar = () => (
    <Flex h="48px">
        <Spacer />
        <WalletMultiButton
            className={styles['wallet-adapter-button-trigger']}
        />
    </Flex>
);

export default NavBar;
