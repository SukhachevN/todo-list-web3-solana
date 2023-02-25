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
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { web3 } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import BN from 'bn.js';
import { FC, FormEvent } from 'react';
import { useWorkspace } from './WorkspaceProvider';

export type TodoType = {
    user: BN;
    title: string;
    description: string;
    deadline: BN;
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

        const { title, description, deadline } = event.target as FormTargetType;

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

        const [counterPda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from('counter'), publicKey.toBuffer()],
            program.programId
        );

        const transaction = new web3.Transaction();

        if (todo) {
            // TODO
        } else {
            const instruction = await program.methods
                .createTodo(newTodo)
                .accounts({ todo: todoPda, counter: counterPda })
                .transaction();

            transaction.add(instruction);
        }

        try {
            const tx = await sendTransaction(transaction, connection);
            console.log(
                `Transaction submitted: https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
        } catch {}
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={onSubmit}>
                <ModalHeader>{todo ? 'Edit todo' : 'Create todo'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <FormControl isRequired>
                            <FormLabel>Title:</FormLabel>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Todo title"
                            />
                            <FormHelperText>
                                Give to your todo unique title.
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Deadline:</FormLabel>
                            <Input type="date" name="deadline" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description:</FormLabel>
                            <Textarea
                                name="description"
                                resize="none"
                                placeholder="description"
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit">{todo ? 'Save' : 'Create'}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TodoModal;
