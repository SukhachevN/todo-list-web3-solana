import { useWallet } from '@solana/wallet-adapter-react';
import { NextPage } from 'next/types';

import Main from '@/components/Main';
import Disconnected from '@/components/Disconnected';
import MainLayout from '@/components/MainLayout';

const Home: NextPage = () => {
    const { connected } = useWallet();

    return <MainLayout> {connected ? <Main /> : <Disconnected />}</MainLayout>;
};

export default Home;
