import React, { useState } from 'react';
import { Container, Button, Card, Row } from 'react-bootstrap';
import maPoster from '../../../assets/images/poster.jpg';
import apiChaya from '../../../assets/images/api-chaya.jpg';
import './RequestForm.css';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import * as FormOptions from './subcomponents/shared/FormOptions';
import FormikControl from './subcomponents/shared/FormikControl';

const initialValues = {
    contact_preference: '',
    locations: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    zip_code: '',
    agree_transfer: '',
    prefered_food: '',
    items_list: '',
    food_restrictions: '',
    household_number: "",
    urgency: '',
    financial_support: '',
    special_info: '',
    share_info: '',
    need_checkin: '',
    extra_info: '',
    ma_pod_setup: '',
    offer_resources: '',
}

const onSubmit = (values, actions) => {
    console.log('[FORM DATA]', values);
    console.log('[ON SUBMIT PROPS]', actions);
    actions.setSubmitting(false);
    actions.resetForm();
}

const maskPhoneNumberHandler = (e) => {
    const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
}

const validationSchema = Yup.object({
    contact_preference: Yup.string().required('Required'),
    locations: Yup.string().required('Required'),
    phone: Yup.string().required('Required').min(12, 'Please enter 10-digit phone number'),
    address1: Yup.string().required('Required').max(100, 'Must be less than 100 characters'),
    address2: Yup.string().max(25, 'Must be less than 25 characters'),
    city: Yup.string().required('Required').max(35, 'Longest US city name is "Mooselookmeguntic", which has 17 only letters'),
    zip_code: Yup.string().required('Required').matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Must be 5 or 9 digits'),
    agree_transfer: Yup.string().required('Required'),
    prefered_food: Yup.string().required('Required'),
    items_list: Yup.string().required('Required').max(2000, 'Please enter less than 2000 characters'),
    food_restrictions: Yup.string().required('Required').max(200, 'Please enter less than 200 characters'),
    household_number: Yup.number('Please input a number').required('Required').max(99, 'Please enter less than 2 digits').min(1, 'Household size is at least 1'),
    urgency: Yup.string().required('Required'),
    financial_support: Yup.string().required('Required'),
    special_info: Yup.string().required('Required').max(1000, 'Please enter less than 1000 characters'),
    share_info: Yup.string().required('Required'),
    need_checkin: Yup.string().required('Required'),
    extra_info: Yup.string().required('Required').max(2000, 'Please enter less than 2000 characters'),
    ma_pod_setup: Yup.string().required('Required'),
    offer_resources: Yup.string().required('Required').max(1000, 'Please enter less than 1000 characters'),
});


