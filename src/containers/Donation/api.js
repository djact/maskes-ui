import axios from '../../shared/axios';

const getPublicStripeKey = async () => {
	const url = '/funds/donation/public-key/';
	try {
		const res = await axios.get(url);
		return res.status === 200 && res.data.publicKey;
	} catch (err) {
		console.log('API error:', { err });
		throw Error('API Error');
	}
};

const createCheckoutSession = async (amount, requestId) => {
	const url = '/funds/donation/create-checkout-session/';
	const body = {
		amount: amount,
		requestId: requestId
	};
	try {
		const res = await axios.post(url, body);
		return res.status === 200 && res.data;
	} catch (err) {
		console.log('API error:', { err });
		throw Error('API Error');
	}
};

const api = {
	getPublicStripeKey: getPublicStripeKey,
	createCheckoutSession: createCheckoutSession
};

export default api;
