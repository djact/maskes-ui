import React from 'react';
import Feedback from 'react-bootstrap/Feedback';

const TextError = (errorMsg) => {

    return (
        <Feedback type="invalid">
            {errorMsg.children}
        </Feedback>
    )
};

export default TextError;