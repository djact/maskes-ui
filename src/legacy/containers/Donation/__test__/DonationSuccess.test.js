import React from 'react'
import { shallow } from 'enzyme'
import { DonationSuccess } from '..'

describe('DonationSuccess', () => {
    it('should render correctly without props', () => {
        const component = shallow(<DonationSuccess />)
        expect(component).toMatchSnapshot()
    })
})
