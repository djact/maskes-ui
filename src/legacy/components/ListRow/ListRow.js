import React from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export const ListRow = (props) => {
    const { title, children, path, icon, pathName } = props
    const history = useHistory()
    const content = children.split('\\n')
    return (
        <Row className="p-2">
            {icon && (
                <Col
                    md="auto"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '15px',
                    }}
                >
                    {icon}
                </Col>
            )}
            <Col>
                <Card style={{ border: 'none' }}>
                    <Card.Body>
                        <Card.Title style={{ fontWeight: 'bold' }}>
                            {title}
                        </Card.Title>
                        {content.map((item, idx) =>
                            item.slice(0, 4) === 'http' ? (
                                <div key={idx}>
                                    <Button
                                        style={{ margin: 0, padding: 0 }}
                                        variant="link"
                                        onClick={() =>
                                            window.open(item, '_blank')
                                        }
                                    >
                                        {item}
                                    </Button>
                                </div>
                            ) : (
                                <Card.Text key={idx} className="mt-2">
                                    {item}
                                </Card.Text>
                            )
                        )}

                        {history.location.pathname === pathName && (
                            <Button
                                className="mt-2"
                                variant="secondary"
                                onClick={() => history.push(path)}
                            >
                                Learn More
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

ListRow.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    path: PropTypes.string,
    history: PropTypes.object,
    icon: PropTypes.object,
    pathName: PropTypes.string,
}
