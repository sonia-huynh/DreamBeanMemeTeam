import { useQuery } from '@tanstack/react-query'
import { fetchJellyBean } from '../apis/jellybean'
import { getRandomNumber } from '../modules/random-number'
import { Link } from 'react-router-dom'

export function HomeBean() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bean'],
    queryFn: () => fetchJellyBean(getRandomNumber(1, 114)),
  })

  function handleClick() {}

  if (isLoading) {
    return <p>Load</p>
  }

  if (isError) {
    return <p>Error, u stupid: {error.message}</p>
  }

  if (data) {
    return (
      <>
        <p>Time flies when you&apos;re bean productive.</p>
        <button onClick={handleClick}>
          <Link to="quiz">
            <img src={data.imageUrl} alt={'bean is ' + data.flavorName} />
          </Link>
        </button>
        <h2>Click the Bean</h2>
      </>
    )
  }
}
