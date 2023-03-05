import { web3 } from '@project-serum/anchor';
import { getAssociatedTokenAddress } from '@solana/spl-token';

import { getDeleteTodoAlert, getDeleteTodoErrorAlert } from '../alerts';
import { TOKEN_MINT } from '../constants';
import { HandleCreateUpdateTodoArgs } from './handleCreateUpdateTodo';

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
    if (!publicKey || !program || !todo || !connection) {
        return;
    }

    setIsUpdating(true);

    const [todoPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(todo.title), publicKey.toBuffer()],
        program.programId
    );

    const [statsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('stats'), publicKey.toBuffer()],
        program.programId
    );

    const tokenAccount = await getAssociatedTokenAddress(TOKEN_MINT, publicKey);

    const [mintAuthorityPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('mint')],
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

        const transaction = new web3.Transaction().add(instruction);

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
