import {
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
    Text,
} from '@chakra-ui/react';
import {
    ChangeEvent,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

import { SavedAiImageType } from '@/shared/types';
import MintAiImageNftButton from '@/features/mint-ai-image-nft';
import SaveAiImageButton from '@/features/save-ai-image';

type SaveAiImageModalType = {
    isOpen: boolean;
    isLoading: boolean;
    img: string;
    description: string;
    savedAiImage: SavedAiImageType | null;
    todoTokenBalance: number;
    onClose: () => void;
    setIsLoading: (value: boolean) => void;
    setSavedAiImage: (savedImage: SavedAiImageType | null) => void;
    setTodoTokenBalance: Dispatch<SetStateAction<number | null>>;
};

const SaveAiImageModal: FC<SaveAiImageModalType> = ({
    isOpen,
    isLoading,
    img,
    description,
    savedAiImage,
    todoTokenBalance,
    onClose,
    setIsLoading,
    setSavedAiImage,
    setTodoTokenBalance,
}) => {
    const [name, setName] = useState(savedAiImage?.name ?? '');

    const isFormChanged = name !== savedAiImage?.name;

    const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setName(value);
    };

    useEffect(() => {
        setName(savedAiImage?.name ?? '');
    }, [savedAiImage]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent h="350px">
                <ModalHeader>
                    <Text variant="gradient-main">AI Image</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        You can create NFT of your AI Image for&nbsp;
                        <Text variant="gradient-main" as="span">
                            500 $TODO
                        </Text>
                        , or just save it for&nbsp;
                        <Text variant="gradient-main" as="span">
                            free
                        </Text>
                        &nbsp;to mint NFT later.
                    </Text>
                    <FormControl pt="20px">
                        <FormLabel>Name:</FormLabel>
                        <Input value={name} onChange={onChange} />
                        <FormHelperText>Give name to your NFT</FormHelperText>
                    </FormControl>
                </ModalBody>
                <ModalFooter gap="10px">
                    <SaveAiImageButton
                        isLoading={isLoading}
                        isFormChanged={isFormChanged}
                        name={name}
                        img={img}
                        description={description}
                        onClose={onClose}
                        setIsLoading={setIsLoading}
                        setSavedAiImage={setSavedAiImage}
                    />
                    <MintAiImageNftButton
                        isLoading={isLoading}
                        todoTokenBalance={todoTokenBalance}
                        img={img}
                        savedAiImage={savedAiImage}
                        description={description}
                        name={name}
                        isFormChanged={isFormChanged}
                        onClose={onClose}
                        setIsLoading={setIsLoading}
                        setSavedAiImage={setSavedAiImage}
                        setTodoTokenBalance={setTodoTokenBalance}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SaveAiImageModal;
