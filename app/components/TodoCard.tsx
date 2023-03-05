import { EditIcon } from '@chakra-ui/icons';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    SkeletonText,
    Spinner,
    Switch,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ChangeEvent, FC, memo, useState } from 'react';

import { getDateFromTodo } from '@/utils/dateUtils';
import { handleCreateUpdateTodo } from '@/utils/handlers/handleCreateUpdateTodo';
import { TodoCardType } from '@/utils/types';

import TodoInfoModal from './TodoInfoModal';
import TodoModal from './TodoModal';
import { useWorkspace } from './WorkspaceProvider';

const TodoCard: FC<TodoCardType> = ({ todo, index, setTodos }) => {
    const {
        isOpen: isInfoModalOpen,
        onOpen: onOpenInfoModal,
        onClose: onCloseInfoModal,
    } = useDisclosure();

    const {
        isOpen: isTodoModalOpen,
        onOpen: onOpenTodoModal,
        onClose: onCloseTodoModal,
    } = useDisclosure();

    const { publicKey, sendTransaction } = useWallet();

    const { program, connection } = useWorkspace();

    const toast = useToast();

    const [isUpdating, setIsUpdating] = useState(false);

    const isShowComplete = todo?.completeDate.toNumber() && todo?.isCompleted;

    const isWithDeadline = todo && !!todo.deadline.toNumber();

    const deadlineText = isWithDeadline ? 'Deadline:' : 'No deadline';

    const dateText = isShowComplete ? 'Complete date:' : deadlineText;

    const date =
        isShowComplete || isWithDeadline
            ? new Date(
                  todo[isShowComplete ? 'completeDate' : 'deadline'].toNumber()
              ).toLocaleDateString()
            : '';

    const onChange = ({
        target: { checked },
    }: ChangeEvent<HTMLInputElement>) => {
        if (!todo) return;

        const todoState = {
            ...todo,
            deadline: getDateFromTodo(todo),
            isCompleted: checked,
        };

        handleCreateUpdateTodo({
            index,
            toast,
            connection,
            todo,
            todoState,
            program,
            publicKey,
            sendTransaction,
            setIsUpdating,
            setTodos,
        });
    };

    return (
        <Card h="320px">
            {isUpdating ? (
                <Center h="100%">
                    <Spinner />
                </Center>
            ) : (
                <>
                    <CardHeader>
                        {todo ? (
                            <Heading
                                as="h3"
                                fontSize="xl"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Text
                                    variant="gradient-main"
                                    noOfLines={2}
                                    title={todo.title}
                                >
                                    {todo.title}
                                </Text>
                                <IconButton
                                    aria-label="edit todo"
                                    icon={<EditIcon />}
                                    size="sm"
                                    onClick={onOpenTodoModal}
                                />
                            </Heading>
                        ) : (
                            <SkeletonText noOfLines={1} />
                        )}
                    </CardHeader>
                    <CardBody>
                        {todo ? (
                            <Text
                                noOfLines={5}
                                title={todo.description}
                                onClick={onOpenInfoModal}
                                cursor="pointer"
                            >
                                {todo.description}
                            </Text>
                        ) : (
                            <SkeletonText noOfLines={5} />
                        )}
                    </CardBody>
                    <CardFooter
                        display="flex"
                        gap={10}
                        justifyContent="space-between"
                    >
                        {todo ? (
                            <Text as="div" display="flex">
                                {dateText}
                                &nbsp;
                                {date}
                            </Text>
                        ) : (
                            <SkeletonText noOfLines={1} w="50%" />
                        )}
                        {todo && (
                            <FormControl
                                display="flex"
                                alignItems="center"
                                isDisabled={!todo}
                                w="auto"
                            >
                                <FormLabel mb={0}>
                                    <Text>Completed:</Text>
                                </FormLabel>
                                <Switch
                                    name="isCompleted"
                                    isChecked={todo.isCompleted}
                                    onChange={onChange}
                                />
                            </FormControl>
                        )}
                    </CardFooter>
                </>
            )}

            {todo && (
                <>
                    <TodoInfoModal
                        isOpen={isInfoModalOpen}
                        title={todo.title}
                        description={todo.description}
                        createDate={todo.createDate}
                        onClose={onCloseInfoModal}
                    />
                    <TodoModal
                        index={index}
                        todo={todo}
                        isOpen={isTodoModalOpen}
                        onClose={onCloseTodoModal}
                        setTodos={setTodos}
                    />
                </>
            )}
        </Card>
    );
};

export default memo(TodoCard);
