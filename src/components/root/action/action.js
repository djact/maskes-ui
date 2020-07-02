import * as actionTypes from './actionTypes';

export const getNavId = (navId) => {
    return {
        type: actionTypes.GET_NAVID,
        navId: navId,
    }
}