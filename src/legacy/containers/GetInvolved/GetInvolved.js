import React from 'react'
import { Row, Container } from 'react-bootstrap'
import { FaHandsHelping, FaUsers, FaCommentDollar } from 'react-icons/fa'
import { GetLayout } from '../../hoc/Layout/GetLayout'
import { ListRow } from '../../components/ListRow/ListRow'
import { Route } from 'react-router-dom'
import SignUp from '../Volunteer/SignUp/SignUp'

const GetInvolved = () => {
    return (
        <React.Fragment>
            <Route exact path="/get-involved" component={GetInvolvedPage} />
            <Route
                exact
                path="/get-involved/admin-team"
                component={AdminTeam}
            />
            <Route exact path="/get-involved/donation" component={Donation} />
            <Route exact path="/get-involved/signup" component={Volunteer} />
        </React.Fragment>
    )
}

export default GetInvolved

const Volunteer = () => {
    return (
        <React.Fragment>
            <Container className="p-3">
                <h3 className="pt-4 pl-4">Volunteer</h3>
                <hr />
                <ListRow
                    title="Volunteer"
                    path="/get-involved/signup"
                    pathName="/get-involved"
                    icon={
                        <FaHandsHelping
                            style={{ fontSize: '5rem', color: 'maroon' }}
                        />
                    }
                >
                    We want to build towards a future of care and safety with
                    you! To get involved as a supporter, please fill out our
                    “Offer Support” form! \n Once you fill out our form, you
                    will be able to support our essential item and grocery
                    delivery program. You can sign up to be a shopper, or donate
                    to particular grocery deliveries. You do not need to use
                    your own money to buy groceries, as our collective will
                    reimburse you
                </ListRow>
            </Container>
            <SignUp />
        </React.Fragment>
    )
}

const GetInvolvedPage = () => (
    <GetLayout pageTitle="Get Involved">
        <ListRow
            title="Volunteer"
            path="/get-involved/signup"
            pathName="/get-involved"
            icon={
                <FaHandsHelping style={{ fontSize: '5rem', color: 'maroon' }} />
            }
        >
            We want to build towards a future of care and safety with you! To
            get involved as a supporter, please fill out our “Offer Support”
            form! \n Once you fill out our form, you will be able to support our
            essential item and grocery delivery program. You can sign up to be a
            shopper, or donate to particular grocery deliveries. You do not need
            to use your own money to buy groceries, as our collective will
            reimburse you
        </ListRow>

        <ListRow
            title="Join The Admin Team"
            path="/get-involved/admin-team"
            pathName="/get-involved"
            icon={<FaUsers style={{ fontSize: '5rem', color: 'teal' }} />}
        >
            We looking for volunteers who would be able to offer skills in
            researching resources, collecting supplies, emotional support,
            social media, volunteer coordination, coordinating requests for
            support
        </ListRow>

        <ListRow
            title="Donation"
            path="/get-involved/donation"
            pathName="/get-involved"
            icon={
                <FaCommentDollar
                    style={{ fontSize: '5rem', color: '#f7b015' }}
                />
            }
        >
            We are completely community funded! Can you make recurring donations
            to us on our Patreon? Please share our Patreon with your family,
            friends and network. \nhttps://www.patreon.com/skcemutualaid
        </ListRow>

        <Row className="p-2">
            Once you answer the membership questions, an admin will approve you
            and your posts. We encourage you to offer items (like books) or
            other forms of support (like math tutoring or dog walking) through
            our facebook group.
        </Row>
    </GetLayout>
)

const AdminTeam = () => {
    return (
        <Container className="p-5">
            <h3>Join The Admin Team</h3>
            <hr />

            <ListRow
                title="Join The Admin Team"
                icon={<FaUsers style={{ fontSize: '5rem', color: 'teal' }} />}
            >
                We looking for volunteers who would be able to offer skills in
                researching resources, collecting supplies, emotional support,
                social media, volunteer coordination, coordinating requests for
                support \n For coordinating requests, we are looking for
                volunteers who can: \n 1. Commit at least 6 hours per week for
                the first few weeks and then 2 hours or more after for at least
                three months \n 2. Must have an understanding of transformative
                justice, abolition, emotional first aid, solidarity support, or
                take these necessary training that we share with you in the
                first couple of weeks of volunteering, \n 3. Attend weekly
                meetings and be committed to continued learning and struggle \n
                Please fill out our &quot;Offer Support Form&quot;, and provide
                your additional support skills in the corresponding sections.
            </ListRow>
        </Container>
    )
}

const Donation = () => {
    return (
        <Container className="p-5">
            <h3>Join The Admin Team</h3>
            <hr />

            <ListRow
                title="Donation"
                path=""
                icon={
                    <FaCommentDollar
                        style={{ fontSize: '5rem', color: '#f7b015' }}
                    />
                }
            >
                We are completely community funded! Can you make recurring
                donations to us on our Patreon? Please share our Patreon with
                your family, friends and network.
                \nhttps://www.patreon.com/skcemutualaid \n Donation via this
                website is being developed
            </ListRow>
        </Container>
    )
}
