import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { expect } from 'chai';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { TodoListWeb3 } from '../target/types/todo_list_web3';
import { airdropSolIfNeeded } from './utils/airdropSolIfNeeded';
import { getPdas } from './utils/getPdas';
import { getTodosAccounts } from './utils/getTodosAccounts';
import { getNftData } from './utils/getNftData';

describe('todo-list-web3', async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.TodoListWeb3 as Program<TodoListWeb3>;

    const user = anchor.web3.Keypair.generate();

    const todoTitle = 'My first todo';

    const mint = new anchor.web3.PublicKey(process.env.TOKEN_MINT);

    const aiImageUri =
        'https://arweave.net/cwOs2avM3c1ZSh-rxi3e4YM1mwDBYmTdtdtw4seKOK4';

    const {
        todoPda,
        statsPda,
        mintAuthorityPda,
        achievementsPda,
        aiImageGeneratorCounterPda,
        savedAiImagePda,
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
        const {
            mintKeypair,
            mint,
            tokenAddress,
            metadataPda,
            masterEditionPda,
        } = await getNftData(user);

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
            .initAiImageGenerator()
            .accounts({
                user: user.publicKey,
                aiImageGeneratorCounter: aiImageGeneratorCounterPda,
                savedAiImage: savedAiImagePda,
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

    it('use ai image generator try', async () => {
        let aiImageGeneratorCounterAccount =
            await program.account.aiImageGeneratingCounterState.fetch(
                aiImageGeneratorCounterPda
            );

        const prevTryCount = aiImageGeneratorCounterAccount.tryCount;

        const tx = await program.methods
            .useAiImageGeneratorTry()
            .accounts({
                user: user.publicKey,
                aiImageGeneratorCounter: aiImageGeneratorCounterPda,
            })
            .signers([user])
            .rpc();

        aiImageGeneratorCounterAccount =
            await program.account.aiImageGeneratingCounterState.fetch(
                aiImageGeneratorCounterPda
            );

        expect(aiImageGeneratorCounterAccount.tryCount === prevTryCount - 1);

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('save ai image', async () => {
        const tx = await program.methods
            .saveAiImage(aiImageUri)
            .accounts({ user: user.publicKey, savedAiImage: savedAiImagePda })
            .signers([user])
            .rpc();

        const savedAiImageAccount =
            await program.account.savedAiImageState.fetch(savedAiImagePda);

        expect(savedAiImageAccount.uri === aiImageUri);

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });

    it('mint ai image nft', async () => {
        const title = 'Ai image example';

        const {
            mintKeypair,
            mint: nftMint,
            tokenAddress,
            metadataPda,
            masterEditionPda,
        } = await getNftData(user);

        const tx = await program.methods
            .mintAiImageNft(title, aiImageUri)
            .accounts({
                masterEdition: masterEditionPda,
                metadata: metadataPda,
                nftMint,
                nftTokenAccount: tokenAddress,
                user: user.publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                todoTokenMint: mint,
                mintAuthority: mintAuthorityPda,
                todoTokenAccount: tokenAccount,
                savedAiImage: savedAiImagePda,
            })
            .signers([user, mintKeypair])
            .rpc();

        const savedAiImageAccount =
            await program.account.savedAiImageState.fetch(savedAiImagePda);

        expect(savedAiImageAccount.uri === aiImageUri);

        expect(nftMint.toBase58() === savedAiImageAccount.mint.toBase58());

        console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    });
});
