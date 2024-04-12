import {
    AnchorProvider,
    Program,
    setProvider,
    web3,
} from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

import { PROGRAM_ID } from '@/shared/constants';
import { mockWallet } from '@/shared/wallet';
import { IDL, TodoListWeb3 } from '@/shared/todo-list/todo_list_web3';

const WorkspaceContext = createContext({});

type Workspace = {
    connection?: web3.Connection;
    provider?: AnchorProvider;
    program?: Program<TodoListWeb3>;
};

const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const wallet = useAnchorWallet() || mockWallet;

    const { connection } = useConnection();

    const provider = new AnchorProvider(connection, wallet, {});

    setProvider(provider);

    const program = new Program(IDL, PROGRAM_ID);

    const workspace = {
        connection,
        provider,
        program,
    };

    return (
        <WorkspaceContext.Provider value={workspace}>
            {children}
        </WorkspaceContext.Provider>
    );
};

const useWorkspace = (): Workspace => useContext(WorkspaceContext);

export { WorkspaceProvider, useWorkspace };
