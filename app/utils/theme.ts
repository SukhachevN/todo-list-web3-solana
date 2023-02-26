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
                    bg: 'purple.main',
                    _hover: {
                        bg: 'purple.hover',
                    },
                },
                'with-gradient': {
                    bgGradient: 'linear(to-l, purple.main, green.main)',
                },
            },
            defaultProps: {
                variant: 'default',
                color: 'white',
                _hover: {
                    transform: 'scale(1.02)',
                },
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
                default: (props: StyleOptions) => ({
                    track: {
                        _checked: {
                            bg: mode('purple.main', 'green.main')(props),
                        },
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
                            transform: 'scale(1.02)',
                            border: '1px solid',
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
                }),
            },
            defaultProps: {
                variant: 'default',
            },
        },
    },
});
