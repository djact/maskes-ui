import { Heading } from '@aws-amplify/ui-react'
import Link from 'next/link'

const RequestsPage = () => {
    const message = <Link href="/test">TEST LINK</Link>
    return <Heading level={1}>{message}</Heading>
}

RequestsPage.auth = true

export default RequestsPage
