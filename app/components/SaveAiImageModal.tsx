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
    Text,
    useToast,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    ChangeEvent,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

import { handleSaveAiImage } from '@/utils/handlers/handleSaveAiImage';
import { handleMintAiImageNft } from '@/utils/handlers/handleMintAiImageNft';
import { useMetaplex } from '@/utils/hooks/useMetaplex';
import { SavedAiImageType } from '@/utils/types';
import { GENERATE_AI_IMAGE_NFT_PRICE } from '@/utils/constants';
import { notEnoughTodoTokensErrorAlert } from '@/utils/alerts';

import { useWorkspace } from './WorkspaceProvider';

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
    const { publicKey } = useWallet();
    const { program, connection } = useWorkspace();
    const { metaplex } = useMetaplex();

    const [name, setName] = useState(savedAiImage?.name ?? '');

    const toast = useToast();

    const isFormChanged = name !== savedAiImage?.name;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const saveImage = () =>
        handleSaveAiImage({
            publicKey,
            program,
            name,
            toast,
            img,
            description,
            metaplex,
            setIsLoading,
            setSavedAiImage,
            onClose,
        });

    const mintNft = async () => {
        if (todoTokenBalance < GENERATE_AI_IMAGE_NFT_PRICE) {
            toast(notEnoughTodoTokensErrorAlert);
            return;
        }
        await handleMintAiImageNft({
            publicKey,
            program,
            name,
            toast,
            img,
            description,
            metaplex,
            connection,
            isFormChanged,
            savedAiImage,
            setIsLoading,
            setSavedAiImage,
            onClose,
        });
        setTodoTokenBalance(
            (prev) => Number(prev) - GENERATE_AI_IMAGE_NFT_PRICE
        );
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
                    <Button
                        onClick={saveImage}
                        isDisabled={!isFormChanged}
                        isLoading={isLoading}
                    >
                        Save
                    </Button>
                    <Button onClick={mintNft} isLoading={isLoading}>
                        Mint NFT
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SaveAiImageModal;
