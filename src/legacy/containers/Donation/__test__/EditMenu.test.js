import React from 'react'
import { shallow } from 'enzyme'
import { EditMenu } from '..'

describe('EditMenu', () => {
    it('should render correctly without props', () => {
        const component = shallow(<EditMenu />)
        expect(component).toMatchSnapshot()
    })
})
