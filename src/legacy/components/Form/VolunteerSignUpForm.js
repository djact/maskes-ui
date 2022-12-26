import React, { useEffect } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { Formik, Form as FormikForm, useFormikContext } from 'formik'
import {
    Input,
    Checkboxes,
} from '../../components/Form/RequestForm/subcomponents/shared/FormikControl'

import * as Yup from 'yup'
import PropTypes from 'prop-types'
import './VolunteerSignUpForm.css'

const initialValues = {
    first_name: '',
    last_name: '',
    display_name: '',
    email: '',
    password: '',
    agreement: '',
    passwordConfirmation: '',
}

var passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')

const validationSchema = Yup.object({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    display_name: Yup.string().required('Required'),
    email: Yup.string()
        .required('Required')
        .email('Please enter a valid email'),
    password: Yup.string()
        .required('Required')
        .min(6, 'Must be at least 6 characters.')
        .matches(
            passwordRegex,
            'Must contain at least 1 uppercase, 1 lowercase, 1 one Number'
        ),

    agreement: Yup.string().required('You must agree before register.'),
    passwordConfirmation: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const SetFormError = (props) => {
    const { error } = props
    const { setFieldError } = useFormikContext()
    useEffect(() => {
        if (error && error.response && error.response.data)
            Object.keys(error.response.data).forEach((field) =>
                setFieldError(field, error.response.data[field])
            )
    }, [setFieldError, error])
    return null
}

SetFormError.propTypes = {
    error: PropTypes.object,
}

const VolunteerSignUpForm = (props) => {
    const { setNext, volunteerInfo, handleSubmit, error } = props

    const onSubmit = async (values, actions) => {
        actions.setSubmitting(false)
        await handleSubmit({ volunteerInfo, ...values })

        if (error && error.response && error.response.data)
            Object.keys(error.response.data).forEach((field) =>
                actions.setFieldError(field, error.response.data[field])
            )
    }

    return (
        <Container className="mt-4">
            <h3>Create A Volunteer Account</h3>
            <hr />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ isValid, isSubmitting }) => (
                    <FormikForm className="signup-form">
                        <Row>
                            <Col>
                                <Input
                                    label="First Name"
                                    tip={
                                        <>
                                            First name and Last name can be set
                                            private after your account is
                                            created.
                                        </>
                                    }
                                    name="first_name"
                                    placeholder="First Name"
                                />
                            </Col>
                            <Col>
                                <Input
                                    label="Last Name"
                                    tip={
                                        <>
                                            If you are not comfortable listing
                                            your full name, enter Initial/ few
                                            letters of your last name.
                                        </>
                                    }
                                    name="last_name"
                                    placeholder="Last Name or Initial"
                                />
                            </Col>
                        </Row>
                        <Input
                            label="Display Name"
                            tip={<>Your display name is public.</>}
                            name="display_name"
                            placeholder="Display Name"
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                        />

                        <Input
                            label="Password"
                            tip={
                                <>
                                    Your password must be at least 6 characters.
                                </>
                            }
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <Input
                            label="Confirm Password"
                            name="passwordConfirmation"
                            type="password"
                            placeholder="Retype Password"
                        />
                        <Checkboxes
                            name="agreement"
                            options={[
                                {
                                    key: 'Agree to terms and conditions',
                                    value: 'Agree to terms and conditions',
                                },
                            ]}
                        />

                        <Button
                            variant="secondary"
                            className="mt-3 mr-2"
                            onClick={() => setNext(false)}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className="mt-3 mr-2"
                        >
                            Submit
                        </Button>
                        <SetFormError error={error} />
                    </FormikForm>
                )}
            </Formik>
        </Container>
    )
}

VolunteerSignUpForm.propTypes = {
    isLoading: PropTypes.bool,
    onChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    setNext: PropTypes.func,
    setVolunteerInfo: PropTypes.func,
    volunteerInfo: PropTypes.object,
    error: PropTypes.object,
}

export default VolunteerSignUpForm
