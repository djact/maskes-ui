import { LinkProps } from 'next/link'

export type NavLinkProps = LinkProps & {
    children?: React.ReactNode
    usergroup?: string
    auth?: boolean
}
