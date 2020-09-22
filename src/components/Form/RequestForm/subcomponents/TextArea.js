import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import TextError from './TextError';
const TextArea = (props) => {

    const { label, name, placeholder, description, tip, required, ...rest } = props;

    return (

        <Form.Group controlId={name}>
            <Form.Label>
                <OverlayTrigger
                    placement='top'
                    overlay={
                        tip ? <Popover>
                            <Popover.Content>
                                {tip}
                            </Popover.Content>
                        </Popover> : () => <div></div>
                    }
                >
                    <div>
                        {label}
                        {required && <span className='required'>*</span>}
                    </div>
                </OverlayTrigger>
            </Form.Label>

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