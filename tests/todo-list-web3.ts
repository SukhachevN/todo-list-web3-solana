import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { expect } from 'chai';
import { TodoListWeb3 } from '../target/types/todo_list_web3';
import { airdropSolIfNeeded } from './utils/airdropSolIfNeeded';

describe('todo-list-web3', () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.TodoListWeb3 as Program<TodoListWeb3>;

    const user = anchor.web3.Keypair.generate();

    before(async () => {
        const connection = new anchor.web3.Connection(
            anchor.web3.clusterApiUrl('devnet')
        );
        await airdropSolIfNeeded(user, connection);
    });

    it('create todo', async () => {
        const todo = {
            title: 'Test',
            description: 'Test',
            deadline: new anchor.BN(Date.now()),
        };

        const [todoPda] = anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from(user.publicKey.toBuffer())],
            program.programId
        );

        const [counterPda] = anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from('counter'), user.publicKey.toBuffer()],
            program.programId
        );

        const tx = await program.methods
            .createTodo(todo)
            .accounts({
                user: user.publicKey,
                todo: todoPda,
                counter: counterPda,
            })
            .signers([user])
            .rpc();

        const todoAccount = await program.account.todoState.fetch(todoPda);

        const counterAccount = await program.account.todoCounterState.fetch(
            counterPda
        );

        expect(todoAccount.title === todo.title);
        expect(todoAccount.description === todo.description);
        expect(todoAccount.deadline === todo.deadline);
        expect(!todoAccount.isCompleted);
        expect(!todoAccount.completeDate);

        expect(counterAccount.total.toNumber() === 1);
        expect(!counterAccount.completed.toNumber());

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });
});
