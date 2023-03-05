import {
    Button,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Switch,
    Text,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import { getDateFromTodo, maxDate, minDate } from '@/utils/dateUtils';
import { handleCreateUpdateTodo } from '@/utils/handlers/handleCreateUpdateTodo';
import { handleDeleteTodo } from '@/utils/handlers/handleDeleteTodo';
import { TodoModalType, TodoStateType } from '@/utils/types';

import { useWorkspace } from './WorkspaceProvider';

const TodoModal: FC<TodoModalType> = ({
    isOpen,
    onClose,
    todo,
    setTodos,
    index,
}) => {
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

        handleCreateUpdateTodo({
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
    };

    const onDelete = async () => {
        handleDeleteTodo({
            index,
            toast,
            connection,
            todo,
            program,
            publicKey,
            setIsUpdating,
            sendTransaction,
            onClose,
            setTodos,
        });
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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={onSubmit} h="484px">
                {isUpdating ? (
                    <Center h="100%">
                        <Spinner />
                    </Center>
                ) : (
                    <>
                        <ModalHeader>
                            <Text variant="gradient-main">
                                {todo ? 'Edit todo' : 'Create todo'}
                            </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing="10px">
                                <FormControl isRequired>
                                    <FormLabel>Title:</FormLabel>
                                    <Input
                                        type="text"
                                        name="title"
                                        placeholder="Todo title"
                                        value={todoState.title}
                                        onChange={onChange}
                                        disabled={!!todo}
                                    />
                                    <FormHelperText>
                                        Give to your todo unique title.
                                    </FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Deadline:</FormLabel>
                                    <Input
                                        type="date"
                                        name="deadline"
                                        value={todoState.deadline}
                                        max={maxDate}
                                        min={minDate}
                                        onChange={onChange}
                                    />
                                </FormControl>
                                <FormControl
                                    display="flex"
                                    alignItems="center"
                                    isDisabled={!todo}
                                >
                                    <FormLabel mb={0}>Completed:</FormLabel>
                                    <Switch
                                        name="isCompleted"
                                        isChecked={todoState.isCompleted}
                                        onChange={onChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description:</FormLabel>
                                    <Textarea
                                        name="description"
                                        resize="none"
                                        placeholder="description"
                                        value={todoState.description}
                                        onChange={onChange}
                                    />
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter gap="10px">
                            {todo && <Button onClick={onDelete}>Delete</Button>}
                            <Button type="submit" isDisabled={!isFormChanged}>
                                {todo ? 'Save' : 'Create'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default TodoModal;
