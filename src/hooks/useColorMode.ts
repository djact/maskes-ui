import { ThemeContext } from '../providers/ThemeProvider'
import { useContext } from 'react'

export const useColorMode = () => {
    const { colorMode, setColorMode } = useContext(ThemeContext)
    return { colorMode, setColorMode }
}
