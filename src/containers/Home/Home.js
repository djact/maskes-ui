import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { openAuthModal } from '../../components/Auth/store/actions/actions';
import { withRouter } from 'react-router-dom';

import {
	Button,
	Container,
	Grid,
	Header,
	Icon,
	Image,
	Responsive,
	Segment,
	Visibility
} from 'semantic-ui-react';
import { Events } from './Events';
import skesma1 from '../../assets/images/skesma-1.jpg';

const HomepageHeading = ({ mobile, isAuthenticated, openAuthModal }) => (
	<div className="waveWrapper waveAnimation">
		<div className="waveHeadWrapperInner headerContent">
			<Container className="waveHeader" text>
				<Header
					as="h3"
					content="Mutual Aid South King County & Eastside"
					inverted
					style={{
						fontSize: mobile ? '2.1em' : '4em',
						fontWeight: 'normal',
						marginBottom: '1em',
						marginTop: mobile ? '0.7em' : '1.3em'
					}}
				/>

				{!isAuthenticated && (
					<Button
						inverted
						color="yellow"
						size={mobile ? 'small' : 'huge'}
						onClick={openAuthModal}
					>
						Sign Up
						<Icon name="right arrow" />
					</Button>
				)}
			</Container>
		</div>
		<div className="waveWrapperInner bgTop">
			<div className="wave waveTop"></div>
		</div>
		<div className="waveWrapperInner bgMiddle">
			<div className="wave waveMiddle"></div>
		</div>
		<div className="waveWrapperInner bgBottom">
			<div className="wave waveBottom"></div>
		</div>
	</div>
);

HomepageHeading.propTypes = {
	mobile: PropTypes.bool
};

class DesktopContainer extends Component {
	state = {};
	render() {
		const { children, isAuthenticated, openAuthModal } = this.props;

		return (
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Visibility once={false}>
					<Segment
						inverted
						textAlign="center"
						style={{
							minHeight: 700,
							padding: '1em 0em',
							background: 'transparent'
						}}
						vertical
					>
						<HomepageHeading
							isAuthenticated={isAuthenticated}
							openAuthModal={openAuthModal}
						/>
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		);
	}
}

DesktopContainer.propTypes = {
	children: PropTypes.node
};

class MobileContainer extends Component {
	render() {
		const { children, isAuthenticated, openAuthModal } = this.props;

		return (
			<Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
				<Segment
					inverted
					textAlign="center"
					style={{ minHeight: 350, padding: '1em 0em' }}
					vertical
				>
					<HomepageHeading
						mobile
						isAuthenticated={isAuthenticated}
						openAuthModal={openAuthModal}
					/>
				</Segment>

				{children}
			</Responsive>
		);
	}
}

MobileContainer.propTypes = {
	children: PropTypes.node
};

const ResponsiveContainer = ({ children, openAuthModal, isAuthenticated }) => (
	<div>
		<DesktopContainer
			openAuthModal={openAuthModal}
			isAuthenticated={isAuthenticated}
		>
			{children}
		</DesktopContainer>
		<MobileContainer
			openAuthModal={openAuthModal}
			isAuthenticated={isAuthenticated}
		>
			{children}
		</MobileContainer>
	</div>
);

ResponsiveContainer.propTypes = {
	children: PropTypes.node
};

const Home = withRouter(({ openAuthModal, isAuthenticated, history }) => (
	<ResponsiveContainer
		openAuthModal={openAuthModal}
		isAuthenticated={isAuthenticated}
	>
		<Segment style={{ padding: '4em 0em' }} vertical>
			<Grid container stackable verticalAlign="middle">
				<Grid.Row style={{ padding: '2em' }}>
					<Grid.Column width={10}>
						<Header as="h3" style={{ fontSize: '2em' }}>
							What is SKC & E Mutual Aid
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							We are a collective of people from neighborhoods and communities
							within the region of South King County and the Eastside building
							community care and power. We formed at the begining of the
							COVID-19 pandemic to provide support to those impacted by the
							pandemic.
						</p>
						<p style={{ fontSize: '1.33em' }}>
							We share resources, support survivors in safety planning, and work
							to provide basic need to folks. This include groceries, help
							paying bills, and forming fundraisers when asked.
						</p>
						<p style={{ fontSize: '1.33em' }}>
							We center our work in abolition, that those most harmed by systems
							of power must be centered in creating new ways of caring for each
							other, and that our liberation and our wellbeing are
							interconnected.
						</p>
						<Header as="h3" style={{ fontSize: '2em', color: '#b8597b' }}>
							We Need Your Support
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							We want to build towards a future of care and safety with you! To
							get involved as a supporter, please fill out our “Offer Support”
							form!
						</p>
						<Button
							className="check-it-out"
							size="big"
							onClick={() => history.push('/get-involved/signup')}
						>
							Offer Support Form
						</Button>
					</Grid.Column>
					<Grid.Column
						floated="right"
						width={6}
						style={{
							marginLeft: 0,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Image bordered rounded size="large" src={skesma1} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>

		<Segment style={{ padding: '0em' }} vertical>
			<Grid celled="internally" columns="equal" stackable>
				<Grid.Row textAlign="center">
					<Grid.Column
						style={{
							paddingBottom: '5em',
							paddingTop: '5em',
							paddingLeft: '2em'
						}}
					>
						<Header as="h3" style={{ fontSize: '3em', color: '#006b5b' }}>
							$10,790
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							In groceries paid through fundraising.
						</p>
					</Grid.Column>
					<Grid.Column
						style={{
							paddingBottom: '5em',
							paddingTop: '5em',
							paddingRight: '2em'
						}}
					>
						<Header as="h3" style={{ fontSize: '3em', color: '#006b5b' }}>
							$17,804
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							In cash support covered by a shopper or offered by a community
							member to cover a requested shopping trip.
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>

		<Events />
	</ResponsiveContainer>
));

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.access !== null
	};
};
export default connect(mapStateToProps, { openAuthModal })(Home);
