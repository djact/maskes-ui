import { useQuery } from 'react-query'

export default function Example() {
    const { isLoading, error, data } = useQuery(
        'repoData',
        () => {
            console.log('fetching data...')
            return fetch(
                'https://api.github.com/repos/tannerlinsley/react-query'
            ).then((res) => res.json())
        },
        { staleTime: 5000 }
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: '

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
        </div>
    )
}
