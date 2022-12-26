import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Form } from 'react-bootstrap'
import TextError from './shared/TextError'
import LabelTip from './shared/LabelTip'
import PropTypes from 'prop-types'

const Select = (props) => {
    const { label, name, options, description, tip, required, ...rest } = props

    return (
        <Form.Group controlId={name}>
            <LabelTip label={label} tip={tip} required={required} />

            <Form.Text className="my-3">{description}</Form.Text>

            <Field id={name} name={name} {...rest}>
                {(props) => {
                    const { field, meta } = props
                    // console.log('[SELECT FIELD PROPS]', props);
                    return (
                        <Form.Control
                            {...field}
                            name={name}
                            onChange={field.onChange}
                            isInvalid={meta.touched && meta.error}
                            isValid={meta.touched && !meta.error}
                            as="select"
                        >
                            {options.map((option) => {
                                return (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.key}
                                    </option>
                                )
                            })}
                        </Form.Control>
                    )
                }}
            </Field>

            <ErrorMessage name={name} component={TextError} />
        </Form.Group>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    description: PropTypes.object,
    tip: PropTypes.object,
    field: PropTypes.object,
    meta: PropTypes.object,
}

export default Select
