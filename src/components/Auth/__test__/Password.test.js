import React from 'react';
import { shallow } from 'enzyme';
import { PasswordReset, PasswordResetConfirm } from '..';

describe('Test Password Reset Components', () => {
	it('should shallow render correctly PasswordReset', () => {
		const PasswordResetComponent = shallow(<PasswordReset />);
		expect(PasswordResetComponent).toMatchSnapshot();
	});

	it('should shallow render correctly PasswordResetConfirm', () => {
		const PasswordResetConfirmComponent = shallow(<PasswordResetConfirm />);
		expect(PasswordResetConfirmComponent).toMatchSnapshot();
	});
});
