import { HStack, VStack, Text, Flex } from '@chakra-ui/react';

import { emptyTodoArray } from '@/shared/constants';
import TodoCard from '@/entities/todo';
import CreateTodoButton from '@/features/create-todo/ui';

import { useTodos } from './model';

const TodoList = () => {
    const { todos, setTodos, isLoading } = useTodos();

    return (
        <VStack spacing={10} h="100%">
            <HStack alignItems="flex-start" p="20px">
                <CreateTodoButton setTodos={setTodos} />
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

export default TodoList;
