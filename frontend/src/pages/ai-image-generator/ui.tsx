import { useWallet } from '@solana/wallet-adapter-react';
import { NextPage } from 'next/types';

import Disconnected from '@/widgets/disconnected';
import { Layout } from '@/shared/ui';
import AiImageGenerator from '@/widgets/ai-image-generator';

const AiImageGeneratorPage: NextPage = () => {
    const { connected } = useWallet();

    return (
        <Layout>{connected ? <AiImageGenerator /> : <Disconnected />}</Layout>
    );
};

export default AiImageGeneratorPage;
