import RequireAuth from '@components/RequireAuth'
import Providers from '@providers'
import '@styles/globals.css'
import '@utils/initialize'
import type { AppProps } from 'next/app'

/**
 * Next.js _app.tsx is used to initialize pages.
 * The pages are wrapped with the Providers
 * Protected page components are wrapped with the RequireAuth
 * Set auth attribute to true on the page component to protect it
 * @param props extended AppProps | see @types/next.d.ts
 */
const App = (props: AppProps) => {
    const { Component, pageProps } = props

    return (
        <Providers>
            {(Component.auth && (
                <RequireAuth>
                    <Component {...pageProps} />
                </RequireAuth>
            )) || <Component {...pageProps} />}
        </Providers>
    )
}

export default App
