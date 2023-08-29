import { Button, useDisclosure } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Updater } from 'use-immer';

import { CurrentTodoStateType, TodoAccountType } from '@/shared/types';
import { TodoModal } from '@/shared/ui';

type CreateTodoButtonType = {
    setTodos: Updater<TodoAccountType[]>;
};

const CreateTodoButton: FC<CreateTodoButtonType> = ({ setTodos }) => {
    const [currentTodo, setCurrentTodo] = useState<CurrentTodoStateType>({
        index: 0,
        todo: null,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCreateTodo = () => {
        onOpen();
        setCurrentTodo({ index: 0, todo: null });
    };

    return (
        <>
            <Button onClick={handleCreateTodo}>Create todo</Button>
            <TodoModal
                index={currentTodo.index}
                isOpen={isOpen}
                onClose={onClose}
                todo={currentTodo.todo}
                setTodos={setTodos}
            />
        </>
    );
};

export default CreateTodoButton;
