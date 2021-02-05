import React from 'react';
import { shallow } from 'enzyme';
import { Donation } from '..';

describe('Donation', () => {
	it('should render correctly without props', () => {
		const component = shallow(<Donation />);
		expect(component).toMatchSnapshot();
	});
});
