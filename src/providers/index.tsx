import { FC } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { Authenticator } from '@aws-amplify/ui-react'
import SSRProvider from 'react-bootstrap/SSRProvider'

interface ProvidersProps {
    children: React.ReactNode
}
/**
 * Providers includes all the providers that are used in the application
 **/
const Providers: FC<ProvidersProps> = (props) => {
    const { children } = props
    return (
        <SSRProvider>
            <ThemeProvider>
                <Authenticator.Provider>{children}</Authenticator.Provider>
            </ThemeProvider>
        </SSRProvider>
    )
}

export default Providers

export { ThemeProvider }
