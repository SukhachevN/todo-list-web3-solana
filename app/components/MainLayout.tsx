import Head from 'next/head';
import { Box, Spacer } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import NavBar from './Navbar';

import styles from '@/styles/Home.module.css';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Todo list web3</title>
                <meta name="Todo list on solana blockchain" />
                <link rel="icon" href="/solanaLogoMark.svg" />
            </Head>
            <Box h="100vh" padding={4}>
                <NavBar />
                <Spacer />
                <Box h="calc(100% - 48px)">{children}</Box>
            </Box>
        </div>
    );
};

export default MainLayout;
