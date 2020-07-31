import { setAlert } from '../../../../../components/Alert/store/actions/actions';
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchVolunteerDetailStart = () => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_DETAIL_START
    };
}

export const fetchVolunteerDetailSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_DETAIL_SUCCESS,
        payload: payload
    };
}

export const fetchVolunteerDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_DETAIL_FAIL,
        error: error
    };
}

export const fetchVolunteerDetail = (volunteerId, token) => {
    return dispatch => {
        dispatch(fetchVolunteerDetailStart());
        const url = `http://127.0.0.1:8000/requests/volunteering/${volunteerId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                const payload = response.data;
                dispatch(fetchVolunteerDetailSuccess(payload))
            })
            .catch(error => {
                dispatch(fetchVolunteerDetailFail(error))
                dispatch(setAlert("Failed to fetch data from server", "danger"));
            })
    }
};

//DELETE VOLUNTEER

export const deleteVolunteerStart = () => {
    return {
        type: actionTypes.DELETE_VOLUNTEER_START
    };
}

export const deleteVolunteerSuccess = (status) => {
    return {
        type: actionTypes.DELETE_VOLUNTEER_SUCCESS,
        status: status
    };
}

export const deleteVolunteerFail = (error) => {
    return {
        type: actionTypes.DELETE_VOLUNTEER_FAIL,
        error: error
    };
}

export const deleteVolunteer = (volunteerId, token) => {
    return dispatch => {
        dispatch(deleteVolunteerStart());
        const url = `http://127.0.0.1:8000/requests/volunteering/${volunteerId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.delete(url, config)
            .then(response => {
                const status = response.request.status;
                dispatch(deleteVolunteerSuccess(status));
                dispatch(setAlert(`Your volunteer #${volunteerId} has been canceled, the corresponding request will be available for all volunteers`, "warning"));
            })
            .catch(error => {
                dispatch(deleteVolunteerFail(error));
                dispatch(setAlert(`Failed to cancel volunteer #${volunteerId} data from server`, "danger"));
            })
    }
};

//UPDATE VOLUNTEER
export const updateVolunteerStart = () => {
    return {
        type: actionTypes.UPDATE_VOLUNTEER_START
    };
}

export const updateVolunteerSuccess = (status) => {
    return {
        type: actionTypes.UPDATE_VOLUNTEER_SUCCESS,
        status: status
    };
}

export const updateVolunteerFail = (error) => {
    return {
        type: actionTypes.UPDATE_VOLUNTEER_FAIL,
        error: error
    };
}


export const updateVolunteer = ({ volunteerId, requestId }, token) => {
    return dispatch => {
        dispatch(updateVolunteerStart());
        const url = `http://127.0.0.1:8000/requests/volunteering/${volunteerId}/`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const body = {
            request: requestId,
            status: "Delivered"
        }
        axios.put(url, body, config)
            .then(response => {
                const status = response.request.status;
                dispatch(updateVolunteerSuccess(status));
                dispatch(fetchVolunteerDetail(volunteerId, token));
                dispatch(setAlert(`Successfully confirmed delivery for request #${requestId}.`, "success"));
                dispatch(setAlert("Please fill out reimbursement form if needed.", "info"))
            })
            .catch(error => {
                dispatch(updateVolunteerFail(error));
                dispatch(setAlert(`Failed to update delivery status for request #${requestId}`, "danger"));
            })
    }
};



