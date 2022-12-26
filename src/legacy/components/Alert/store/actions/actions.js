import { v4 as uuid } from 'uuid'
import * as actionTypes from './actionTypes'

export const createAlert = (msg, variant, id = '') => {
    return {
        type: actionTypes.SET_ALERT,
        payload: { msg, variant, id },
    }
}

export const removeAlert = (id) => {
    return {
        type: actionTypes.REMOVE_ALERT,
        alertId: id,
    }
}

export const setAlert = (msg, variant, alertId = '') => {
    return (dispatch) => {
        const id = alertId || uuid()
        dispatch(createAlert(msg, variant, id))
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
        return wait(5000).then(() => dispatch(removeAlert(id)))
    }
}
