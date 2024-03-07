import { useQuery } from '@tanstack/react-query'
import { fetchJellyBean } from '../apis/jellybean'
import { getRandomNumber } from '../modules/random-number'
import { Link } from 'react-router-dom'

export function HomeBean() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bean'],
    queryFn: () => fetchJellyBean(),
  })
  console.log(data)

  if (isLoading) {
    return <p>Load</p>
  }

  if (isError) {
    return <p>Error, u stupid: {error.message}</p>
  }

  if (data) {
    const chosenBean = data.items[getRandomNumber(0, 9)]
    return (
      <>
        <p>Time flies when you&apos;re bean productive.</p>
        <button>
          <Link to="quiz">
            <img
              src={chosenBean.imageUrl}
              alt={'bean is ' + chosenBean.flavorName}
            />
          </Link>
        </button>
        <h2>Click the Bean</h2>
      </>
    )
  }
}
