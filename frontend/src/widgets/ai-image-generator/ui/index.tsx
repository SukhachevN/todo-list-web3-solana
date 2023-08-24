import { Box, Center, Spinner, Text, VStack } from '@chakra-ui/react';

import TriesCount from './tries-count';
import AiImage from './ai-image';
import { useAiImageGeneratorInfo } from '../model';

const AiImageGenerator = () => {
    const {
        tryCount,
        isLoading,
        todoTokenBalance,
        setTryCount,
        setTodoTokenBalance,
    } = useAiImageGeneratorInfo();

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
