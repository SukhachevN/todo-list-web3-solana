import { useWallet } from '@solana/wallet-adapter-react';
import { NextPage } from 'next/types';

import TodoList from '@/widgets/todo-list';
import Disconnected from '@/widgets/disconnected';
import { Layout } from '@/shared/ui';

const MainPage: NextPage = () => {
    const { connected } = useWallet();

    return <Layout>{connected ? <TodoList /> : <Disconnected />}</Layout>;
};

export default MainPage;
