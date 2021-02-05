import * as actions from '../store/actions/actions';
import * as types from '../store/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TEST REDUX ALERT ACTIONS', () => {
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

	it('should create an actions to CREATE & REMOVE an alert', () => {
		const initialState = [];
		const store = mockStore(initialState);
		// dispatch create Alert
		store.dispatch(
			actions.createAlert(payload.msg, payload.variant, payload.id)
		);
		// dispatch remove Alert
		store.dispatch(actions.removeAlert(payload.id));
		const mockActions = store.getActions();
		expect(mockActions).toEqual([expectedCreateAlert, expectedRemoveAlert]);
	});

	it('should execute set Alert', () => {
		const store = mockStore([]);
		return store
			.dispatch(actions.setAlert(payload.msg, payload.variant, payload.id))
			.then(() => {
				const mockActions = store.getActions();
				expect(mockActions).toEqual([
					actions.createAlert(payload.msg, payload.variant, payload.id),
					actions.removeAlert(payload.id)
				]);
			});
	});
});
