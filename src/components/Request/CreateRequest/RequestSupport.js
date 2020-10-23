import React from 'react';
import { connect } from 'react-redux';
import { createRequest } from '../../../containers/Requests/RequestList/store/actions/actions';

import RequestSupportForm from '../../Form/RequestForm/RequestSupportForm';

const RequestSupport = (props) => {
    const { createRequest, updateRequest, requestData, onEdit, setOnEdit } = props;

    return (
        <RequestSupportForm
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            createRequest={createRequest}
            updateRequest={updateRequest}
            requestData={requestData}
        />
    );
};

export default connect(null, { createRequest })(RequestSupport);