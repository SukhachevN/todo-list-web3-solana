import { Box, Center, Spinner, useToast, Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

import {
    getAiImageGeneratorCounter,
    getUserTodoTokenATA,
} from '@/utils/accounts';

import AiImage from './AiImage';
import TriesCount from './TriesCount';
import { useWorkspace } from './WorkspaceProvider';
import { TODO_DECIMAL } from '@/utils/constants';

const AiImageGenerator = () => {
    const { publicKey } = useWallet();

    const { program, connection } = useWorkspace();

    const [isLoading, setIsLoading] = useState(false);
    const [todoTokenBalance, setTodoTokenBalance] = useState<number | null>(
        null
    );
    const [tryCount, setTryCount] = useState<number | null>(null);

    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            if (publicKey && program && connection) {
                setIsLoading(true);

                const userAta = await getUserTodoTokenATA({
                    publicKey,
                    connection,
                    toast,
                });

                const counterAccount = await getAiImageGeneratorCounter({
                    program,
                    publicKey,
                    toast,
                });

                setTodoTokenBalance(
                    userAta
                        ? Number(userAta.amount) / Math.pow(10, TODO_DECIMAL)
                        : null
                );
                setTryCount(counterAccount?.tryCount ?? null);

                setIsLoading(false);
            }
        };

        fetchData();
    }, [publicKey, program]);

    if (isLoading) {
        return (
            <Box h="100%">
                <Center h="100%">
                    <Spinner w="100px" h="100px" />
                </Center>
            </Box>
        );
    }

    return (
        <Box w="100%">
            {typeof todoTokenBalance !== 'number' ? (
                <Text
                    mt="50px"
                    textAlign="center"
                    fontSize="2xl"
                    variant="gradient-main"
                >
                    Create at least 1 todo to unlock this section
                </Text>
            ) : (
                <VStack pt="15px" w="100%" display="flex" spacing="15px">
                    <Text textAlign="center" p="0 10px">
                        Generate AI image by writing prompt. You can refer me as
                        "Nikita man" in your prompt to generate something with
                        me. Leave input empty to generate something absolutely
                        random! Try something like "Illustration of Lenin in
                        cool hat, 4k, by Leonardo da Vinci, portrait" use your
                        fantasy!. Image generation can take up to 5 minutes,
                        please dont refresh page before generating end.
                    </Text>
                    <TriesCount
                        tryCount={tryCount}
                        todoTokenBalance={todoTokenBalance}
                        setTryCount={setTryCount}
                        setTodoTokenBalance={setTodoTokenBalance}
                    />
                    <AiImage
                        tryCount={tryCount}
                        todoTokenBalance={todoTokenBalance}
                        setTryCount={setTryCount}
                        setTodoTokenBalance={setTodoTokenBalance}
                    />
                </VStack>
            )}
        </Box>
    );
};

export default AiImageGenerator;
