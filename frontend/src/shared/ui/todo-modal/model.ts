import { useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Updater } from 'use-immer';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { web3 } from '@project-serum/anchor';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { getDateFromTodo } from '@/shared/date';
import { handleCreateUpdateTodo } from '@/shared/helpers/handle-create-update-todo';
import { TodoAccountType, TodoStateType, TodoType } from '@/shared/types';
import { mintAuthoritySeed, statsSeed } from '@/shared/seeds';
import { TOKEN_MINT } from '@/shared/constants';
import { getDeleteTodoAlert, getDeleteTodoErrorAlert } from '@/shared/alerts';

export type UseTodoModalType = {
    todo: TodoType | null;
    onClose: () => void;
    setTodos: Updater<TodoAccountType[]>;
    index: number;
};

export const useTodoModal = ({
    todo,
    setTodos,
    onClose,
    index,
}: UseTodoModalType) => {
    const { publicKey, sendTransaction } = useWallet();

    const { program, connection } = useWorkspace();

    const [isUpdating, setIsUpdating] = useState(false);

    const [todoState, setTodoState] = useState<TodoStateType>({
        title: todo?.title ?? '',
        description: todo?.description ?? '',
        isCompleted: !!todo?.isCompleted,
        deadline: getDateFromTodo(todo),
    });

    const toast = useToast();

    const isFormChanged =
        todoState.title !== todo?.title ||
        todoState.description !== todo.description ||
        todoState.isCompleted !== todo?.isCompleted ||
        todoState.deadline !== getDateFromTodo(todo);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await handleCreateUpdateTodo({
            index,
            toast,
            connection,
            todo,
            todoState,
            program,
            publicKey,
            setIsUpdating,
            sendTransaction,
            onClose,
            setTodos,
        });

        setTodoState({
            title: '',
            description: '',
            isCompleted: false,
            deadline: '',
        });
    };

    const onDelete = async () => {
        if (!publicKey || !program || !todo || !connection) return;

        setIsUpdating(true);

        const [todoPda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from(todo.title), publicKey.toBuffer()],
            program.programId
        );

        const [statsPda] = web3.PublicKey.findProgramAddressSync(
            [statsSeed, publicKey.toBuffer()],
            program.programId
        );

        const tokenAccount = await getAssociatedTokenAddress(
            TOKEN_MINT,
            publicKey
        );

        const [mintAuthorityPda] = web3.PublicKey.findProgramAddressSync(
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

    const onChange = ({
        target,
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, checked, type } = target as EventTarget &
            (HTMLInputElement | HTMLTextAreaElement) & { checked?: boolean };

        const newValue = type === 'checkbox' ? checked : value;

        setTodoState((prev) => ({ ...prev, [name]: newValue }));
    };

    useEffect(() => {
        setTodoState({
            title: todo?.title ?? '',
            description: todo?.description ?? '',
            isCompleted: !!todo?.isCompleted,
            deadline: getDateFromTodo(todo),
        });
    }, [todo]);

    return {
        todoState,
        isUpdating,
        isFormChanged,
        onSubmit,
        onChange,
        onDelete,
    };
};
