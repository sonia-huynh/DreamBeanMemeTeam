import { useQuery } from '@tanstack/react-query'
import { fetchJellyBean } from '../apis/jellybean'

interface Props {
  randNumber: number
}

export function Bean(props: Props) {
  const { randNumber } = props
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bean'],
    queryFn: () => fetchJellyBean(randNumber),
  })

  if (isLoading) {
    return <p>Load</p>
  }

  if (isError) {
    return <p>Error, u stupid: {error.message}</p>
  }

  if (data) {
    return (
      <button>
        <img src={data.imageUrl} alt={'bean is ' + data.flavorName} />
      </button>
    )
  }
}
