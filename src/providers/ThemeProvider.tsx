import {
    ColorMode,
    ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react'
import theme from '@styles/theme'
import { createContext, FC, useState } from 'react'

const initialValues = {
    colorMode: 'system' as ColorMode,
    setColorMode: (colorMode: ColorMode) => {},
}

export const ThemeContext = createContext(initialValues)

interface ThemeProviderProps {
    children: React.ReactNode
}

/**
 * ThemeProvider is a wrapper for the AmplifyThemeProvider
 * that allows us to set the colorMode of the theme
 * and pass it down to the AmplifyThemeProvider
 **/
export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const { children } = props
    // set default colorMode
    const [colorMode, setColorMode] = useState<ColorMode>('light')

    const setTheme = (colorMode: ColorMode) => {
        setColorMode(colorMode)
    }

    const values = {
        colorMode: colorMode,
        setColorMode: setTheme,
    }

    return (
        <ThemeContext.Provider value={values}>
            <AmplifyThemeProvider theme={theme} colorMode={colorMode}>
                {children}
            </AmplifyThemeProvider>
        </ThemeContext.Provider>
    )
}
