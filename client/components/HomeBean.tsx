import { useQuery } from '@tanstack/react-query'
import { fetchJellyBean } from '../apis/jellybean'

export function HomeBean() {
  const { data } = useQuery({ queryKey: ['bean'], queryFn: fetchJellyBean })
  console.log(data)
  return <p>Home Bean Returned BEANTACULAR</p>
}
