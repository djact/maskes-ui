import { Heading } from '@aws-amplify/ui-react'

const RequestsPage = () => {
    const message = 'REQUESTS AUTHENTICATED PAGE'
    return <Heading level={5}>{message}</Heading>
}

RequestsPage.auth = true

export default RequestsPage
