import {
    Flex,
    Heading,
    Menu,
    useBreakpointValue,
    useTheme,
    View,
} from '@aws-amplify/ui-react'
import AuthButton from './AuthButton'
import DarkModeToggle from './DarkModeToggle'
import NavItems from './NavItems'

const NavBar = () => {
    const mobile = useBreakpointValue({
        base: true,
        small: true,
        medium: false,
        large: false,
    })
    return (
        <View
            paddingBlock="xs"
            boxShadow="rgba(0, 0, 0, 0.25) 0px 4px 12px 0px"
        >
            <Flex paddingInline="medium">
                <Flex alignItems="center" justifyContent="center">
                    <Heading level={4}>MASKES</Heading>
                </Flex>
                <Flex flex={1} justifyContent="flex-end">
                    {mobile ? <NavMenuMobile /> : <NavMenuDesktop />}
                </Flex>
            </Flex>
        </View>
    )
}

const NavMenuDesktop = () => {
    return (
        <Flex flex="1" paddingInline="small" alignItems="center">
            <NavItems flex={1} gap="large" />
            <DarkModeToggle />
            <AuthButton />
        </Flex>
    )
}

const NavMenuMobile = () => {
    const { tokens } = useTheme()
    return (
        <Menu
            menuAlign="end"
            paddingInline="small"
            padding="small"
            textAlign="center"
            backgroundColor={tokens.colors.background.secondary}
            boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 12px 0px"
        >
            <NavItems
                direction="column"
                justifyContent="space-around"
                paddingBlock="xs"
            />
            <DarkModeToggle />
            <AuthButton />
        </Menu>
    )
}

export default NavBar
