import { useAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { useQuery } from 'react-query'

export const useAuthGroup = (usergroup: string | undefined) => {
    const { route } = useAuthenticator((context) => [context.route])
    const { data } = useQuery(
        'session',
        async () => await Auth.currentSession()
    )

    if (
        route !== 'authenticated' ||
        (usergroup &&
            !data
                ?.getAccessToken()
                .payload['cognito:groups']?.includes(usergroup))
    )
        return false

    return true
}
