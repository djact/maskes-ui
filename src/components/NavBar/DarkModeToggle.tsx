import {
    ColorMode,
    ToggleButton,
    ToggleButtonGroup,
} from '@aws-amplify/ui-react'
import { useColorMode } from '@hooks/useColorMode'
import { BsMoonFill, BsSun } from 'react-icons/bs'

const DarkModeToggle = () => {
    const { colorMode, setColorMode } = useColorMode()

    const isColorMode = (value: string): value is ColorMode => {
        return value === 'light' || value === 'dark' || value === 'system'
    }

    const handleChangeColorMode = (value: string | string[]) => {
        if (Array.isArray(value)) return null
        if (!isColorMode(value)) return null
        setColorMode(value)
    }

    return (
        <ToggleButtonGroup
            value={colorMode}
            isExclusive
            onChange={handleChangeColorMode}
            justifyContent="center"
            paddingBlock="xs"
        >
            <ToggleButton value="light" paddingInline="xs" paddingBlock="xxs">
                <BsSun />
            </ToggleButton>
            <ToggleButton value="dark" paddingInline="xs" paddingBlock="xxs">
                <BsMoonFill />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default DarkModeToggle
