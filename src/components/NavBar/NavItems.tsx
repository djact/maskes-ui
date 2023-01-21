import { Flex, FlexProps } from '@aws-amplify/ui-react'
import { NavLink } from './NavLink'

const NavItems = (props: FlexProps) => {
    return (
        <Flex {...props}>
            <NavLink href="/">Home</NavLink>
            <NavLink auth href="/requests">
                Requests
            </NavLink>
            <NavLink auth href="/volunteer" usergroup="volunteer">
                Volunteer
            </NavLink>
            <NavLink auth href="/admin" usergroup="admin">
                Admin
            </NavLink>
        </Flex>
    )
}

export default NavItems
