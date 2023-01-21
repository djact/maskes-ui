import { useAuthenticator, Button } from '@aws-amplify/ui-react'
import Link from 'next/link'

const AuthButton = () => {
    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
    ])

    if (route === 'authenticated')
        return (
            <Button onClick={signOut} variation="link">
                Logout
            </Button>
        )

    return (
        <Link href="/login" passHref>
            <Button variation="link">Login</Button>
        </Link>
    )
}

export default AuthButton
