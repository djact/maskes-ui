import { FC } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { Authenticator } from '@aws-amplify/ui-react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface ProvidersProps {
    children: React.ReactNode
}
/**
 * Providers includes all the providers that are used in the application
 **/
const queryClient = new QueryClient()

const Providers: FC<ProvidersProps> = (props) => {
    const { children } = props
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Authenticator.Provider>{children}</Authenticator.Provider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Providers

export { ThemeProvider }
