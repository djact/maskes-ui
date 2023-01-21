import { Text, useTheme, View, Flex } from '@aws-amplify/ui-react'
import { FC } from 'react'
import NavBar from './NavBar/NavBar'

type LayoutProps = {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = (props) => {
    const { children } = props
    const { tokens } = useTheme()
    return (
        <View backgroundColor={tokens.colors.background.primary}>
            <Flex direction="column" height="100vh">
                <NavBar />
                <View flex={1}>{children}</View>
                <Text padding="large" textAlign="center">
                    © {new Date().getFullYear()} maskes
                </Text>
            </Flex>
        </View>
    )
}

export default Layout
