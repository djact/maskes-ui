import { ThemeContext } from '../providers/ThemeProvider'
import { useContext } from 'react'
/**
 * useColorMode hook to get the current color mode and a function to set the color mode
 */
export const useColorMode = () => {
    const { colorMode, setColorMode } = useContext(ThemeContext)
    return { colorMode, setColorMode }
}
