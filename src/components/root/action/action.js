import * as actionTypes from './actionTypes';

export const getNavId = (navId) => {
    return {
        type: actionTypes.GET_NAVID,
        navId: navId,
    }
}

export const getSubNavId = (subNavId) => {
    return {
        type: actionTypes.GET_SUB_NAVID,
        subNavId: subNavId,
    }
}