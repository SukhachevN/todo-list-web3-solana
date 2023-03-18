import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { expect } from 'chai';
import { TodoListWeb3 } from '../target/types/todo_list_web3';
import { airdropSolIfNeeded } from './utils/airdropSolIfNeeded';
import { getPdas } from './utils/getPdas';
import { getTodosAccounts } from './utils/getTodosAccounts';

describe('todo-list-web3', async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.TodoListWeb3 as Program<TodoListWeb3>;

    const user = anchor.web3.Keypair.generate();

    const todoTitle = 'My first todo';

    const mint = new anchor.web3.PublicKey(
        '2ZHvZ3r17Gu4GevX6dcY8e3s7JGs6NQKJpJydLU8qf86'
    );

    const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );

    const {
        todoPda,
        statsPda,
        mintAuthorityPda,
        achievementsPda,
        aiImageGeneratorCounterPda,
    } = getPdas(user, program, todoTitle);

    const tokenAccount = await getAssociatedTokenAddress(mint, user.publicKey);

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
                stats: statsPda,
                mint,
                mintAuthority: mintAuthorityPda,
                tokenAccount,
            })
            .signers([user])
            .rpc();

        const todoAccount = await program.account.todoState.fetch(todoPda);

        const todosAccounts = await getTodosAccounts(user, program);

        const statsAccount = await program.account.statsState.fetch(statsPda);

        expect(todosAccounts.length === 1);

        expect(todoAccount.title === todo.title);
        expect(todoAccount.description === todo.description);
        expect(todoAccount.deadline === todo.deadline);
        expect(!todoAccount.isCompleted);
        expect(!todoAccount.completeDate);

        expect(statsAccount.created.toNumber() === 1);

        const userAta = await getAccount(provider.connection, tokenAccount);

        expect(Number(userAta.amount) === 50 * Math.pow(10, 2));

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
                stats: statsPda,
                mint,
                mintAuthority: mintAuthorityPda,
                tokenAccount,
            })
            .signers([user])
            .rpc();

        const todoAccount = await program.account.todoState.fetch(todoPda);

        const statsAccount = await program.account.statsState.fetch(statsPda);

        expect(todoAccount.title !== updatedTodo.title);
        expect(todoAccount.description === updatedTodo.description);
        expect(todoAccount.deadline === updatedTodo.deadline);
        expect(todoAccount.isCompleted === updatedTodo.isCompleted);
        expect(todoAccount.completeDate);

        expect(statsAccount.completed.toNumber() === 1);

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('delete todo', async () => {
        const tx = await program.methods
            .deleteTodo()
            .accounts({
                user: user.publicKey,
                todo: todoPda,
                stats: statsPda,
                mint,
                mintAuthority: mintAuthorityPda,
                tokenAccount,
            })
            .signers([user])
            .rpc();

        const statsAccount = await program.account.statsState.fetch(statsPda);

        const todosAccounts = await getTodosAccounts(user, program);

        expect(statsAccount.deleted.toNumber() === 1);

        expect(!todosAccounts.length);

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('mint achievement nft', async () => {
        const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate();

        const mint = mintKeypair.publicKey;

        const tokenAddress = await anchor.utils.token.associatedAddress({
            mint,
            owner: user.publicKey,
        });

        const [metadataPda] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from('metadata'),
                TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ],
            TOKEN_METADATA_PROGRAM_ID
        );

        const [masterEditionPda] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from('metadata'),
                TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
                Buffer.from('edition'),
            ],
            TOKEN_METADATA_PROGRAM_ID
        );

        const tx = await program.methods
            .mintAchievementNft({
                amount: { one: {} },
                actionType: { create: {} },
            })
            .accounts({
                stats: statsPda,
                achievements: achievementsPda,
                masterEdition: masterEditionPda,
                metadata: metadataPda,
                mint,
                tokenAccount: tokenAddress,
                user: user.publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            })
            .signers([mintKeypair, user])
            .rpc();

        const achievementsAccount =
            await program.account.achievementsState.fetch(achievementsPda);

        expect(
            achievementsAccount.createOneTodo.toBase58() ===
                mintKeypair.publicKey.toBase58()
        );

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('init ai image generator counter', async () => {
        const tx = await program.methods
            .initAiImageGeneratorCounter()
            .accounts({
                user: user.publicKey,
                aiImageGeneratorCounter: aiImageGeneratorCounterPda,
            })
            .signers([user])
            .rpc();

        const aiImageGeneratorCounterAccount =
            await program.account.aiImageGeneratingCounterState.fetch(
                aiImageGeneratorCounterPda
            );

        expect(aiImageGeneratorCounterAccount.tryCount === 1);

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('buy ai image generator try', async () => {
        let aiImageGeneratorCounterAccount =
            await program.account.aiImageGeneratingCounterState.fetch(
                aiImageGeneratorCounterPda
            );

        const prevTryCount = aiImageGeneratorCounterAccount.tryCount;

        const amount = 1;

        const tx = await program.methods
            .buyAiImageGeneratorTry(1)
            .accounts({
                user: user.publicKey,
                aiImageGeneratorCounter: aiImageGeneratorCounterPda,
                mint,
                mintAuthority: mintAuthorityPda,
                tokenAccount,
            })
            .signers([user])
            .rpc();

        aiImageGeneratorCounterAccount =
            await program.account.aiImageGeneratingCounterState.fetch(
                aiImageGeneratorCounterPda
            );

        expect(
            aiImageGeneratorCounterAccount.tryCount === prevTryCount + amount
        );

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });
});
