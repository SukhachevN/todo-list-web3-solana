import { EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    SkeletonText,
    Switch,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import TodoInfoModal from './TodoDescriptionModal';
import TodoModal, { TodoType } from './TodoModal';

type TodoCardType = {
    todo: TodoType | null;
};

const TodoCard: FC<TodoCardType> = ({ todo }) => {
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

    return (
        <Card h="300px" maxW="500px">
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
                            variant="with-gradient"
                            noOfLines={2}
                            title={todo.title}
                        >
                            {todo.title}
                        </Text>
                        <IconButton
                            aria-label="edit todo"
                            icon={<EditIcon />}
                            size="sm"
                            variant="with-gradient"
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
            <CardFooter display="flex" gap={10} justifyContent="space-between">
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
                        <Switch name="isCompleted" />
                    </FormControl>
                )}
            </CardFooter>
            {todo && (
                <>
                    <TodoInfoModal
                        isOpen={isInfoModalOpen}
                        title={todo.title}
                        description={todo.description}
                        onClose={onCloseInfoModal}
                    />
                    <TodoModal
                        todo={todo}
                        isOpen={isTodoModalOpen}
                        onClose={onCloseTodoModal}
                    />
                </>
            )}
        </Card>
    );
};

export default TodoCard;
