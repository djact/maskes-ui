import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onAuth } from '../../../components/Auth/store/actions/actions';
import VolunteerSignUpForm from '../../../components/Form/VolunteerSignUpForm';
import OfferSupportForm from '../../../components/Form/RequestForm/OfferSupportForm';
import PropTypes from 'prop-types';

const SignUp = (props) => {
	const hasAccount = false;
	const is_volunteer = true;
	const is_requester = false;

	const { onAuth, isAuthenticated, error } = props;

	const handleSubmit = async (data) =>
		await onAuth(
			data.first_name,
			data.last_name,
			data.display_name,
			data.email,
			data.password,
			hasAccount,
			is_requester,
			is_volunteer,
			data.volunteerInfo
		);

	const [volunteerInfo, setVolunteerInfo] = useState();
	const [next, setNext] = useState(false);

	return isAuthenticated ? (
		<Redirect to="/volunteer" />
	) : (
		<React.Fragment>
			{next ? (
				<VolunteerSignUpForm
					handleSubmit={handleSubmit}
					setNext={setNext}
					setVolunteerInfo={setVolunteerInfo}
					volunteerInfo={volunteerInfo}
					error={error}
				/>
			) : (
				<OfferSupportForm
					setNext={setNext}
					setVolunteerInfo={setVolunteerInfo}
					volunteerInfo={volunteerInfo}
				/>
			)}
		</React.Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.access !== null,
		error: state.auth.error
	};
};

SignUp.propTypes = {
	onAuth: PropTypes.func,
	error: PropTypes.object,
	isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, { onAuth })(SignUp);
