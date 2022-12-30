import { Text } from '@aws-amplify/ui-react'
import { FC } from 'react'
import NavBar from './NavBar'

type LayoutProps = {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = (props) => {
    const { children } = props

    return (
        <div>
            <NavBar />
            <div
                style={{
                    minHeight: '90vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </div>
            <div style={{ textAlign: 'center' }}>
                <Text>© {new Date().getFullYear()} maskes</Text>
            </div>
        </div>
    )
}

export default Layout
