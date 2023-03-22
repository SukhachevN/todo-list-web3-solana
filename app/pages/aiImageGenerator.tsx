import { useWallet } from '@solana/wallet-adapter-react';
import { NextPage } from 'next/types';

import Disconnected from '@/components/Disconnected';
import MainLayout from '@/components/MainLayout';
import AiImageGenerator from '@/components/AiImageGenerator';

const AiImageGeneratorPage: NextPage = () => {
    const { connected } = useWallet();

    return (
        <MainLayout>
            {connected ? <AiImageGenerator /> : <Disconnected />}
        </MainLayout>
    );
};

export default AiImageGeneratorPage;
