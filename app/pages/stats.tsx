import { useWallet } from '@solana/wallet-adapter-react';
import { NextPage } from 'next/types';

import Disconnected from '@/components/Disconnected';
import MainLayout from '@/components/MainLayout';
import Stats from '@/components/Stats';

const StatsPage: NextPage = () => {
    const { connected } = useWallet();

    return <MainLayout> {connected ? <Stats /> : <Disconnected />}</MainLayout>;
};

export default StatsPage;
