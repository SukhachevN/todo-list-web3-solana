import { useWallet } from '@solana/wallet-adapter-react';
import { NextPage } from 'next/types';

import Disconnected from '@/widgets/disconnected';
import Layout from '@/shared/ui/layout';
import Stats from '@/widgets/stats';

const StatsPage: NextPage = () => {
    const { connected } = useWallet();

    return <Layout> {connected ? <Stats /> : <Disconnected />}</Layout>;
};

export default StatsPage;
