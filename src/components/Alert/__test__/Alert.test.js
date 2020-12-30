import React from 'react';
import { render, shallow } from 'enzyme';
import Alert from '../Alert';

describe('Alert', () => {
	it('should render correctly without props', () => {
		const component = shallow(<Alert />);
		expect(component).toMatchSnapshot();
	});

	it('should render correctly with passed in props', () => {
		const alertData = [
			{ id: '1', msg: 'danger alert', variant: 'danger' },
			{ id: '2', msg: 'success alert', variant: 'success' },
			{ id: '3', msg: 'warning alert', variant: 'warning' }
		];
		const component = render(<Alert alerts={alertData} />);
		expect(component).toMatchSnapshot();
	});
});
