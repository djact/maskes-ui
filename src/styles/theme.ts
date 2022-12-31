import { studioTheme } from '@ui-components'
import { WebTheme } from '@aws-amplify/ui/dist/types/theme/types'
// https://ui.docs.amplify.aws/

export default {
    ...studioTheme,
    overrides: [
        {
            colorMode: 'dark',
            tokens: {
                colors: {
                    font: {
                        primary: { value: '{colors.white}' },
                        secondary: { value: '{colors.neutral.10}' },
                        tertiary: { value: '{colors.neutral.20}' },
                    },
                    background: {
                        primary: { value: '{colors.neutral.100}' },
                        secondary: { value: '{colors.neutral.90}' },
                        tertiary: { value: '{colors.neutral.80}' },
                    },
                    border: {
                        primary: { value: '{colors.neutral.20}' },
                        secondary: { value: '{colors.neutral.40}' },
                        tertiary: { value: '{colors.neutral.60}' },
                        pressed: { value: '{colors.brand.secondary.60}' },
                        focus: { value: '{colors.brand.secondary.60}' },
                    },
                },
            },
        },
    ],
} as WebTheme
