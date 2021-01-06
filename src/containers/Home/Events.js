import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Container, Divider, Header, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from '../../shared/axios';
export const Events = () => {
	const history = useHistory();
	let mounted = useRef(false);

	const fetchEvents = useCallback(() => {
		const url = '/events/';
		axios.get(url).then((res) => {
			if (mounted.current) {
				setEvents(res.data.results);
			}
			return null;
		});
	}, []);

	useEffect(() => {
		mounted.current = true;
		fetchEvents();
		return () => (mounted.current = false);
	}, [fetchEvents]);

	const [events, setEvents] = useState();

	const recentEvents = [];
	const upcomingEvents = [];

	if (events) {
		events.forEach((event) => {
			const singleEvent = (
				<div key={event.id}>
					<Header as="h3" style={{ fontSize: '2em' }}>
						{event.title}
					</Header>
					<h3>
						{new Date(event.event_date).toDateString()}{' '}
						{new Date(event.event_date).toLocaleTimeString('en-US')}
					</h3>
					<h5>{event.description}</h5>
					<p
						style={{ fontSize: '1.2em' }}
						dangerouslySetInnerHTML={{ __html: `${event.content}` }}
					/>
					<Button
						as="a"
						size="large"
						onClick={() => history.push(`/events/${event.id}`)}
					>
						Learn More
					</Button>
				</div>
			);

			if (new Date(event.event_date) > new Date()) {
				upcomingEvents.push(singleEvent);
			} else {
				recentEvents.push(singleEvent);
			}
		});
	}

	return (
		<React.Fragment>
			<Segment style={{ padding: '8em 0em' }} vertical>
				<Container text>
					{upcomingEvents.length > 0 && (
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{ margin: '3em 0em', textTransform: 'uppercase' }}
						>
							Upcoming Events
						</Divider>
					)}
					{upcomingEvents}

					{recentEvents.length > 0 && (
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{ margin: '3em 0em', textTransform: 'uppercase' }}
						>
							Recent Events
						</Divider>
					)}
					{recentEvents}
				</Container>
			</Segment>
		</React.Fragment>
	);
};

export default Events;
