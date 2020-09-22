import React from 'react';
import { Container, Button } from 'react-bootstrap';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './subcomponents/FormikControl';

import './RequestForm.css';

const OfferSupportForm = (props) => {
    const dropdownOptions = [
        { key: 'Select an option', value: '' },
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' },
    ];

    const radioOptions = [
        { key: 'Radio Option 1', value: 'rOption1' },
        { key: 'Radio Option 2', value: 'rOption2' },
        { key: 'Radio Option 3', value: 'rOption3' },
    ];

    const checkboxOptions = [
        { key: 'Checkbox Option 1', value: 'cOption1' },
        { key: 'Checkbox Option 2', value: 'cOption2' },
        { key: 'Checkbox Option 3', value: 'cOption3' },
        { key: 'Checkbox Option 4', value: 'cOption4' },
    ];

    const initialValues = {
        fullName: '',
        itemsList: '',
        selectOption: '',
        radioOption: '',
        checkboxOption: [],
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Required'),
        itemsList: Yup.string().required('Required'),
        selectOption: Yup.string().required('Required'),
        radioOption: Yup.string().required('Required'),
        checkboxOption: Yup.array().required('Required'),
    });

    const onSubmit = values => {
        console.log('[Form Data]', values)
    };

    return (
        <Container className='mt-4 px-5'>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
            // validateOnBlur={true}
            >
                <Form>
                    <FormikControl
                        control='input'
                        placeholder="Full Name"
                        name="fullName"
                        label='Full Name'
                        required
                    />

                    <FormikControl
                        control='textarea'
                        placeholder='Items list'
                        name='itemsList'
                        label='Items List'
                        required
                    />

                    <FormikControl
                        control='select'
                        label='Select a topic'
                        name='selectOption'
                        options={dropdownOptions}
                        required
                    />

                    <FormikControl
                        control='radio'
                        label='Radio Topics'
                        name='radioOption'
                        options={radioOptions}
                        required
                    />

                    <FormikControl
                        control='checkbox'
                        label='Checkbox Topic'
                        name='checkboxOption'
                        options={checkboxOptions}
                        required
                    />

                    <Button type="submit">Submit</Button>
                </Form>

            </Formik>

        </Container>
    )
};

export default OfferSupportForm;