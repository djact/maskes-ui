import React from 'react'
import { shallow } from 'enzyme'
import { Logout } from '..'

describe('Test Logout Component', () => {
    it('should shallow render correctly Logout component', () => {
        const LogoutComponent = shallow(<Logout />)
        expect(LogoutComponent).toMatchSnapshot()
    })
})
