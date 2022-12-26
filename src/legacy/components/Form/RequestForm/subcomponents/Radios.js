import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Form } from 'react-bootstrap'
import LabelTip from './shared/LabelTip'
import PropTypes from 'prop-types'
const Radios = (props) => {
    const { label, name, options, required, description, tip, ...rest } = props

    return (
        <Form.Group controlId={name}>
            <LabelTip label={label} tip={tip} required={required} />

            <Form.Text className="mb-3" muted>
                {description}
            </Form.Text>

            <Field name={name} {...rest}>
                {(props) => {
                    const { field } = props
                    // console.log('[RADIO FIELD PROPS]', props);
                    return options.map((option, index) => (
                        <Form.Check
                            // order is important
                            {...field}
                            {...rest}
                            key={option.key}
                            name={name}
                            type="radio"
                            id={name + index}
                            value={option.value}
                            label={option.key}
                            checked={option.value === field.value}
                        />
                    ))
                }}
            </Field>

            <ErrorMessage
                name={name}
                component={(errMsg) => (
                    <div className="error">{errMsg.children}</div>
                )}
            />
        </Form.Group>
    )
}

Radios.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    description: PropTypes.object,
    tip: PropTypes.object,
    field: PropTypes.object,
}

export default Radios
