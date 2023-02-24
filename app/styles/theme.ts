import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontFamily: "'Roboto', sans-serif",
            },
        },
    },
    colors: {
        green: {
            main: '#14F195',
        },
        purple: {
            main: '#9945FF',
            hover: '#A358FF',
        },
    },
    components: {
        Button: {
            variants: {
                default: {
                    bg: 'purple.main',
                    color: 'white',
                    _hover: {
                        bg: 'purple.hover',
                    },
                },
            },
            defaultProps: {
                variant: 'default',
            },
        },
        Text: {
            variants: {
                default: {
                    color: 'white',
                },
                'with-gradient': {
                    bgGradient: 'linear(to-l, purple.main, green.main)',
                    bgClip: 'text',
                },
            },
            defaultProps: {
                variant: 'default',
            },
        },
    },
});
