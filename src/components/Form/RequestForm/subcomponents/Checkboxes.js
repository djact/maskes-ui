import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

const Checkboxes = (props) => {

    const { label, name, options, required, ...rest } = props;
    return (
        <Form.Group controlId={name}>
            <Form.Label>
                {label}
                {required && <span className='required'>*</span>}
            </Form.Label>

            <Field name={name} {...rest}>
                {props => {
                    const { field } = props;
                    // console.log('[RADIO FIELD PROPS]', props);
                    return options.map((option) => (
                        <Form.Check
                            // order is important 
                            {...field}
                            {...rest}
                            key={option.key}
                            name={name}
                            type='checkbox'
                            id={option.value}
                            value={option.value}
                            checked={field.value.includes(option.value)}
                            label={option.key}
                        />
                    ))
                }}
            </Field>

            <ErrorMessage name={name} component={(errMsg) => <div className='error'>{errMsg.children}</div>} />

        </Form.Group>
    )
};

export default Checkboxes;