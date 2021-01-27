import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import donationAPI from './api';

const stripePromise = donationAPI
	.getPublicStripeKey()
	.then((key) => loadStripe(key))
	.catch((err) => {
		console.log(err);
	});

const DonationForm = (props) => {
	const { setOnDonate, requestId } = props;
	const [donationAmount, setDonationAmount] = useState();
	const [error, setError] = useState();

	const handleClick = async (event) => {
		event.preventDefault();
		if (!donationAmount) {
			setError('Please input the amount you would like to donate');
			return;
		}

		const stripe = await stripePromise;

		const amount = parseInt(donationAmount) * 100;

		// Call backend to create the Checkout Session
		const session = await donationAPI.createCheckoutSession(amount, requestId);

		// When the donator clicks on the button, redirect them to Checkout.
		const result = await stripe.redirectToCheckout({
			sessionId: session.id
		});

		if (result.error) {
			console.log(result.error.message);
		}
	};

	const onChange = (e) => {
		setDonationAmount(e.target.value);
	};

	return (
		<Form onSubmit={handleClick} className="my-3">
			<h5 style={{ fontWeight: 'bold' }}>Donation Instruction</h5>
			<p>
				Please enter the amount you would like to donate and click on Checkout
				button. Then you will be redirect to checkout page via Square. If you
				have any question please contact our admins via{' '}
				<a href="mailto: skcemutualaid@gmail.com">skcemutualaid@gmail.com</a>
			</p>
			<p>Thank you for being an amazing supporter!</p>

			<InputGroup className="mb-2 mr-sm-2">
				<InputGroup.Prepend>
					<InputGroup.Text>$</InputGroup.Text>
				</InputGroup.Prepend>
				<Form.Control
					name="donation_amount"
					placeholder="Enter amount"
					type="number"
					min={0}
					step={0.01}
					max={999.99}
					onChange={onChange}
				/>
			</InputGroup>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<Button
				variant="secondary"
				onClick={() => {
					setDonationAmount(null);
					setOnDonate(false);
				}}
				className="mr-2"
			>
				Close
			</Button>
			<Button type="submit" role="link" className="my-2">
				Checkout
			</Button>
		</Form>
	);
};

export default DonationForm;

DonationForm.propTypes = {
	setOnDonate: PropTypes.func,
	requestId: PropTypes.number,
	create: PropTypes.func
};
