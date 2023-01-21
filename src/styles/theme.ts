import { studioTheme } from '@ui-components'
import { createTheme, defaultDarkModeOverride } from '@aws-amplify/ui-react'
// https://ui.docs.amplify.aws/

export default createTheme(
    {
        // Extend the theme to update the button color
        name: 'maskes-custom-theme',
        overrides: [
            // {
            // colorMode: 'dark',
            // tokens: {
            //     colors: {
            //         font: {
            //             primary: { value: '{colors.white}' },
            //             secondary: { value: '{colors.neutral.10}' },
            //             tertiary: { value: '{colors.neutral.20}' },
            //         },
            //         background: {
            //             primary: { value: '{colors.neutral.100}' },
            //             secondary: { value: '{colors.neutral.90}' },
            //             tertiary: { value: '{colors.neutral.80}' },
            //         },
            //         border: {
            //             primary: { value: '{colors.neutral.20}' },
            //             secondary: { value: '{colors.neutral.40}' },
            //             tertiary: { value: '{colors.neutral.60}' },
            //             pressed: { value: '{colors.brand.secondary.60}' },
            //             focus: { value: '{colors.brand.secondary.60}' },
            //         },
            //     },
            // },
            // },
            defaultDarkModeOverride,
        ],
    },
    studioTheme
)
