import {
    Divider,
    Flex,
    Heading,
    Pagination,
    TabItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    View,
} from '@aws-amplify/ui-react'
import { useState } from 'react'
import { AdminQueriesUserType, useAdminUser } from './useAdminUser'

const UserManager = () => {
    const message = 'USER MANAGEMENT'
    const [index, setIndex] = useState<string | number>(0)
    return (
        <View paddingInline="large">
            <Heading>{message}</Heading>
            <Divider orientation="horizontal" marginBlock="small" />

            <Tabs
                currentIndex={index}
                onChange={(i) => setIndex(i)}
                marginBlock="small"
            >
                <TabItem title="Admins">
                    <UserTable usergroup="admin" />
                </TabItem>
                <TabItem title="Volunteers">
                    <UserTable usergroup="volunteer" />
                </TabItem>
            </Tabs>
        </View>
    )
}

const usePaginate = (usergroup: string) => {
    const { fetchUsers, nextToken } = useAdminUser(usergroup)
    const [pageTokens, setPageTokens] = useState([nextToken])
    const [currentPageIndex, setCurrentPageIndex] = useState(1)
    const [hasMorePages, setHasMorePages] = useState(!!nextToken)
    const handleNextPage = async () => {
        if (hasMorePages && currentPageIndex === pageTokens.length) {
            await fetchUsers()
            if (!nextToken) {
                setHasMorePages(false)
            }

            setPageTokens([...pageTokens, nextToken])
        }

        setCurrentPageIndex(currentPageIndex + 1)
    }

    const onPrevious = () => setCurrentPageIndex(currentPageIndex - 1)
    const onChange = (pageIndex: number) => setCurrentPageIndex(pageIndex)
    const onNext = () => handleNextPage()
    const totalPages = pageTokens.length
    const currentPage = currentPageIndex
    return {
        onPrevious,
        onChange,
        onNext,
        totalPages,
        currentPage,
        hasMorePages,
    }
}

const UserTable = (props: { usergroup: string }) => {
    const { usergroup } = props
    const { users } = useAdminUser(usergroup)
    const {
        onPrevious,
        onChange,
        onNext,
        totalPages,
        currentPage,
        hasMorePages,
    } = usePaginate(usergroup)

    const userRowsDisplay = users.map((user, i) => {
        return <UserRow key={i} user={user} />
    })

    return (
        <View>
            <Flex justifyContent="right" paddingBlock="small">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasMorePages={hasMorePages}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    onChange={onChange}
                />
            </Flex>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell as="th">Email</TableCell>
                        <TableCell as="th">Created Date</TableCell>
                        <TableCell as="th">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{userRowsDisplay}</TableBody>
            </Table>
        </View>
    )
}

const UserRow = (props: { user: AdminQueriesUserType }) => {
    const { user } = props

    const { UserCreateDate, UserStatus, Attributes } = user
    const email = Attributes[2].Value
    const date = new Date(UserCreateDate).toLocaleString()

    return (
        <TableRow>
            <TableCell>{email}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{UserStatus}</TableCell>
        </TableRow>
    )
}

export default UserManager
