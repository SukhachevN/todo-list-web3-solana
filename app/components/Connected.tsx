import { emptyArray } from '@/utils/constants';
import { AddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    HStack,
    IconButton,
    SimpleGrid,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { BN, web3 } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import TodoModal, { TodoType } from './TodoModal';
import { useWorkspace } from './WorkspaceProvider';

type TodoAccountType = {
    account: TodoType;
    publicKey: web3.PublicKey;
};

const Connected = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const { program } = useWorkspace();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [todos, setTodos] = useState<TodoAccountType[]>([]);
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
                    setTodos(accounts);
                } finally {
                    setIsLoadingTodos(false);
                }
            }
        };
        fetchTodos();
    }, [publicKey, connection, program]);

    return (
        <VStack spacing={10} h="100%">
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
            <SimpleGrid
                p="10px"
                spacing={10}
                w="100%"
                overflow="auto"
                h="100%"
                minChildWidth="300px"
            >
                {isLoadingTodos
                    ? emptyArray.map((_, index) => (
                          <TodoCard key={index} todo={null} />
                      ))
                    : todos.map(({ publicKey, account }) => (
                          <TodoCard key={publicKey.toBase58()} todo={account} />
                      ))}
            </SimpleGrid>
            {!isLoadingTodos && (
                <Center gap={10}>
                    <Button>Previous</Button>
                    <Button>Next</Button>
                </Center>
            )}
        </VStack>
    );
};

export default Connected;
