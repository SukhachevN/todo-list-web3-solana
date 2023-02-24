import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { expect } from 'chai';
import { TodoListWeb3 } from '../target/types/todo_list_web3';
import { airdropSolIfNeeded } from './utils/airdropSolIfNeeded';
import { getPdas } from './utils/getPdas';
import { getTodosAccounts } from './utils/getTodosAccounts';

describe('todo-list-web3', () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.TodoListWeb3 as Program<TodoListWeb3>;

    const user = anchor.web3.Keypair.generate();

    const todoTitle = 'my first todo';

    const { todoPda, counterPda } = getPdas(user, program, todoTitle);

    before(async () => {
        try {
            const connection = new anchor.web3.Connection(
                anchor.web3.clusterApiUrl('devnet')
            );
            await airdropSolIfNeeded(user, connection);
        } catch (error) {
            console.log(error);
        }
    });

    it('create todo', async () => {
        const todo = {
            title: todoTitle,
            description: 'testCreate',
            deadline: new anchor.BN(Date.now()),
        };

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

        const todosAccounts = await getTodosAccounts(user, program);

        const counterAccount = await program.account.todoCounterState.fetch(
            counterPda
        );

        expect(todosAccounts.length === 1);

        expect(todoAccount.title === todo.title);
        expect(todoAccount.description === todo.description);
        expect(todoAccount.deadline === todo.deadline);
        expect(!todoAccount.isCompleted);
        expect(!todoAccount.completeDate);

        expect(counterAccount.total.toNumber() === 1);
        expect(!counterAccount.completed.toNumber());

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('update todo', async () => {
        const updatedTodo = {
            title: todoTitle,
            description: 'testUpdate',
            deadline: new anchor.BN(Date.now()),
            isCompleted: true,
        };

        const tx = await program.methods
            .updateTodo(updatedTodo)
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

        expect(todoAccount.title !== updatedTodo.title);
        expect(todoAccount.description === updatedTodo.description);
        expect(todoAccount.deadline === updatedTodo.deadline);
        expect(todoAccount.isCompleted === updatedTodo.isCompleted);
        expect(todoAccount.completeDate);

        expect(counterAccount.total.toNumber() === 1);
        expect(counterAccount.completed.toNumber());

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('delete todo', async () => {
        const tx = await program.methods
            .deleteTodo()
            .accounts({
                user: user.publicKey,
                todo: todoPda,
                counter: counterPda,
            })
            .signers([user])
            .rpc();

        const counterAccount = await program.account.todoCounterState.fetch(
            counterPda
        );

        const todosAccounts = await getTodosAccounts(user, program);

        expect(!counterAccount.total.toNumber());
        expect(!counterAccount.completed.toNumber());

        expect(!todosAccounts.length);

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });
});
