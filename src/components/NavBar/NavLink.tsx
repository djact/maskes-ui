import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NavLinkProps } from './types'
import { useAuthGroup } from './useAuthGroup'
import { Text } from '@aws-amplify/ui-react'

export const NavLink = (props: NavLinkProps) => {
    const { children, usergroup, auth, href, ...rest } = props
    console.log()
    const authGroup = useAuthGroup(usergroup)

    const router = useRouter()
    const [index, setIndex] = useState<number>()

    const active = href === router.pathname || undefined

    if (auth && !authGroup) return null

    return (
        <NextLink {...rest} href={href} style={{ all: 'unset' }}>
            <Text
                fontWeight={active && 'bold'}
                textDecoration={active && 'underline'}
                variation={active && 'info'}
                display="flex"
                style={{
                    textUnderlineOffset: '0.7rem',
                    // fontWeight: index === i ? 'bold' : undefined,
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                // onMouseEnter={(e) => setIndex(i)}
                // onMouseLeave={(e) => setIndex(undefined)}
                minWidth="5.5rem"
                minHeight="2.5rem"
            >
                {children}
            </Text>
        </NextLink>
    )
}

export default NavLink
