import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Login = () => {
    const router = useRouter()
    const { route } = useAuthenticator((context) => [context.route])

    useEffect(() => {
        if (route === 'authenticated') {
            const redirect = router.asPath === '/login' ? '/' : router.asPath
            router.replace(redirect)
        }
    }, [route])

    return <Authenticator />
}

export default Login
