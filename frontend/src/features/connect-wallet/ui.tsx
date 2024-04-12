import { Button } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export const ConnectWalletButton = () => {
    const modalState = useWalletModal();
    const { wallet, connect } = useWallet();

    const onClick = () => (!wallet ? modalState.setVisible(true) : connect());

    return <Button onClick={onClick}>Let's go!</Button>;
};

export default ConnectWalletButton;
