import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import { MdShare } from 'react-icons/md'
import { Route } from 'react-router-dom'
import { GetLayout } from '../../hoc/Layout/GetLayout'
import { ListRow } from '../../components/ListRow/ListRow'
import { connect } from 'react-redux'
import { openAuthModal } from '../../components/Auth/store/actions/actions'

const GetHelp = () => {
    return (
        <React.Fragment>
            <Route exact path="/get-help" component={GetHelpPage} />
            <Route exact path="/get-help/get-support" component={GetSupport} />
        </React.Fragment>
    )
}

export default GetHelp

const GetHelpPage = () => (
    <GetLayout pageTitle="Get Help">
        <ListRow
            title="Request Support"
            path="/get-help/get-support"
            pathName="/get-help"
            icon={<MdShare style={{ fontSize: '5rem', color: 'darkgreen' }} />}
        >
            We want to build towards a future of care and safety with you! \n To
            get support with essential items and groceries please fill out our
            “Request Support Form” \n Once you fill out and submit our form, you
            will be able to get support from our essential item and grocery
            delivery program.
        </ListRow>

        <Row className="p-2">
            Once you answer the membership questions, an admin will approve you
            and your posts. We encourage you to offer items (like books) or
            other forms of support (like math tutoring or dog walking) through
            our facebook group.
        </Row>
    </GetLayout>
)

const GetSupport = connect(
    (state) => ({ isAuthenticated: state.auth.access !== null }),
    { openAuthModal }
)(({ openAuthModal, isAuthenticated }) => {
    return (
        <Container className="p-5">
            <h3>Get Help</h3>
            <hr />

            <ListRow
                title="Request Support"
                icon={
                    <MdShare style={{ fontSize: '5rem', color: 'darkgreen' }} />
                }
            >
                We want to build towards a future of care and safety with you!
                To get support with essential items and groceries please will
                out our “Request Support Form” \n Once you fill out our form,
                you will be able to get support from our essential item and
                grocery delivery program. \n Through the form, you can request a
                delivery of groceries and other “essential items” like
                batteries, toiletries like tampons, or cleaning supplies. You do
                not need to pay for these items. Once you fill out our form, a
                neighbor in our collective will call or email you back. We will
                call you to confirm your shopping list and address, and then
                connect you with a supporting neighbor who can deliver to you.
                It might take 1-2 weeks for us to respond, please keep in mind
                that we are neighbors volunteering in our free time! \n Get
                Started by create a requester account:
            </ListRow>
            <Row>
                {!isAuthenticated && (
                    <Button
                        className="m-auto"
                        variant="info"
                        onClick={openAuthModal}
                    >
                        Create Requester Account
                    </Button>
                )}
            </Row>
            <ListRow title="Please keep in mind that:">
                \n &#8226; Our grocery and essential item deliveries are only
                for items that can be found easily at a grocery or drug store.
                For larger items, please join our facebook group. \n &#8226; We
                are not a non-profit or government funded program. We are
                neighbors organizing this program in our free time. It may take
                1-2 weeks for us to call or email you back. Please be patient
                with us! \n &#8226; If you are worried that your request has
                been long, please email us rather than filling out the form
                again. Our email is covid19mutualaideastside@gmail.com \n
                &#8226; All our cash resources are shared. We are funded
                completely by neighbors. Since we have limited cash resources,
                there is a maximum amount of groceries that we can offer. Please
                request what you need and give back what you can!
            </ListRow>
        </Container>
    )
})
