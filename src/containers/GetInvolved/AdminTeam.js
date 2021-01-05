import React from 'react';
import { Container } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { ListRow } from './GetInvolved';

const AdminTeam = () => {
	return (
		<Container className="mt-5">
			<h3>Join The Admin Team</h3>
			<hr />

			<ListRow
				title="Join The Admin Team"
				icon={<FaUsers style={{ fontSize: '5rem', color: 'teal' }} />}
			>
				We looking for volunteers who would be able to offer skills in
				researching resources, collecting supplies, emotional support, social
				media, volunteer coordination, coordinating requests for support \n For
				coordinating requests, we are looking for volunteers who can: \n 1.
				Commit at least 6 hours per week for the first few weeks and then 2
				hours or more after for at least three months \n 2. Must have an
				understanding of transformative justice, abolition, emotional first aid,
				solidarity support, or take these necessary training that we share with
				you in the first couple of weeks of volunteering, \n 3. Attend weekly
				meetings and be committed to continued learning and struggle \n Please
				fill out our &quot;Offer Support Form&quot;, and provide your additional
				support skills in the corresponding sections.
			</ListRow>
		</Container>
	);
};

ListRow.propTypes = {
	title: PropTypes.string,
	children: PropTypes.string,
	path: PropTypes.string,
	history: PropTypes.object,
	icon: PropTypes.object
};

export default AdminTeam;
