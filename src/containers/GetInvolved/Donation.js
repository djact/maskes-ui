import React from 'react';
import { Container } from 'react-bootstrap';
import { FaCommentDollar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { ListRow } from './GetInvolved';

const Donation = () => {
	return (
		<Container className="mt-5">
			<h3>Join The Admin Team</h3>
			<hr />

			<ListRow
				title="Donation"
				path=""
				icon={
					<FaCommentDollar style={{ fontSize: '5rem', color: '#f7b015' }} />
				}
			>
				We are completely community funded! Can you make recurring donations to
				us on our Patreon? Please share our Patreon with your family, friends
				and network. \nhttps://www.patreon.com/skcemutualaid \n Donation via
				this website is being developed
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

export default Donation;
