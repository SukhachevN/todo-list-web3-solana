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
    Tooltip,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';

import { maxDate, minDate } from '@/shared/date';

import { useTodoModal, UseTodoModalType } from './model';

type TodoModalType = {
    isOpen: boolean;
} & UseTodoModalType;

const TodoModal: FC<TodoModalType> = ({
    isOpen,
    onClose,
    todo,
    setTodos,
    index,
}) => {
    const {
        isFormChanged,
        isUpdating,
        todoState,
        onChange,
        onDelete,
        onSubmit,
    } = useTodoModal({ todo, setTodos, index, onClose });

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
                            {todo && (
                                <Tooltip label="You will loose all rewards received for this todo">
                                    <Button onClick={onDelete}>Delete</Button>
                                </Tooltip>
                            )}
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
