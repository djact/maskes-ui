import React from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import Radios from './Radios';
import Checkboxes from './Checkboxes';

const FormikControl = (props) => {
    const { control, ...rest } = props;
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <TextArea {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'radio':
            return <Radios {...rest} />
        case 'checkbox':
            return <Checkboxes {...rest} />

        default:
            return null
    }

};

export default FormikControl;