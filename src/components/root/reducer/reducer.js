import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
    navId: '',
}

const getNavId = (state, action) => {
    return updateObject(state, { navId: action.navId })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NAVID: return getNavId(state, action);
        default: return state;
    }
}

export default reducer;