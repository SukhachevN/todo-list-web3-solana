import { PROGRAM_ID } from '@/utils/constants';
import mockWallet from '@/utils/mockWallet';
import { IDL, TodoListWeb3 } from '@/utils/todo_list_web3';
import { AnchorProvider, Program, setProvider } from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { createContext, useContext } from 'react';

const WorkspaceContext = createContext({});

type Workspace = {
    connection?: Connection;
    provider?: AnchorProvider;
    program?: Program<TodoListWeb3>;
};

const WorkspaceProvider = ({ children }: any) => {
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

const useWorkspace = (): Workspace => {
    return useContext(WorkspaceContext);
};

export { WorkspaceProvider, useWorkspace };
