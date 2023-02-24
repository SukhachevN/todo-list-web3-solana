/* eslint-disable react/no-unescaped-entities */
import { Heading, Button, Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { MouseEventHandler, useCallback } from 'react';

const Disconnected = () => {
    const modalState = useWalletModal();
    const { wallet, connect } = useWallet();

    const onCLick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (event.defaultPrevented) return;

            if (!wallet) {
                modalState.setVisible(true);
            } else {
                connect();
            }
        },
        [wallet, connect, modalState]
    );

    return (
        <VStack spacing={30} pt={50}>
            <Text variant="with-gradient" fontSize="6xl" fontWeight="extrabold">
                Todo list on solana blockchain.
            </Text>
            <Text fontSize="2xl">
                Create todos, complete todos, get token rewards, mint nfts!
            </Text>
            <Button onClick={onCLick}>Let's go!</Button>
        </VStack>
    );
};

export default Disconnected;
