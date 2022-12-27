import { withAuthenticator } from '@aws-amplify/ui-react'
import Providers from '@providers'
import '@styles/globals.css'
import '@utils/initialize'
import type { AppProps } from 'next/app'

const App = (props: AppProps) => {
    const { Component, pageProps } = props
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    )
}

export default withAuthenticator(App)
