import * as actions from '../store/actions/actions';
import * as types from '../store/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockAxios from 'axios';

describe('TEST REDUX DONATION ACTIONS', () => {
	const id = 'randomID';
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	const store = mockStore();

	const mockData = {
		data: 'testvalue'
	};

	it('successfully fetch donation', async () => {
		mockAxios.get.mockResolvedValue(mockData);
		return store.dispatch(actions.fetchDonation(id)).then(() => {
			const mockActions = store.getActions();
			expect(mockActions[1]).toEqual(
				actions.fetchDonationSuccess(mockData.data)
			);
			store.clearActions();
		});
	});

	it('fail to fetch donation', () => {
		const networkError = new Error('Some network error');
		mockAxios.get.mockRejectedValueOnce(networkError);
		return store.dispatch(actions.fetchDonation(id)).then(() => {
			const mockActions = store.getActions();
			expect(mockActions[1]).toEqual(actions.fetchDonationFail(networkError));
		});
	});
});
