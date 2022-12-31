import { Heading, useAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

type RequireAuthProps = {
    children: any
}

const RequireAuth: FC<RequireAuthProps> = (props) => {
    const { children } = props
    const { route } = useAuthenticator((context) => [context.route])
    const router = useRouter()

    useEffect(() => {
        if (route !== 'authenticated') {
            router.replace('/login', router.pathname)
        }
    }, [route, router])

    const loading = <Heading level={1}>Loading...</Heading>

    return route === 'authenticated' ? children : loading
}

export default RequireAuth
