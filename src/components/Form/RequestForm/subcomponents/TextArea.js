import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import TextError from './shared/TextError';
import LabelTip from './shared/LabelTip';
const TextArea = (props) => {

    const { label, name, placeholder, description, tip, required, ...rest } = props;

    return (

        <Form.Group controlId={name}>
            <LabelTip label={label} tip={tip} required={required} />

            <Form.Text className='my-3'>
                {description}
            </Form.Text>

            <Field id={name} name={name} {...rest}>
                {props => {
                    const { field, meta } = props;
                    // console.log('[TEXTAREA FIELD PROPS]', props);
                    return (
                        <Form.Control
                            {...field}
                            as="textarea"
                            rows='4'
                            placeholder={placeholder}
                            name={name}
                            value={field.value}
                            onChange={field.onChange}
                            isInvalid={meta.touched && meta.error}
                            isValid={meta.touched && !meta.error}
                        />
                    )
                }}</Field>

            <ErrorMessage name={name} component={TextError} />
        </Form.Group>


    )
};

export default TextArea;