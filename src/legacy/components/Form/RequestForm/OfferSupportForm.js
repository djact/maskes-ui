import React, { useState, useEffect } from 'react'
import { Container, Button, Card, Row } from 'react-bootstrap'
import './RequestForm.css'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import * as FormOptions from './subcomponents/shared/FormOptionsVolunteer'
import {
    Input,
    TextArea,
    Radios,
    Checkboxes,
} from './subcomponents/shared/FormikControl'
import PropTypes from 'prop-types'

const initialValues = {
    contact_preference: '',
    locations: '',
    phone: '',
    city: '',
    zip_code: '',
    transportation_access: '',
    walk_distance: '',
    financial_support: '',
    special_info: '',
    additional_supplies: '',
    need_checkin: '',
    extra_info: '',
    ma_pod_setup: '',
    support_skills: '',
    accessibility_needs: '',
    availability: '',
    volunteer_hours: '',
    languages: '',
    coordinating: '',
    storage_space: '',
    pickup_concern: '',
}

const maskPhoneNumberHandler = (e) => {
    const x = e.target.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
}

const maskZipCodeHandler = (e) => {
    const x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,4})/)
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2]
}

const validationSchema = Yup.object({
    contact_preference: Yup.string().required('Required'),
    locations: Yup.string().required('Required'),
    phone: Yup.string()
        .min(12, 'Please enter 10-digit phone number')
        .required('Required'),

    city: Yup.string()
        .max(
            35,
            'Longest US city name is "Mooselookmeguntic", which has 17 only letters'
        )
        .required('Required'),
    zip_code: Yup.string()
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Must be 5 or 9 digits')
        .required('Required'),
    transportation_access: Yup.string().required('Required'),

    walk_distance: Yup.string().max(
        200,
        'Please enter less than 200 characters'
    ),

    financial_support: Yup.string(),
    special_info: Yup.string().max(
        2000,
        'Please enter less than 2000 characters'
    ),
    additional_supplies: Yup.string(),
    need_checkin: Yup.string(),
    extra_info: Yup.string().max(
        1000,
        'Please enter less than 1000 characters'
    ),
    ma_pod_setup: Yup.string(),
    support_skills: Yup.string().max(
        1000,
        'Please enter less than 1000 characters'
    ),

    accessibility_needs: Yup.string(),
    availability: Yup.string(),
    volunteer_hours: Yup.number().required('Required'),
    languages: Yup.string().max(200, 'Please enter less than 200 characters'),
    coordinating: Yup.string(),
    storage_space: Yup.string().max(
        200,
        'Please enter less than 200 characters'
    ),
    pickup_concern: Yup.string().max(
        200,
        'Please enter less than 200 characters'
    ),
})

