import {
    Button,
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
    Switch,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { web3 } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import BN from 'bn.js';
import { FC, FormEvent } from 'react';
import { useWorkspace } from './WorkspaceProvider';

export type TodoType = {
    user: web3.PublicKey;
    title: string;
    description: string;
    deadline: BN;
    completeDate: BN;
    isCompleted: boolean;
    createDate: BN;
};

export type TodoModalType = {
    todo: TodoType | null;
    isOpen: boolean;
    onClose: () => void;
};

type FormTargetType = EventTarget & {
    title: { value: string };
    description: { value: string };
    deadline: { value: string };
    isCompleted: { checked: boolean };
};

const TodoModal: FC<TodoModalType> = ({ isOpen, onClose, todo }) => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const { program } = useWorkspace();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!publicKey || !program) {
            return;
        }

        const { title, description, deadline, isCompleted } =
            event.target as FormTargetType;

        const deadlineDate = deadline ? new Date(deadline.value).getTime() : 0;

        const newTodo = {
            title: title.value,
            description: description.value ?? '',
            deadline: new BN(deadlineDate),
        };

        const [todoPda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from(newTodo.title), publicKey.toBuffer()],
            program.programId
        );

        const [statsPda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from('stats'), publicKey.toBuffer()],
            program.programId
        );

        const transaction = new web3.Transaction();

        const accounts = { todo: todoPda, stats: statsPda };

        if (todo) {
            const instruction = await program.methods
                .updateTodo({ ...newTodo, isCompleted: isCompleted.checked })
                .accounts(accounts)
                .transaction();

            transaction.add(instruction);
        } else {
            const instruction = await program.methods
                .createTodo(newTodo)
                .accounts(accounts)
                .transaction();

            transaction.add(instruction);
        }

        try {
            const tx = await sendTransaction(transaction, connection);
            // console.log(
            //     `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`
            // );
        } catch {}
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={onSubmit}>
                <ModalHeader>
                    <Text variant="with-gradient">
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
                                defaultValue={todo?.title}
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
                                defaultValue={
                                    todo?.deadline &&
                                    new Date(
                                        todo.deadline.toNumber()
                                    ).toLocaleDateString()
                                }
                            />
                        </FormControl>
                        <FormControl
                            display="flex"
                            alignItems="center"
                            isDisabled={!todo}
                            defaultChecked={todo?.isCompleted}
                        >
                            <FormLabel mb={0}>Completed:</FormLabel>
                            <Switch name="isCompleted" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description:</FormLabel>
                            <Textarea
                                name="description"
                                resize="none"
                                placeholder="description"
                                defaultValue={todo?.description}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter gap="10px">
                    {todo && <Button>Delete</Button>}
                    <Button type="submit" variant="with-gradient-primary">
                        {todo ? 'Save' : 'Create'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TodoModal;
