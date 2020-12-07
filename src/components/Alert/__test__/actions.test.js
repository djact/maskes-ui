import * as actions from '../store/actions/actions';
import * as types from '../store/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
	const id = 'randomID';
	const payload = {
		msg: 'test create alert',
		variant: 'info',
		id: id
	};
	const expectedCreateAlert = {
		type: types.SET_ALERT,
		payload: payload
	};

	const expectedRemoveAlert = {
		type: types.REMOVE_ALERT,
		alertId: id
	};

	it('should create an action to CREATE an alert', () => {
		expect(
			actions.createAlert(payload.msg, payload.variant, payload.id)
		).toEqual(expectedCreateAlert);
	});

	it('should create an action to REMOVE an alert', () => {
		expect(actions.removeAlert(id)).toEqual(expectedRemoveAlert);
	});
});
