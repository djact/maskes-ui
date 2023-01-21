import { API, Auth } from 'aws-amplify'
import { useState } from 'react'
import { useQuery } from 'react-query'

export const useAdminUser = (usergroup: string, limit: number = 1) => {
    const [nextToken, setNextToken] = useState('')
    console.log('useAdminUser')
    const { data, refetch } = useQuery(
        usergroup,
        () => {
            console.log('fetching data... ', { usergroup, nextToken })
            return listUsersInGroup(limit, usergroup, nextToken)
        },
        {
            staleTime: 1000 * 60 * 5,
        }
    )

    const queryUser = async (
        path: string,
        data: any,
        method: string = 'get'
    ) => {
        let apiName = 'AdminQueries'
        let myInit = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: (await Auth.currentSession())
                    ?.getAccessToken()
                    ?.getJwtToken(),
            },
            ...data,
        }

        if (method === 'post') {
            return await API.post(apiName, path, myInit)
        }

        return await API.get(apiName, path, myInit)
    }

    const listUsersInGroup = async (
        limit: number,
        groupname: string,
        token: string = ''
    ): Promise<AdminQueriesUserType[]> => {
        let path = '/listUsersInGroup'
        const queryStringParameters = {
            groupname,
            limit,
            token,
        }

        const data = await queryUser(path, {
            queryStringParameters,
        })

        const { NextToken, Users } = data
        console.log(data)

        if (NextToken && NextToken !== token) {
            setNextToken(NextToken)
        }

        return Users
    }

    const addUserToGroup = async (username: string, groupname: string) => {
        const body = {
            username,
            groupname,
        }
        const path = '/addUserToGroup'
        console.log(await queryUser(path, { body }, 'post'))

        setNextToken('')
        refetch()
    }

    const removeUserFromGroup = async (username: string, groupname: string) => {
        const body = {
            username,
            groupname,
        }
        const path = '/removeUserFromGroup'
        console.log(await queryUser(path, { body }, 'post'))
        setNextToken('')
        refetch()
    }

    return {
        users: data || [],
        fetchUsers: refetch,
        nextToken,
        listUsersInGroup,
        addUserToGroup,
        removeUserFromGroup,
    }
}

export type AdminQueriesUserType = {
    Username: string
    Attributes: Array<{ Name: string; Value: string }>
    UserCreateDate: string
    UserLastModifiedDate: string
    Enabled: boolean
    UserStatus: string
}
