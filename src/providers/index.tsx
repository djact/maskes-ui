import { FC } from 'react'
import { ThemeProvider } from './ThemeProvider'

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: FC<ProvidersProps> = (props) => {
    const { children } = props
    return <ThemeProvider>{children}</ThemeProvider>
}

export { ThemeProvider }

export default Providers
