import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../utils/initialize'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Providers from '../providers'
function App(props: AppProps) {
    const { Component, pageProps } = props
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    )
}

export default withAuthenticator(App)
