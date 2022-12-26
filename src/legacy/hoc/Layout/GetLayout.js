import React from 'react'
import { Container, Row, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const GetLayout = (props) => {
    const { pageTitle, children } = props
    return (
        <Container className="p-5">
            <h3>{pageTitle}</h3>
            <hr />

            <Row className="p-2">
                “Mutual aid is “cooperation for the sake of the common good.”
                It’s getting people to come together to meet each other’s needs,
                recognizing that as humans, our survival is dependent on one
                another.“ - Mariame Kaba
            </Row>

            <Row className="p-2">
                <Card.Text>
                    We center our work in abolition, that those most harmed by
                    systems of power must be centered in creating new ways of
                    caring for each other, and that our liberation AND our
                    wellbeing are interconnected.
                </Card.Text>
            </Row>

            {children}

            <Row className="p-2">
                To share events and resources with neighbors virtually, join our
                facebook group.{' '}
                <a href="https://www.facebook.com/groups/555635161739149/">
                    www.facebook.com/groups/555635161739149/
                </a>{' '}
            </Row>

            <Row className="p-2">
                <Card.Text>
                    Do you want to organize a mutual aid project in your area?
                    Host a supply drive, a community pantry event, or fundraiser
                    or have any questions? Please email us at{' '}
                    <a href="mailto:covid19mutualaideastside@gmail.com">
                        covid19mutualaideastside@gmail.com
                    </a>
                </Card.Text>
            </Row>
        </Container>
    )
}

GetLayout.propTypes = {
    pageTitle: PropTypes.string,
    children: PropTypes.node,
}
