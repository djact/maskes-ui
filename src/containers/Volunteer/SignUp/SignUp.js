import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onAuth } from '../../../components/Auth/store/actions/actions';
import VolunteerSignUpForm from '../../../components/Form/VolunteerSignUpForm';
import OfferSupportForm from '../../../components/Form/RequestForm/OfferSupportForm';
import PropTypes from 'prop-types';

const SignUp = (props) => {
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		display_name: '',
		email: '',
		password: ''
	});

	const hasAccount = false;
	const is_volunteer = true;
	const is_requester = false;

	const { first_name, last_name, display_name, email, password } = formData;
	const { onAuth, isLoading, isAuthenticated } = props;

	const onChange = (event) =>
		setFormData({ ...formData, [event.target.name]: event.target.value });

	const handleSubmit = (event) => {
		event.preventDefault();
		onAuth(
			first_name,
			last_name,
			display_name,
			email,
			password,
			hasAccount,
			is_requester,
			is_volunteer
		);
		createVolunteer(volunteerInfo);
	};

	const createVolunteer = (info) => {
		console.log(info);
	};

	const [volunteerInfo, setVolunteerInfo] = useState();
	const [next, setNext] = useState(false);

	return isAuthenticated ? (
		<Redirect to="/volunteer" />
	) : (
		<React.Fragment>
			{next ? (
				<VolunteerSignUpForm
					loading={isLoading}
					handleSubmit={handleSubmit}
					onChange={onChange}
				/>
			) : (
				<OfferSupportForm
					setNext={setNext}
					setVolunteerInfo={setVolunteerInfo}
				/>
			)}
		</React.Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		isLoading: state.auth.loading,
		isAuthenticated: state.auth.access !== null
	};
};

SignUp.propTypes = {
	onAuth: PropTypes.func,
	isLoading: PropTypes.bool,
	isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, { onAuth })(SignUp);
