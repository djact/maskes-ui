import * as actionTypes from './actionTypes'
import axios from '../../../../../shared/axios'
import { setAlert } from '../../../../../components/Alert/store/actions/actions'
import { fetchRequests } from '../../../RequestList/store/actions/actions'

export const fetchRequestDetailStart = () => {
    return {
        type: actionTypes.FETCH_REQUEST_DETAIL_START,
    }
}

export const fetchRequestDetailSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_REQUEST_DETAIL_SUCCESS,
        payload: payload,
    }
}

export const fetchRequestDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_REQUEST_DETAIL_FAIL,
        error: error,
    }
}

export const fetchRequestDetail = (requestId) => {
    return (dispatch) => {
        dispatch(fetchRequestDetailStart())
        const url = `/requests/requester/${requestId}/`

        axios
            .get(url)
            .then((response) => {
                const payload = response.data
                dispatch(fetchRequestDetailSuccess(payload))
            })
            .catch((error) => {
                dispatch(fetchRequestDetailFail(error))
                dispatch(setAlert('Failed to fetch data from server', 'danger'))
            })
    }
}

// DELETE REQUEST
export const deleteRequestStart = () => {
    return {
        type: actionTypes.DELETE_REQUEST_START,
    }
}

export const deleteRequestSuccess = () => {
    return {
        type: actionTypes.DELETE_REQUEST_SUCCESS,
    }
}

export const deleteRequestFail = (error) => {
    return {
        type: actionTypes.DELETE_REQUEST_FAIL,
        error: error,
    }
}

export const deleteRequest = (requestId) => {
    return (dispatch) => {
        dispatch(deleteRequestStart())
        const url = `/requests/requester/${requestId}/`

        axios
            .delete(url)
            .then((response) => {
                dispatch(deleteRequestSuccess())
                dispatch(fetchRequests(1))
                dispatch(
                    setAlert(
                        `Request #${requestId} successfully deleted`,
                        'success'
                    )
                )
            })
            .catch((error) => {
                dispatch(deleteRequestFail(error))
                dispatch(
                    setAlert(
                        'Failed to delete a request, please try again',
                        'danger'
                    )
                )
            })
    }
}

// UPDATE REQUEST
export const updateRequestStart = () => {
    return {
        type: actionTypes.UPDATE_REQUEST_START,
    }
}

export const updateRequestSuccess = (payload) => {
    return {
        type: actionTypes.UPDATE_REQUEST_SUCCESS,
        payload: payload,
    }
}

export const updateRequestFail = (error) => {
    return {
        type: actionTypes.UPDATE_REQUEST_FAIL,
        error: error,
    }
}

export const updateRequest = (requestId, body) => {
    return (dispatch) => {
        dispatch(updateRequestStart())
        const url = `/requests/requester/${requestId}/`

        axios
            .put(url, body)
            .then((response) => {
                dispatch(updateRequestSuccess(response.data))
                dispatch(fetchRequests(1))
                dispatch(
                    setAlert(
                        `Request #${requestId} successfully updated`,
                        'success'
                    )
                )
            })
            .catch((error) => {
                dispatch(updateRequestFail(error))
                dispatch(
                    setAlert(
                        'Failed to update a request, please try again',
                        'danger'
                    )
                )
            })
    }
}
