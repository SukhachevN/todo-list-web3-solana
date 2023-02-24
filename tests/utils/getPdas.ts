import { web3, Program } from '@project-serum/anchor';
import { TodoListWeb3 } from '../../target/types/todo_list_web3';

export const getPdas = (
    user: web3.Keypair,
    program: Program<TodoListWeb3>,
    todoTitle: string
) => {
    const [todoPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(user.publicKey.toBuffer()), Buffer.from(todoTitle)],
        program.programId
    );

    const [counterPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('counter'), user.publicKey.toBuffer()],
        program.programId
    );

    return { todoPda, counterPda };
};
