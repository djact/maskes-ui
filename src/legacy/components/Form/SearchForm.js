import React from 'react'
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import * as searchData from './FormData'

const SearchForm = (props) => {
    const {
        location,
        urgent,
        date,
        familySize,
        onChange,
        onSubmit,
        searchRequestId,
        setSearchRequestId,
    } = props

    const onRequestNoChange = (event) => {
        setSearchRequestId(event.target.value)
    }

    return (
        <div>
            <Form>
                <Row>
                    <Col md={6} lg={3}>
                        <Form.Group as={Col} controlId="searchUrgent">
                            <Form.Label>ASAP/Urgent Needs</Form.Label>
                            <Form.Control
                                as="select"
                                name="urgent"
                                value={urgent}
                                onChange={onChange}
                            >
                                <option value="">All...</option>
                                {searchData.urgency.map((urgent) => (
                                    <option key={urgent} value={urgent}>
                                        {urgent}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                        <Form.Group as={Col} controlId="searchLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                as="select"
                                name="location"
                                value={location}
                                onChange={onChange}
                            >
                                <option value="">All...</option>
                                {searchData.locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                        <Form.Group as={Col} controlId="familySize">
                            <Form.Label>Family Size</Form.Label>
                            <Form.Control
                                as="select"
                                name="familySize"
                                value={familySize}
                                onChange={onChange}
                            >
                                <option value={0}>Any...</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8+</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                        <Form.Group as={Col} controlId="searchDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                as="select"
                                name="date"
                                value={date}
                                onChange={onChange}
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Form onSubmit={onSubmit}>
                <InputGroup as={Col} className="mb-3 mt-3">
                    <Form.Control
                        placeholder="Request #"
                        name="requestId"
                        value={searchRequestId}
                        type="number"
                        onChange={onRequestNoChange}
                    />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-info">
                            Search
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </div>
    )
}

export default SearchForm
