import React from 'react'
import { shallow } from 'enzyme'
import { Auth } from '..'

describe('Test Auth Component', () => {
    it('should shallow render correctly Auth component', () => {
        const AuthComponent = shallow(<Auth />)
        expect(AuthComponent).toMatchSnapshot()
    })
})
