import { extendTheme } from '@chakra-ui/react';

type StyleOptions = {
    theme: typeof theme;
    colorMode: 'light' | 'dark';
    colorScheme: string;
};

export const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
    },
    fonts: {
        body: 'DSemi, monospace',
        heading: 'DSemi, monospace',
    },
    styles: {
        global: {
            '&::selection': {
                background: 'green.selection',
                color: 'black.selection',
            },
            body: {
                background: 'black.main',
            },
        },
    },
    colors: {
        black: {
            main: '#1f1f1f',
            selection: '#232323',
        },
        silverSand: '#c4c4c4',
        arsenic: '#2d2d30',
        green: {
            main: '#14f195',
            hover: '#40e19e',
            selection: '#00ffbd',
        },
        purple: {
            main: '#9945ff',
            hover: '#a358ff',
            start: '#6c29bf',
            end: '#8d5ec6',
        },
    },
    components: {
        Button: {
            variants: {
                default: {
                    bgGradient: 'linear(to-l, purple.start, purple.end)',
                    _focusVisible: {
                        boxShadow: 'none',
                    },
                    _hover: {
                        transform: 'scale(1.02)',
                    },
                    '&:hover[disabled]': {
                        bgGradient: 'linear(to-l, purple.start, purple.end)',
                        transform: 'none',
                    },
                },
            },
            defaultProps: {
                variant: 'default',
                color: 'white',
            },
        },
        Text: {
            variants: {
                default: {
                    color: 'silverSand',
                },
                'gradient-main': {
                    bgGradient: 'linear(to-l, purple.main, green.main)',
                    bgClip: 'text',
                },
                'gradient-1': {
                    bgGradient:
                        'linear-gradient(101.11deg,#f087ff 14.47%,#6e1fce 39.43%)',
                    bgClip: 'text',
                },
                'gradient-2': {
                    bgGradient:
                        'linear-gradient(100.93deg,#1fcff1 15.61%,#234cb6 41.38%)',
                    bgClip: 'text',
                },
                'gradient-3': {
                    bgGradient:
                        'linear-gradient(97.65deg,#19fb9b 11.36%,#199890 54.3%)',
                    bgClip: 'text',
                },
                link: {
                    color: 'silverSand',
                    _hover: {
                        bgGradient: 'linear(to-l, purple.main, green.main)',
                        bgClip: 'text',
                    },
                },
            },
            defaultProps: {
                variant: 'default',
            },
        },
        Input: {
            variants: {
                outline: ({ theme: { colors } }: StyleOptions) => ({
                    field: {
                        _focusVisible: {
                            borderColor: 'transparent',
                            boxShadow: `0 0 0 1px ${colors.green.main}`,
                        },
                    },
                }),
            },
        },
        Switch: {
            variants: {
                default: {
                    track: {
                        _checked: {
                            bg: 'purple.main',
                        },
                        _focusVisible: {
                            boxShadow: 'none',
                        },
                    },
                },
            },
            defaultProps: {
                variant: 'default',
            },
        },
        Textarea: {
            variants: {
                outline: ({ theme: { colors } }: StyleOptions) => ({
                    _focusVisible: {
                        borderColor: 'transparent',
                        boxShadow: `0 0 0 1px ${colors.green.main}`,
                    },
                }),
            },
        },
        Card: {
            variants: {
                default: ({ theme: { colors } }: StyleOptions) => ({
                    container: {
                        bg: 'arsenic',
                        _hover: {
                            transform: 'scale(1.01)',
                            borderBottom: `1px solid ${colors.green.main}`,
                        },
                    },
                }),
            },
            defaultProps: {
                variant: 'default',
            },
        },
        Modal: {
            variants: {
                default: {
                    dialog: {
                        bg: 'arsenic',
                    },
                    closeButton: {
                        _focusVisible: {
                            boxShadow: 'none',
                        },
                    },
                },
            },
            defaultProps: {
                variant: 'default',
            },
        },
        Spinner: {
            variants: {
                default: {
                    size: 'lg',
                    color: 'purple.main',
                },
            },
            defaultProps: {
                variant: 'default',
            },
        },
        NumberInput: {
            variants: {
                outline: ({ theme: { colors } }: StyleOptions) => ({
                    field: {
                        _focusVisible: {
                            borderColor: 'transparent',
                            boxShadow: `0 0 0 1px ${colors.green.main}`,
                        },
                    },
                }),
            },
        },
    },
});
