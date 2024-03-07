import { useQuery } from '@tanstack/react-query'
import { getRandomNumber } from '../modules/random-number'
import { fetchJellyBean } from '../apis/jellybean'

export function BeanQuiz() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bean'],
    queryFn: () => fetchJellyBean(getRandomNumber(1, 114)),
  })

  return <p>Bean Quiz Returned BEANBOOZLED</p>
}
