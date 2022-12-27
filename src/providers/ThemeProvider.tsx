import { createContext, FC } from 'react'
import {
    ThemeProvider as AmplifyThemeProvider,
    ColorMode,
} from '@aws-amplify/ui-react'
import theme from '../styles/theme'
import { useState } from 'react'

const initialValues = {
    colorMode: 'system' as ColorMode,
    setColorMode: (colorMode: ColorMode) => {},
}

export const ThemeContext = createContext(initialValues)

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const { children } = props

    const [colorMode, setColorMode] = useState<ColorMode>('system')

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