const OfferSupportForm = (props) => {
    const [formValues, setFormValues] = useState(null)

    const { requestData, setNext, setVolunteerInfo } = props

    useEffect(() => {
        if (requestData) {
            for (let key of Object.keys(requestData)) {
                if (Array.isArray(requestData[key])) {
                    requestData[key] = requestData[key].split(', ')
                }
            }
            setFormValues({
                contact_preference: requestData.contact_preference,
                locations: requestData.locations,
                phone: requestData.phone,
                city: requestData.city,
                zip_code: requestData.zip_code,
                financial_support: requestData.financial_support,
                special_info: requestData.special_info,
                need_checkin: requestData.need_checkin,
                extra_info: requestData.extra_info,
                offer_resources: requestData.offer_resources,
                agree_transfer: requestData.agree_transfer,
                share_info: requestData.share_info,
                ma_pod_setup: requestData.ma_pod_setup,
                support_skills: requestData.support_skills,
                accessibility_needs: requestData.accessibility_needs,
                availability: requestData.availability,
                volunteer_hours: requestData.volunteer_hours,
                languages: requestData.languages,
                coordinating: requestData.coordinating,
                storage_space: requestData.storage_space,
                pickup_concern: requestData.pickup_concern,
            })
        }
    }, [requestData])

    const onSubmit = (values, actions) => {
        actions.setSubmitting(false)
        setVolunteerInfo(values)
        for (let key of Object.keys(values)) {
            if (Array.isArray(values[key])) {
                values[key] = values[key].join(', ')
            }
        }
        // actions.resetForm();
        setNext(true)
    }

    return (
        <Container className="mt-4">
            <h3>Offer Support Form</h3>
            <hr />
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ isValid, isSubmitting, handleChange }) => (
                    <Form>
                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Checkboxes
                                label="Please select the cities where you are available to check-in with folks remotely and/ or able to offer/ deliver groceries and supplies."
                                name="locations"
                                options={FormOptions.locations}
                                required
                            />
                        </Card>

                        <Card className="mt-3 mb-3" style={{ padding: '20px' }}>
                            <Input
                                label="Contact Number"
                                placeholder="123-456-7890"
                                name="phone"
                                onChange={(e) => {
                                    maskPhoneNumberHandler(e)
                                    handleChange(e)
                                }}
                                required
                            />
                            <Row>
                                <Input
                                    label="Which city/neighborhood do you live in?"
                                    asCol
                                    name="city"
                                    required
                                />
                                <Input
                                    label="Zip"
                                    asCol
                                    name="zip_code"
                                    onChange={(e) => {
                                        maskZipCodeHandler(e)
                                        handleChange(e)
                                    }}
                                    required
                                />
                            </Row>
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Radios
                                label="What is the best way to contact you?"
                                name="contact_preference"
                                options={FormOptions.contact_preference}
                                required
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Radios
                                label="Do you have access to a car or transportation? If so, would you be able to deliver groceries/ supplies?"
                                tip={
                                    <p>
                                        {
                                            'select "Other" if you have access to a car but will not be able to deliver'
                                        }
                                    </p>
                                }
                                name="transportation_access"
                                options={FormOptions.yes_no}
                                required
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Input
                                label="If you do not have access to a vehicle, how far are you willing to walk from bus lines? Carrying how much weight?"
                                tip={
                                    <p>
                                        Feel free to include notes like &quot;I
                                        use a bike&quot; or &quot;I want to
                                        buddy up with someone who has a
                                        car.&quot;
                                    </p>
                                }
                                placeholder="Your Answer"
                                name="walk_distance"
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Checkboxes
                                label="Do you have any accessibility needs you want to share, or need anything else to feel safe providing deliveries?"
                                name="accessibility_needs"
                                options={FormOptions.accessibility_needs}
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Radios
                                label="Would you like to help pay for the groceries / supplies?"
                                name="financial_support"
                                options={FormOptions.financial_support}
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Input
                                label="Is there anything you are uncomfortable picking up? *There is absolutely no judgement - we are all here to support each other!"
                                placeholder="Your Answer"
                                name="pickup_concern"
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Radios
                                label="Do you have additional supplies (nonperisable food, canned food, sanitary items, etc) that you would be willing to donate to others?"
                                name="additional_supplies"
                                options={FormOptions.yes_no}
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Checkboxes
                                label="Generally, when are you available?"
                                name="availability"
                                options={FormOptions.availability}
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Input
                                label="How many hours per week can you volunteer?"
                                type="number"
                                placeholder="Your Answer"
                                name="volunteer_hours"
                                required
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Input
                                label="What languages do you speak? If you are comfortable translating, please list that too."
                                placeholder="Your Answer"
                                name="languages"
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <TextArea
                                label="What additional support skills would you be able to offer (researching resources, collecting supplies, emotional support, social media, volunteer coordination, coordinating requests for support). Please be specific regarding the skills you would be able to offer."
                                placeholder="Your Answer"
                                name="support_skills"
                                required
                            />
                        </Card>

                        <Card>
                            <Card.Text
                                style={{ fontWeight: 'bold', padding: '20px' }}
                            >
                                If you answered &quot;coordinating requests for
                                support&quot; (contacting community members
                                regarding their request for support and
                                coordinating that) in the above question, please
                                answer the question below. If not, go to the
                                next question.&quot;
                            </Card.Text>
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Checkboxes
                                label="Please check on the boxes that you are able to commit to."
                                tip={
                                    <div>
                                        <strong>
                                            For coordinating requests, we are
                                            looking for volunteers who can:
                                        </strong>

                                        <ul>
                                            <li>
                                                1. Commit at least 6 hours per
                                                week for the first few weeks and
                                                then 2 hours or more after for
                                                at least three months
                                            </li>
                                            <li>
                                                2. Must have an understanding of
                                                transformative justice,
                                                abolition, emotional first aid,
                                                solidarity support, or take
                                                these necessary training that we
                                                share with you in the first
                                                couple of weeks of volunteering,
                                            </li>
                                            <li>
                                                3. Attend weekly meetings and be
                                                committed to continued learning
                                                and struggle
                                            </li>
                                        </ul>
                                    </div>
                                }
                                name="coordinating"
                                options={FormOptions.coordinating}
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <TextArea
                                label="Are there things you would like us to know?"
                                description={
                                    <p>
                                        Any support or resources you would like
                                        to offer, questions, comments, concerns.
                                    </p>
                                }
                                placeholder="Your Answer"
                                name="extra_info"
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <TextArea
                                label="Can you tell us about your social location, privileges you do or
                            don’t have, whether you are Black, Indigenous, Person of Color
                            (BIPOC), identify as a survivor of domestic or sexual violence, etc."
                                placeholder="Your Answer"
                                name="special_info"
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Radios
                                label="How often would you like us to check-in on you to support you in your health and wellbeing?"
                                name="need_checkin"
                                options={FormOptions.need_checkin}
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Radios
                                label="Are you interested in joining your neighborhood mutual aid pod?"
                                description={
                                    <p>
                                        If you need assistance in setting up
                                        your own mutual aid pod to support
                                        yourself and your neighbors with
                                        current/ future needs? If so, please go
                                        this link to join our Neighborhood
                                        Mutual Aid Pods Group:
                                        <a
                                            href="https://tinyurl.com/KCMutualAidPod"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {' '}
                                            KCMutualAidPod
                                        </a>
                                    </p>
                                }
                                name="ma_pod_setup"
                                options={FormOptions.yes_no}
                            />
                        </Card>

                        <Card className="mt-3 mb-3 px-4 pb-2 pt-3">
                            <Radios
                                label="Would you have capacity to offer/ know of people who can offer space to store items, or have people drop off non-perishable items, or have space to set up a community hub?"
                                name="storage_space"
                                options={FormOptions.yes_no}
                            />
                        </Card>

                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className="mt-3 mr-2"
                        >
                            Next
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

OfferSupportForm.propTypes = {
    createRequest: PropTypes.func,
    updateRequest: PropTypes.func,
    requestData: PropTypes.object,
    setNext: PropTypes.func,
    setVolunteerInfo: PropTypes.func,
}

export default OfferSupportForm
