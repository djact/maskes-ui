import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
    navId: '',
    subNavId: '',
}

const getNavId = (state, action) => {
    return updateObject(state, { navId: action.navId })
}

const getSubNavId = (state, action) => {
    return updateObject(state, { subNavId: action.subNavId })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NAVID: return getNavId(state, action);
        case actionTypes.GET_SUB_NAVID: return getSubNavId(state, action);
        default: return state;
    }
}

export default reducer;