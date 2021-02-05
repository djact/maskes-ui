import React from 'react';
import { shallow } from 'enzyme';
import { EditDonationModal } from '..';

describe('EditDonationModal', () => {
	it('should render correctly without props', () => {
		const component = shallow(<EditDonationModal />);
		expect(component).toMatchSnapshot();
	});
});
