import * as actionTypes from './actionTypes';
import axios from 'axios';

// FETCH REQUESTS
export const fetchVolunteerRequestsStart = () => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUESTS_START
    };
}

export const fetchVolunteerRequestsSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUESTS_SUCCESS,
        payload: payload
    };
}

export const fetchVolunteerRequestsFail = (error) => {
    return {
        type: actionTypes.FETCH_VOLUNTEER_REQUESTS_FAIL,
        error: error
    };
}

export const fetchVolunteerRequests = (page, token, searchValues, isMyVolunteer) => {
    return dispatch => {
        dispatch(fetchVolunteerRequestsStart());

        let url = `http://127.0.0.1:8000/requests/volunteer/?page=${page}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        if (isMyVolunteer) {
            url = `http://127.0.0.1:8000/requests/volunteering/`;
            axios.get(url, config)
                .then(response => {
                    const payload = response.data;
                    dispatch(fetchVolunteerRequestsSuccess(payload))
                })
                .catch(error => {
                    dispatch(fetchVolunteerRequestsFail(error))
                })
        } else {
            axios.post(url, searchValues, config)
                .then(response => {
                    const payload = response.data;
                    dispatch(fetchVolunteerRequestsSuccess(payload))
                })
                .catch(error => {
                    dispatch(fetchVolunteerRequestsFail(error))
                })
        }


    }
};