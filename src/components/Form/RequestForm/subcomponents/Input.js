import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form, Col } from 'react-bootstrap';
import TextError from './TextError';
const Input = (props) => {

    const { label, name, placeholder, description, required, asCol, ...rest } = props;

    return (
        <Form.Group as={asCol && Col} controlId={name}>
            <Form.Label>
                {label}
                {required && <span className='required'>*</span>}
            </Form.Label>

            <Form.Text className='my-3'>
                {description}
            </Form.Text>

            <Field id={name} name={name} {...rest}>
                {props => {
                    const { field, meta } = props;
                    // console.log('[INPUT FIELD PROPS]', props);
                    return (
                        <Form.Control
                            {...field}
                            placeholder={placeholder}
                            name={name}
                            value={field.value}
                            onChange={rest.onChange || field.onChange}
                            isInvalid={meta.touched && meta.error}
                            isValid={meta.touched && !meta.error}
                            type={rest.type}
                        />
                    )
                }}</Field>

            <ErrorMessage name={name} component={TextError} />
        </Form.Group>

    )
};

export default Input;