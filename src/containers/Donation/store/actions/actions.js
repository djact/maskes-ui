import { setAlert } from '../../../../components/Alert/store/actions/actions';
import * as actionTypes from './actionTypes';
import axios from '../../../../shared/axios';

//FETCH DONATION
export const fetchDonationStart = () => {
	return {
		type: actionTypes.FETCH_DONATION_START
	};
};

export const fetchDonationSuccess = (payload) => {
	return {
		type: actionTypes.FETCH_DONATION_SUCCESS,
		payload: payload
	};
};

export const fetchDonationFail = (error) => {
	return {
		type: actionTypes.FETCH_DONATION_FAIL,
		error: error
	};
};

export const fetchDonation = (requestId) => {
	return (dispatch) => {
		dispatch(fetchDonationStart());
		const url = `/funds/donation-list/${requestId}/`;
		return axios
			.get(url)
			.then((response) => {
				const payload = response.data;
				dispatch(fetchDonationSuccess(payload));
			})
			.catch((error) => {
				dispatch(fetchDonationFail(error));
				dispatch(
					setAlert('Failed to fetch donation data from server', 'danger')
				);
			});
	};
};

//DELETE DONATION

export const deleteDonationStart = () => {
	return {
		type: actionTypes.DELETE_DONATION_START
	};
};

export const deleteDonationSuccess = (status) => {
	return {
		type: actionTypes.DELETE_DONATION_SUCCESS,
		status: status
	};
};

export const deleteDonationFail = (error) => {
	return {
		type: actionTypes.DELETE_DONATION_FAIL,
		error: error
	};
};

export const deleteDonation = (donationId, requestId) => {
	return (dispatch) => {
		dispatch(deleteDonationStart());
		const url = `/funds/donation/${donationId}/`;

		axios
			.delete(url)
			.then((response) => {
				const status = response.status;
				dispatch(deleteDonationSuccess(status));
				dispatch(fetchDonation(requestId));
				dispatch(
					setAlert(`Your donation #${donationId} has been canceled`, 'warning')
				);
			})
			.catch((error) => {
				dispatch(deleteDonationFail(error));
				dispatch(
					setAlert(`Failed to cancel donation #${donationId}`, 'danger')
				);
			});
	};
};

//UPDATE DONATION
export const updateDonationStart = () => {
	return {
		type: actionTypes.UPDATE_DONATION_START
	};
};

export const updateDonationSuccess = (status) => {
	return {
		type: actionTypes.UPDATE_DONATION_SUCCESS,
		status: status
	};
};

export const updateDonationFail = (error) => {
	return {
		type: actionTypes.UPDATE_DONATION_FAIL,
		error: error
	};
};

export const updateDonation = (formData, requestId, donationId) => {
	return (dispatch) => {
		dispatch(updateDonationStart());
		const url = `/funds/donation/${donationId}/`;

		const { update_amount, update_status } = formData;
		const body = {
			amount: update_amount,
			status: update_status ? 'Sent' : 'Pending',
			request: requestId
		};

		axios
			.put(url, body)
			.then((response) => {
				const status = response.status;
				const requestId = response.data.request;
				dispatch(updateDonationSuccess(status));
				dispatch(fetchDonation(requestId));
				dispatch(setAlert(`Donation #${donationId} updated.`, 'success'));
			})
			.catch((error) => {
				dispatch(updateDonationFail(error));
				dispatch(
					setAlert(`Failed to update donation #${donationId}`, 'danger')
				);
			});
	};
};

//CREATE DONATION
export const createDonationStart = () => {
	return {
		type: actionTypes.CREATE_DONATION_START
	};
};

export const createDonationSuccess = (status) => {
	return {
		type: actionTypes.CREATE_DONATION_SUCCESS,
		status: status
	};
};

export const createDonationFail = (error) => {
	return {
		type: actionTypes.CREATE_DONATION_FAIL,
		error: error
	};
};

export const createDonation = (formData, requestId) => {
	return (dispatch) => {
		dispatch(createDonationStart());
		const url = '/funds/donation/';
		const { donation_amount, donation_status } = formData;
		const body = {
			amount: donation_amount,
			status: donation_status ? 'Sent' : 'Pending',
			request: requestId
		};
		axios
			.post(url, body)
			.then((response) => {
				const donationId = response.data.id;
				dispatch(createDonationSuccess(response.status));
				dispatch(
					setAlert(
						`Successfully create donation #${donationId}. Thank you for your support!`,
						'success'
					)
				);
				dispatch(fetchDonation(requestId));
			})
			.catch((error) => {
				dispatch(createDonationFail(error));
				dispatch(setAlert('Failed to create donation', 'danger'));
			});
	};
};
