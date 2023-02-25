import { AddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    HStack,
    IconButton,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import TodoModal, { TodoType } from './TodoModal';
import { useWorkspace } from './WorkspaceProvider';

const Connected = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const { program } = useWorkspace();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [todos, setTodos] = useState<TodoType[]>([]);
    const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
    const [isLoadingTodos, setIsLoadingTodos] = useState(false);

    const handleCreateTodo = () => {
        onOpen();
        setCurrentTodo(null);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            if (program && publicKey) {
                try {
                    setIsLoadingTodos(true);
                    const accounts = await program.account.todoState.all([
                        {
                            memcmp: {
                                offset: 8,
                                bytes: publicKey.toBase58(),
                            },
                        },
                    ]);
                    console.log(accounts);
                } finally {
                    setIsLoadingTodos(false);
                }
            }
        };
        fetchTodos();
    }, [publicKey, connection, program]);

    return (
        <VStack spacing={30}>
            <HStack alignItems="flex-start" p={20}>
                <IconButton
                    aria-label="create todo"
                    icon={<AddIcon />}
                    onClick={handleCreateTodo}
                />
                <TodoModal
                    isOpen={isOpen}
                    onClose={onClose}
                    todo={currentTodo}
                />
            </HStack>
        </VStack>
    );
};

export default Connected;
