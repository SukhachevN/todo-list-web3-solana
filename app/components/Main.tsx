import {
    HStack,
    useDisclosure,
    VStack,
    Text,
    Button,
    useToast,
    Flex,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { useImmer } from 'use-immer';

import { emptyTodoArray } from '@/utils/constants';
import { CurrentTodoStateType, TodoAccountType } from '@/utils/types';
import { getFetchTodosErrorAlert } from '@/utils/alerts';
import { useFetchTodos } from '@/utils/hooks/useFetchTodos';

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

    const toast = useToast();

    const handleCreateTodo = () => {
        onOpen();
        setCurrentTodo({ index: 0, todo: null });
    };

    const { isLoading, error } = useFetchTodos({
        program,
        publicKey,
        setTodos,
    });

    if (error instanceof Error) {
        const { message } = error;
        const alert = getFetchTodosErrorAlert(message);
        toast(alert);
    }

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
            <Flex
                wrap="wrap"
                w="100%"
                h="100%"
                gap="20px"
                justifyContent="center"
                overflow="auto"
                pb="20px"
            >
                {isLoading
                    ? emptyTodoArray.map((_, index) => (
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
                {!isLoading && !todos.length && (
                    <Text variant="gradient-main" textAlign="center">
                        Here you will see your todos
                    </Text>
                )}
            </Flex>
        </VStack>
    );
};

export default Main;
