import { useQuery } from '@tanstack/react-query'
import { fetchAllJellyBeans, fetchJellyBean } from '../apis/jellybean'
import { getRandomNumber } from '../modules/random-number'
import { Link } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

export function HomeBean() {
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ['bean'],
  //   queryFn: () => fetchJellyBean(),
  // })
  // console.log(data)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allBeans'],
    queryFn: () => fetchAllJellyBeans(),
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  if (data) {
    const chosenBean = data.items[getRandomNumber(0, 115)]
    return (
      <>
        <h1>DREAM BEAN MEME TEAM</h1>
        <button>
          <Link to="quiz">
            <img
              src={chosenBean.imageUrl}
              alt={'bean is ' + chosenBean.flavorName}
            />
          </Link>
        </button>
        <h2>Click the Bean</h2>
        <Link to="harder-bean-quiz">
          <button>Try Hard mode</button>
        </Link>
      </>
    )
  }
}
