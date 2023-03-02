import { Button, Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

const Disconnected = () => {
    const modalState = useWalletModal();
    const { wallet, connect } = useWallet();

    const onClick = () => (!wallet ? modalState.setVisible(true) : connect());

    return (
        <VStack spacing={30} pt={50}>
            <Text variant="with-gradient" fontSize="6xl" fontWeight="extrabold">
                Todo list on solana blockchain.
            </Text>
            <Text fontSize="2xl">
                Create todos, complete todos, get token rewards, mint nfts!
            </Text>
            <Button onClick={onClick}>Let's go!</Button>
        </VStack>
    );
};

export default Disconnected;
