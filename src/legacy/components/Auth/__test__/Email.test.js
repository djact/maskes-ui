import React from 'react'
import { shallow } from 'enzyme'
import { EmailReset, EmailResetConfirm } from '..'

describe('Test Email Reset Components', () => {
    it('should shallow render correctly EmailReset', () => {
        const EmailResetComponent = shallow(<EmailReset />)
        expect(EmailResetComponent).toMatchSnapshot()
    })

    it('should shallow render correctly EmailResetConfirm', () => {
        const EmailResetConfirmComponent = shallow(<EmailResetConfirm />)
        expect(EmailResetConfirmComponent).toMatchSnapshot()
    })
})
