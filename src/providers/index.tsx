import { FC } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { Authenticator } from '@aws-amplify/ui-react'

interface ProvidersProps {
    children: React.ReactNode
}
/**
 * Providers includes all the providers that are used in the application
 **/
const Providers: FC<ProvidersProps> = (props) => {
    const { children } = props
    return (
        <ThemeProvider>
            <Authenticator.Provider>{children}</Authenticator.Provider>
        </ThemeProvider>
    )
}

export default Providers

export { ThemeProvider }
