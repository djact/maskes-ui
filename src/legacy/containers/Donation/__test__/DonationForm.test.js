import React from 'react'
import { shallow } from 'enzyme'
import { DonationForm } from '..'

describe('DonationForm', () => {
    it('should render correctly without props', () => {
        const component = shallow(<DonationForm />)
        expect(component).toMatchSnapshot()
    })
})
