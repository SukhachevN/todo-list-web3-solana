import { web3, Program } from '@project-serum/anchor';

import { TodoListWeb3 } from '../../target/types/todo_list_web3';

export const getTodosAccounts = async (
    user: web3.Keypair,
    program: Program<TodoListWeb3>
) =>
    await program.account.todoState.all([
        {
            memcmp: {
                offset: 8,
                bytes: user.publicKey.toBase58(),
            },
        },
    ]);
