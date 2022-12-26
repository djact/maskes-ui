import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Form, Col } from 'react-bootstrap'
import TextError from './shared/TextError'
import LabelTip from './shared/LabelTip'
import PropTypes from 'prop-types'

const Input = (props) => {
    const {
        label,
        name,
        placeholder,
        description,
        tip,
        required,
        asCol,
        ...rest
    } = props

    return (
        <Form.Group as={asCol && Col} controlId={name}>
            <LabelTip label={label} tip={tip} required={required} />

            <Form.Text className="my-3">{description}</Form.Text>

            <Field id={name} name={name} {...rest}>
                {(props) => {
                    const { field, meta } = props
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
                }}
            </Field>

            <ErrorMessage name={name} component={TextError} />
        </Form.Group>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    asCol: PropTypes.bool,
    placeholder: PropTypes.string,
    description: PropTypes.object,
    tip: PropTypes.object,
    field: PropTypes.object,
    meta: PropTypes.object,
}

export default Input
