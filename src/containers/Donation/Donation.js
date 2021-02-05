import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDonation } from './store/actions/actions';
import './Donation.css';
import { Badge, Table, Button, Spinner, ProgressBar } from 'react-bootstrap';
import { FaDonate } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux/Aux';
import DonationForm from './DonationForm';

export const Donation = (props) => {
	const {
		donation,
		loading,
		requestId,
		budget,
		fetchDonation,
		reimbursementStatus
	} = props;
	const [onDonate, setOnDonate] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (requestId) {
			fetchDonation(requestId);
		}
	}, [fetchDonation, requestId]);

	let donation_progress;
	let display = <Spinner />;

	if (donation && !loading) {
		const total_donation = donation.reduce((t, d) => t + parseInt(d.amount), 0);
		let progress = Math.floor((total_donation / budget) * 100);
		progress = progress > 100 ? 100 : progress;
		donation_progress = (
			<ProgressBar
				variant={progress === 100 ? 'success' : 'primary'}
				animated
				now={progress}
				label={`${progress}%`}
			/>
		);

		display = (
			<Aux>
				<h5 style={{ fontWeight: 'bold' }}>Donation Infomation</h5>
				<Badge
					variant={reimbursementStatus === 'In Process' ? 'warning' : 'success'}
					className="mb-2"
				>
					{reimbursementStatus}
				</Badge>

				<h5 style={{ display: 'flex' }}>Budget: ${budget}</h5>
				{donation_progress}
				<Table size="sm" responsive="sm">
					<thead>
						<tr>
							<th>Donator</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{donation.map((d, idx) => (
							<tr key={idx}>
								<td
									className="l-button"
									onClick={() => history.push(`/profile/${d.donator.id}`)}
								>
									{d.donator.display_name}
								</td>
								<td>{d.amount}</td>
								<td>{d.status}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Aux>
		);
	}

	return (
		<Aux>
			{!onDonate ? (
				<Button
					size="lg"
					className="mt-1 mb-3 "
					variant="outline-primary donate-button"
					onClick={() => setOnDonate(true)}
				>
					Donate! <FaDonate className="mb-1" />
				</Button>
			) : (
				<DonationForm requestId={requestId} setOnDonate={setOnDonate} />
			)}
			{display}
		</Aux>
	);
};
const mapStateToProps = (state) => {
	return {
		donation: state.donation.donation,
		loading: state.donation.loading
	};
};

export default connect(mapStateToProps, { fetchDonation })(Donation);

Donation.propTypes = {
	donation: PropTypes.array,
	loading: PropTypes.bool,
	requestId: PropTypes.number,
	budget: PropTypes.number,
	fetchDonation: PropTypes.func,
	reimbursementStatus: PropTypes.string
};
