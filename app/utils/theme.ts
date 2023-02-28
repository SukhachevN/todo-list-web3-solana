import { extendTheme, Theme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
            _dark: {
                body: {
                    background: 'black.main',
                },
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
        },
    },
    components: {
        Button: {
            variants: {
                default: {
                    bgGradient: ['linear(to-l,  #6c29bf, #8d5ec6)'],
                    _focusVisible: {
                        boxShadow: 'none',
                    },
                    _hover: {
                        transform: 'scale(1.02)',
                    },
                    '&:hover[disabled]': {
                        bgGradient: ['linear(to-l,  #6c29bf, #8d5ec6)'],
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
                    _dark: {
                        color: 'silverSand',
                    },
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
        Input: {
            variants: {
                outline: ({
                    theme: { colors },
                    ...otherProps
                }: StyleOptions) => ({
                    field: {
                        _focusVisible: {
                            borderColor: 'transparent',
                            boxShadow: mode(
                                `0 0 0 1px ${colors.purple.main}`,
                                `0 0 0 1px ${colors.green.main}`
                            )(otherProps),
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
                outline: ({
                    theme: { colors },
                    ...otherProps
                }: StyleOptions) => ({
                    _focusVisible: {
                        borderColor: 'transparent',
                        boxShadow: mode(
                            `0 0 0 1px ${colors.purple.main}`,
                            `0 0 0 1px ${colors.green.main}`
                        )(otherProps),
                    },
                }),
            },
        },
        Card: {
            variants: {
                default: (props: StyleOptions) => ({
                    container: {
                        bg: mode('white', 'arsenic')(props),
                        _hover: {
                            transform: 'scale(1.01)',
                            borderBottom: '1px solid',
                            borderColor: mode(
                                'purple.main',
                                'green.main'
                            )(props),
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
                default: (props: StyleOptions) => ({
                    dialog: {
                        bg: mode('white', 'arsenic')(props),
                    },
                    closeButton: {
                        _focusVisible: {
                            boxShadow: 'none',
                        },
                    },
                }),
            },
            defaultProps: {
                variant: 'default',
            },
        },
    },
});
