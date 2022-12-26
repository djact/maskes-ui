import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../../../../shared/utility'

const initialState = {
    request: [],
    loading: false,
    name: '',
    error: null,
}

const fetchRequestDetailSuccess = (state, action) => {
    return updateObject(state, {
        request: action.payload,
        loading: false,
        name: action.payload.name,
        error: null,
    })
}

const fetchRequestDetailStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
}

const fetchRequestDetailFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
}

//UPDATE REQUEST
const updateRequestSuccess = (state, action) => {
    return updateObject(state, { loading: false, error: null })
}

const updateRequestStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
}

const updateRequestFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REQUEST_DETAIL_SUCCESS:
            return fetchRequestDetailSuccess(state, action)
        case actionTypes.FETCH_REQUEST_DETAIL_START:
            return fetchRequestDetailStart(state, action)
        case actionTypes.FETCH_REQUEST_DETAIL_FAIL:
            return fetchRequestDetailFail(state, action)

        case actionTypes.UPDATE_REQUEST_SUCCESS:
            return updateRequestSuccess(state, action)
        case actionTypes.UPDATE_REQUEST_START:
            return updateRequestStart(state, action)
        case actionTypes.UPDATE_REQUEST_FAIL:
            return updateRequestFail(state, action)

        default:
            return state
    }
}

export default reducer
