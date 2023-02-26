import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';

type TodoInfoModalType = {
    isOpen: boolean;
    title: string;
    description: string;
    onClose: () => void;
};

const TodoInfoModal: FC<TodoInfoModalType> = ({
    isOpen,
    title,
    description,
    onClose,
}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height="50%" p={5}>
            <ModalHeader>
                <Text variant="with-gradient" noOfLines={2} title={title}>
                    {title}
                </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow="auto">
                <Text>{description}</Text>
            </ModalBody>
        </ModalContent>
    </Modal>
);

export default TodoInfoModal;
