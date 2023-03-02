import {
    HStack,
    SimpleGrid,
    useDisclosure,
    VStack,
    Text,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import { emptyArray } from '@/utils/constants';
import { CurrentTodoStateType, TodoAccountType } from '@/utils/types';
import { getFetchTodosErrorAlert } from '@/utils/alerts';

import TodoCard from './TodoCard';
import TodoModal from './TodoModal';
import { useWorkspace } from './WorkspaceProvider';

const Main = () => {
    const { publicKey } = useWallet();

    const { program } = useWorkspace();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [todos, setTodos] = useImmer<TodoAccountType[]>([]);

    const [currentTodo, setCurrentTodo] = useState<CurrentTodoStateType>({
        index: 0,
        todo: null,
    });
    const [isLoadingTodos, setIsLoadingTodos] = useState(false);

    const toast = useToast();

    const handleCreateTodo = () => {
        onOpen();
        setCurrentTodo({ index: 0, todo: null });
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
                    setTodos(
                        accounts.sort(
                            (a, b) =>
                                b.account.createDate.toNumber() -
                                a.account.createDate.toNumber()
                        )
                    );
                } catch (error) {
                    if (error instanceof Error) {
                        const { message } = error;

                        const alert = getFetchTodosErrorAlert(message);

                        toast(alert);
                    }
                } finally {
                    setIsLoadingTodos(false);
                }
            }
        };
        fetchTodos();
    }, [publicKey, program]);

    return (
        <VStack spacing={10} h="100%">
            <HStack alignItems="flex-start" p="20px">
                <Button onClick={handleCreateTodo}>Create todo</Button>
                <TodoModal
                    index={currentTodo.index}
                    isOpen={isOpen}
                    onClose={onClose}
                    todo={currentTodo.todo}
                    setTodos={setTodos}
                />
            </HStack>
            <SimpleGrid
                p="10px"
                spacing={10}
                w="100%"
                overflow="auto"
                h="100%"
                minChildWidth="400px"
            >
                {isLoadingTodos
                    ? emptyArray.map((_, index) => (
                          <TodoCard
                              key={index}
                              index={index}
                              todo={null}
                              setTodos={setTodos}
                          />
                      ))
                    : todos.map(({ publicKey, account }, index) => (
                          <TodoCard
                              index={index}
                              key={publicKey.toBase58()}
                              todo={account}
                              setTodos={setTodos}
                          />
                      ))}
                {!isLoadingTodos && !todos.length && (
                    <Text variant="with-gradient" textAlign="center">
                        Here you will see your todos
                    </Text>
                )}
            </SimpleGrid>
        </VStack>
    );
};

export default Main;
