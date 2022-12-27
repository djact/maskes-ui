import { ThemeProvider } from './ThemeProvider'
import { FC } from 'react'
// Client-side cache, shared for the whole session of the user in the browser.

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: FC<ProvidersProps> = (props) => {
    const { children } = props
    return <ThemeProvider>{children}</ThemeProvider>
}

export default Providers
