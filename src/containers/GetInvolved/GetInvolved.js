import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHandsHelping, FaUsers, FaCommentDollar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const GetInvolved = () => {
	return (
		<Container className="mt-5">
			<h3>Get Involved</h3>
			<hr />

			<Row className="p-2">
				“Mutual aid is “cooperation for the sake of the common good.” It’s
				getting people to come together to meet each other’s needs, recognizing
				that as humans, our survival is dependent on one another.“ - Mariame
				Kaba
			</Row>

			<Row className="p-2">
				<Card.Text>
					We center our work in abolition, that those most harmed by systems of
					power must be centered in creating new ways of caring for each other,
					and that our liberation AND our wellbeing are interconnected.
				</Card.Text>
			</Row>

			<ListRow
				title="Volunteer"
				path="/volunteer/signup"
				icon={<FaHandsHelping style={{ fontSize: '5rem', color: 'maroon' }} />}
			>
				We want to build towards a future of care and safety with you! To get
				involved as a supporter, please fill out our “Offer Support” form! \n
				Once you fill out our form, you will be able to support our essential
				item and grocery delivery program. You can sign up to be a shopper, or
				donate to particular grocery deliveries. You do not need to use your own
				money to buy groceries, as our collective will reimburse you
			</ListRow>

			<ListRow
				title="Join The Admin Team"
				path="/get-involved/admin-team"
				icon={<FaUsers style={{ fontSize: '5rem', color: 'teal' }} />}
			>
				We looking for volunteers who would be able to offer skills in
				researching resources, collecting supplies, emotional support, social
				media, volunteer coordination, coordinating requests for support
			</ListRow>

			<ListRow
				title="Donation"
				path="/get-involved/donation"
				icon={
					<FaCommentDollar style={{ fontSize: '5rem', color: '#f7b015' }} />
				}
			>
				We are completely community funded! Can you make recurring donations to
				us on our Patreon? Please share our Patreon with your family, friends
				and network. \nhttps://www.patreon.com/skcemutualaid
			</ListRow>

			<Row className="p-2">
				To share events and resources with neighbors virtually, join our
				facebook group.{' '}
				<a href="https://www.facebook.com/groups/555635161739149/">
					www.facebook.com/groups/555635161739149/
				</a>{' '}
				Once you answer the membership questions, an admin will approve you and
				your posts. We encourage you to offer items (like books) or other forms
				of support (like math tutoring or dog walking) through our facebook
				group.
			</Row>

			<Row className="p-2">
				<Card.Text>
					Do you want to organize a mutual aid project in your area? Host a
					supply drive, a community pantry event, or fundraiser or have any
					questions? Please email us at{' '}
					<a href="mailto:covid19mutualaideastside@gmail.com">
						covid19mutualaideastside@gmail.com
					</a>
				</Card.Text>
			</Row>
		</Container>
	);
};

export const ListRow = (props) => {
	const { title, children, path, icon } = props;
	const history = useHistory();
	const content = children.split('\\n');
	return (
		<Row className="p-2">
			<Col
				md="auto"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: '15px'
				}}
			>
				{icon}
			</Col>
			<Col>
				<Card style={{ border: 'none' }}>
					<Card.Body>
						<Card.Title style={{ fontWeight: 'bold' }}>{title}</Card.Title>
						{content.map((item, idx) =>
							item.slice(0, 4) === 'http' ? (
								<div key={idx}>
									<Button
										style={{ margin: 0, padding: 0 }}
										variant="link"
										onClick={() => window.open(item, '_blank')}
									>
										{item}
									</Button>
								</div>
							) : (
								<Card.Text key={idx} className="mt-2">
									{item}
								</Card.Text>
							)
						)}

						{history.location.pathname === '/get-involved' && (
							<Button
								className="mt-2"
								variant="secondary"
								onClick={() => history.push(path)}
							>
								Learn More
							</Button>
						)}
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

ListRow.propTypes = {
	title: PropTypes.string,
	children: PropTypes.string,
	path: PropTypes.string,
	history: PropTypes.object,
	icon: PropTypes.object
};

export default GetInvolved;
