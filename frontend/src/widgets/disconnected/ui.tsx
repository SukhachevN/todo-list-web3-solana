import { Text, VStack } from '@chakra-ui/react';

import ConnectWalletButton from '@/features/connect-wallet/ui';

const Disconnected = () => (
    <VStack spacing={30} pt={50}>
        <Text variant="gradient-main" fontSize="6xl" fontWeight="extrabold">
            Todo list on solana blockchain.
        </Text>
        <Text fontSize="2xl">
            Create todos, complete todos, get token rewards, mint nfts!
        </Text>
        <ConnectWalletButton />
    </VStack>
);

export default Disconnected;