const RequestSupportForm = (props) => {
    // eslint-disable-next-line
    const [formValues, setFormValues] = useState(null)

    return (
        <Container className='mt-4 px-5'>
            <h3>Request Support Form</h3>
            <hr />
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize

            >{({ isValid, isSubmitting, handleChange }) => (
                <Form>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='Where in South King County or Eastside are you located?'
                            description={<p>
                                This form is for South King County and Eastside.
                                <br />If you're in Seattle, please complete this:
                                <a href="https://docs.google.com/forms/d/1rOkXW6ElVT0MH9oSI-TuW8L5szCt-ULbZhWebARRZNI/viewform" target="_blank" rel="noopener noreferrer">
                                    {' '}Seattle area COVID-19 "Request Support" Form
                                </a>
                            </p>}
                            control='select'
                            name='locations'
                            options={FormOptions.locations}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3' style={{ padding: '20px' }}>
                        <FormikControl
                            label='Phone Number'
                            control='input'
                            placeholder="123-456-7890"
                            name="phone"
                            onChange={(e) => {
                                maskPhoneNumberHandler(e);
                                handleChange(e);
                            }}
                            required
                        />

                        <FormikControl
                            label='Address'
                            control='input'
                            placeholder="1234 Main St"
                            name='address1'
                            required
                        />
                        <FormikControl
                            control='input'
                            placeholder="Apartment, studio, or floor"
                            name='address2'
                            label='Address 2'
                        />
                        <Row>
                            <FormikControl
                                label='City'
                                asCol
                                control='input'
                                name='city'
                                required
                            />
                            <FormikControl
                                label='Zip'
                                asCol
                                control='input'
                                name='zip_code'
                                required
                            />
                        </Row>
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='What would be the quickest method of reaching you?'
                            control='radio'
                            name='contact_preference'
                            options={FormOptions.contact_preference}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='If you live outside of our service area, can we send your request details to another local mutual aid organization who we trust?'
                            tip={
                                <div>
                                    <p>If you say <strong>YES</strong>, it will be will be faster and simpler to get you your delivery! </p>
                                    <p>If you say <strong>NO</strong> and you live outside of our range, we will let you know that we can't help you and tell you where to go to find help for your location, which may take a while, and then you will have to fill out another group's form and begin the whole process again from scratch. (We will never share your information with advertisers, political candidates or parties, corporations, or the government.)</p>
                                </div>

                            }
                            control='radio'
                            name='agree_transfer'
                            options={FormOptions.yes_no}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='Food Preference?'
                            control='checkbox'
                            name='prefered_food'
                            options={FormOptions.food_preference}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='What are the essential/ urgent items you need?'
                            control='textarea'
                            placeholder="Your Answer"
                            tip={`Items can be general like "milk," or specific like "a 24-pack of the purple Always brand overnight menstrual pads with wings."`}
                            description={
                                <p>We are on a volunteer basis and actively fundraising. At this moment we are set up to prioritize delivering ONLY ESSENTIAL/URGENT/ IMMEDIATE needs of our community members.
                                <br />We will do our best to match your requests, but if we can't find something specific we may get you a similar substitute. We trust you to know your needs and we are committed to delivery without judgement.</p>
                            }
                            name="items_list"
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label="Do you have any restrictions, allergies or intolerances?"
                            control='textarea'
                            placeholder="Your Answer"
                            description="If there are no allergies/ restrictions, enter none."
                            name="food_restrictions"
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label="How many individuals are in your household?"
                            control='input'
                            type='number'
                            placeholder="Your Answer"
                            name="household_number"
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='How urgent is your need?'
                            description="Please allow us 48 hours to respond to your request."
                            control='radio'
                            name='urgency'
                            options={FormOptions.urgency}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='Would you like financial support with your delivery?'
                            description={
                                <p>
                                    We can fund supplies up to a certain amount per request (While
                                    funding lasts) for folks who are quarantined without pay, sick,
                                    disabled, elderly, undocumented, queer, Black, Indigenous, and/or
                                    people of color.
                                </p>
                            }
                            control='radio'
                            name='financial_support'
                            options={FormOptions.financial_support}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label="Can you tell us about your social location, privileges you do or
                            don’t have, whether you are Black, Indigenous, Person of Color
                            (BIPOC), identify as a survivor of domestic or sexual violence, etc."
                            control='textarea'
                            placeholder="Your Answer"
                            name="special_info"
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='Is it okay to share your contact number, address, and grocery list
                            with the volunteer who is doing the delivery?'
                            control='radio'
                            name='share_info'
                            options={FormOptions.yes_no}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='Would you like us to check in via text or call every few weeks to
                            support you in your health and wellbeing?'
                            control='radio'
                            name='need_checkin'
                            options={FormOptions.need_checkin}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label='Are there things you would like us to know?'
                            description="Any support or
                                resources you would like to offer, questions, comments, concerns."
                            control='textarea'
                            placeholder="Your Answer"
                            name='extra_info'
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label="Are you interested in joining your neighborhood mutual aid pod?"
                            description={
                                <p>If you need assistance in setting up your own mutual aid pod to support
                                yourself and your neighbors with current/ future needs? If so,
                                please go this link to join our Neighborhood Mutual Aid Pods Group:
                                <a href="https://tinyurl.com/KCMutualAidPod" target="_blank" rel="noopener noreferrer">
                                        {' '}KCMutualAidPod</a></p>
                            }
                            control='radio'
                            name='ma_pod_setup'
                            options={FormOptions.yes_no}
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3 px-4 pb-2 pt-3'>
                        <FormikControl
                            label=' Is there anything else you would like us to know about resources you
                            can offer?'
                            description={
                                <p>
                                    In the near future, we are considering expanding the types of mutual
                                    aid we offer. These might include emotional support, household chore
                                    assistance, childcare, dog walking, etc. Please note access details
                                    when possible, like: are you able to be scent-free (
                                    <a href="http://thinkbeforeyoustink.com/howtogofragrancefree.html" target="_blank" rel="noopener noreferrer">
                                        How to go fragrance free
                                    </a>)? Can you speak several languages, or sign languages? Do you have a
                                    wheelchair accessible van?
                                </p>
                            }
                            control='textarea'
                            placeholder="Your Answer"
                            name='offer_resources'
                            required
                        />
                    </Card>

                    <Card className='mt-3 mb-3' style={{ padding: '20px' }}>

                        <Card.Text>
                            We know that violence and abuse thrives in isolation,
                            so do keep reaching out to your friends and family and creating online spaces to connect.
                            If you or your loved ones need more resources and support,
                            reach out to any of these organizations:
                        </Card.Text>
                        <ul>
                            <li><a href="https://www.apichaya.org/" target="_blank" rel="noopener noreferrer">API Chaya</a></li>
                            <li><a href="https://www.nwnetwork.org/" target="_blank" rel="noopener noreferrer">The Northwest Network of Bi, Trans, Lesbian, and Gay Survivors of Abuse</a></li>
                            <li>
                                <a href="https://arcofkingcounty.org/" target="_blank" rel="noopener noreferrer">The Arc of King County</a>, {' '}
                                <a href="http://mcrcseattle.org/" target="_blank" rel="noopener noreferrer">MCRC Seattle</a>, {' '}
                                <a href="https://cairwa.org/" target="_blank" rel="noopener noreferrer">CAIR Washington</a>
                            </li>
                            <li><a href="https://www.thehotline.org/" target="_blank" rel="noopener noreferrer">National Domestic Violence Hotline: {' '}</a>1-800-799-7233</li>
                            <li><a href="https://www.kcsarc.org/" target="_blank" rel="noopener noreferrer">King County Sexual Assault Resource Center</a></li>
                            <li><a href="https://www.mapsredmond.org/amen/" target="_blank" rel="noopener noreferrer">MAPS AMEN</a></li>
                            <li><a href="https://humantraffickinghotline.org/" target="_blank" rel="noopener noreferrer">National Human Trafficking Hotline: {' '}</a>1-888-373-7888</li>
                        </ul>

                        <br />
                        <Card.Img
                            variant="bottom"
                            src={apiChaya}
                        />
                    </Card>

                    <Card>
                        <Card.Text style={{ fontWeight: 'bold', padding: '20px' }}>
                            We're so glad you've reached out to us for support. We will try our best to get back to you within 48 hours as to whether we can meet your request. Thank you for your patience and grace.
                        </Card.Text>
                    </Card>

                    <Card className='mt-3'>
                        <Card.Img
                            variant="bottom"
                            src={maPoster}
                            style={{ margin: 'auto' }}
                        />
                    </Card>

                    <Button
                        type="submit" size="lg"
                        disabled={!isValid || isSubmitting}
                        className='mt-3 submit-request-button'>Submit</Button>
                </Form>
            )}



            </Formik>

        </Container>
    )
};

export default RequestSupportForm;