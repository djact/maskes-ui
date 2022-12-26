import * as actionTypes from './actionTypes'
import axios from '../../../../shared/axios'
import { fetchVolunteerRequests } from '../../../../containers/Volunteer/VolunteerList/store/actions/actions'
import { fetchRequests } from '../../../../containers/Requests/RequestList/store/actions/actions'
import { setAlert } from '../../../Alert/store/actions/actions'

export const openAuthModal = () => ({
    type: actionTypes.OPEN_AUTH_MODAL,
})

export const hideAuthModal = () => ({
    type: actionTypes.HIDE_AUTH_MODAL,
})

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access: payload.access,
        is_requester: payload.is_requester,
        is_volunteer: payload.is_volunteer,
        name: payload.name,
        user_id: payload.user_id,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logoutSuccess = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('is_requester')
    localStorage.removeItem('is_volunteer')
    localStorage.removeItem('name')
    localStorage.removeItem('user_id')
    localStorage.removeItem('refresh')
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const logout = () => {
    return (dispatch) => {
        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV === 'development') {
            dispatch(logoutSuccess())
        } else {
            axios
                .post('/blacklist/', {
                    refresh: localStorage.getItem('refresh'),
                })
                .then(() => {
                    dispatch(logoutSuccess())
                })
                .catch(() => {
                    dispatch(logoutSuccess())
                })
        }
    }
}

const setLocalStorageAndAxios = (data) => {
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    localStorage.setItem('is_requester', data.is_requester)
    localStorage.setItem('is_volunteer', data.is_volunteer)
    localStorage.setItem('name', data.first_name)
    localStorage.setItem('user_id', data.user_id)
    axios.defaults.headers['Authorization'] = 'Bearer ' + data.access
}

export const onAuth = (
    first_name,
    last_name,
    display_name,
    email,
    password,
    hasAccount,
    is_requester,
    is_volunteer,
    volunteerInfo
) => {
    return async (dispatch) => {
        dispatch(authStart())

        const config = {
            headers: { 'Content-Type': 'application/json' },
        }
        const body = {
            first_name: first_name,
            last_name: last_name,
            display_name: display_name,
            email: email,
            password: password,
            is_requester: is_requester,
            is_volunteer: is_volunteer,
        }

        let url = '/auth/jwt/create/'

        if (hasAccount) {
            axios
                .post(url, body, config)
                .then((res) => {
                    setLocalStorageAndAxios(res.data)
                    dispatch(authSuccess(res.data))
                    dispatch(hideAuthModal())
                })
                .catch((err) => {
                    if (err.isAxiosError) {
                        err.msg =
                            'Login Failed. Cannot connect to server, please try again later'
                    }
                    dispatch(authFail(err))
                })
        } else {
            url = '/users/'
            if (is_volunteer) {
                body.volunteer_info = volunteerInfo
            }
            axios
                .post(url, body, config)
                .then(() => {
                    url = '/auth/jwt/create/'
                    axios
                        .post(url, body, config)
                        .then((res) => {
                            setLocalStorageAndAxios(res.data)
                            dispatch(authSuccess(res.data))
                            dispatch(hideAuthModal())
                            if (res.data.is_volunteer) {
                                dispatch(fetchVolunteerRequests())
                            }
                            if (res.data.is_requester) {
                                dispatch(fetchRequests())
                            }
                        })
                        .catch((err) => {
                            dispatch(authFail(err))
                            dispatch(
                                setAlert(
                                    'Failed to login. please try again later',
                                    'danger'
                                )
                            )
                        })
                })
                .catch((err) => {
                    dispatch(authFail(err))
                    dispatch(
                        setAlert(
                            'Failed to signup, please try again later',
                            'danger'
                        )
                    )
                })
        }
    }
}

export const authCheckLoginState = () => {
    return (dispatch) => {
        const access = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')
        const payload = {
            access: access,
            refresh: refresh,
            is_requester: localStorage.getItem('is_requester') === 'true',
            is_volunteer: localStorage.getItem('is_volunteer') === 'true',
            name: localStorage.getItem('name'),
            user_id: localStorage.getItem('user_id'),
        }
        if (access) {
            dispatch(authSuccess(payload))
        }
    }
}

export const devLogin = () => {
    return (dispatch) => {
        dispatch(authStart())
        const responseData = {
            access: 'developer dummy access token',
            refresh: 'developer dummy refresh token',
            is_requester: true,
            is_volunteer: true,
            name: 'developer',
            user_id: 'developerID',
        }
        setLocalStorageAndAxios(responseData)
        dispatch(authSuccess(responseData))
        dispatch(hideAuthModal())
    }
}
