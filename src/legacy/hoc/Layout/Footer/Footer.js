import React from 'react'
import { Segment, List, Grid, Header, Icon } from 'semantic-ui-react'
// import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Footer.css'

const Footer = () => (
    <footer id="footer">
        <Segment
            className="waveFooter"
            inverted
            vertical
            style={{ padding: '4em 1em', backgroundColor: '#343a40' }}
        >
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header inverted as="h4" content="Pages" />
                            <List link inverted>
                                <ListItem path="/">Home</ListItem>
                                <ListItem path="/get-help">Get Help</ListItem>
                                <ListItem path="/get-involved">
                                    Get Involved
                                </ListItem>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header inverted as="h4" content="Links" />
                            <List link inverted>
                                <ListItem path="/faq#requestingSupport">
                                    How To Get Help
                                </ListItem>
                                <ListItem path="/faq#offeringSupport">
                                    How To Get Involved
                                </ListItem>
                                <List.Item
                                    as="a"
                                    onClick={() =>
                                        window.open(
                                            'https://gdoc.pub/doc/e/2PACX-1vRMxV09kdojzMdyOfapJUOB6Ko2_1iAfIm8ELeIgma21wIt5HoTqP1QXadF01eZc0ySrPW6VtU_veyp',
                                            '_blank'
                                        )
                                    }
                                >
                                    Mutual Aid Toolkit
                                </List.Item>

                                <List.Item
                                    as="a"
                                    onClick={() =>
                                        window.open(
                                            'https://docs.google.com/forms/d/e/1FAIpQLScc_Ok6nxhAOLghITWPhLKGh8uRHEDKexxVerj5L-9BoJo-xA/viewform',
                                            '_blank'
                                        )
                                    }
                                >
                                    Mutual Aid Pod
                                </List.Item>
                                <ListItem path="/faq#contactUs">
                                    Contact Us
                                </ListItem>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            {/* <Form>
								<Form.Control
									className="subscribe-email"
									type="email"
									placeholder="Enter email"
								/>
								<Button variant="warning" size="sm" className="mt-2">
									Subscribe
								</Button>
							</Form>
							<br /> */}
                            <Icon
                                name="facebook"
                                className="fb-icon"
                                onClick={() =>
                                    window.open(
                                        'https://www.facebook.com/SKCmutualaid',
                                        '_blank'
                                    )
                                }
                            />{' '}
                            <Icon
                                name="instagram"
                                className="ig-icon"
                                onClick={() =>
                                    window.open(
                                        'https://www.instagram.com/skc_e_mutual_aid/',
                                        '_blank'
                                    )
                                }
                            />
                            <Icon
                                name="patreon"
                                className="pt-icon"
                                onClick={() =>
                                    window.open(
                                        'https://www.patreon.com/skcemutualaid',
                                        '_blank'
                                    )
                                }
                            />
                            <br />
                            <br />
                            <p className="quote-ma">
                                “Mutual aid is “cooperation for the sake of the
                                common good.” It’s getting people to come
                                together to meet each other’s needs, recognizing
                                that as humans, our survival is dependent on one
                                another.“ - Mariame Kaba
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* <p>Copyright &copy; 2020 SKCEMA</p> */}
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </footer>
)

const ListItem = (props) => {
    const { path, children } = props
    return (
        <List.Item>
            <Link className="list-item" to={path}>
                {children}
            </Link>
        </List.Item>
    )
}

ListItem.propTypes = {
    path: PropTypes.string,
    children: PropTypes.string,
}

export default Footer
