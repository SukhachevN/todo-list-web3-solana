import { getAssociatedTokenAddress } from '@solana/spl-token';
import { PublicKey, Transaction } from '@solana/web3.js';

import { getDeleteTodoAlert, getDeleteTodoErrorAlert } from '@/shared/alerts';
import { TOKEN_MINT } from '@/shared/constants';
import { mintAuthoritySeed, statsSeed } from '@/shared/seeds';
import { HandleCreateUpdateTodoArgs } from '@/shared/helpers/handle-create-update-todo';

export type HandleDeleteTodoArgs = Omit<
    HandleCreateUpdateTodoArgs,
    'todoState'
>;

export const handleDeleteTodo = async ({
    index,
    publicKey,
    program,
    todo,
    connection,
    setIsUpdating,
    sendTransaction,
    toast,
    onClose,
    setTodos,
}: HandleDeleteTodoArgs) => {
    if (!publicKey || !program || !todo || !connection) return;

    setIsUpdating(true);

    const [todoPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(todo.title), publicKey.toBuffer()],
        program.programId
    );

    const [statsPda] = PublicKey.findProgramAddressSync(
        [statsSeed, publicKey.toBuffer()],
        program.programId
    );

    const tokenAccount = await getAssociatedTokenAddress(TOKEN_MINT, publicKey);

    const [mintAuthorityPda] = PublicKey.findProgramAddressSync(
        [mintAuthoritySeed],
        program.programId
    );

    try {
        const instruction = await program.methods
            .deleteTodo()
            .accounts({
                todo: todoPda,
                stats: statsPda,
                mint: TOKEN_MINT,
                tokenAccount,
                mintAuthority: mintAuthorityPda,
            })
            .transaction();

        const transaction = new Transaction().add(instruction);

        await sendTransaction(transaction, connection);

        const alert = getDeleteTodoAlert(todo.title);

        toast(alert);

        setTodos((todos) => {
            todos.splice(index, 1);

            return todos;
        });

        onClose?.();
    } catch (error) {
        if (error instanceof Error) {
            const { message } = error;

            const alert = getDeleteTodoErrorAlert(todo.title, message);

            toast(alert);
        }
    } finally {
        setIsUpdating(false);
    }
};
