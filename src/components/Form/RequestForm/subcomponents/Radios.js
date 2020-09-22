import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';

const Radios = (props) => {
    const { label, name, options, required, description, tip, ...rest } = props;

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

            <Form.Text className='mb-3' muted>{description}</Form.Text>

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
                            type='radio'
                            id={option.value}
                            value={option.value}
                            checked={field.value === option.value}
                            label={option.key}
                        />
                    ))
                }}
            </Field>

            <ErrorMessage name={name} component={(errMsg) => <div className='error'>{errMsg.children}</div>} />
        </Form.Group>
    )
};

export default Radios;