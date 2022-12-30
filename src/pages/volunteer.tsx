import { Heading } from '@aws-amplify/ui-react'

const VolunteerPage = () => {
    const message = 'VOLUNTEER AUTHENTICATED PAGE'
    return <Heading level={5}>{message}</Heading>
}

VolunteerPage.auth = true

export default VolunteerPage
