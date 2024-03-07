import { useQuery } from '@tanstack/react-query'
import { fetchJellyBean } from '../apis/jellybean'
import { Bean } from './Bean1'
import { getRandomNumber } from '../modules/random-number'

export function BeanQuiz() {
  const beans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const beanOptions = []

  for (let i = 0; i < 4; i++) {
    const j = getRandomNumber(0, beans.length - 1)
    beanOptions.push(beans[j])
    beans.splice(j, 1)
    console.log(beanOptions)
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bean'],
    queryFn: () => fetchJellyBean(),
  })

  if (data) {
    const chosenBeanName =
      data.items[beanOptions[getRandomNumber(0, 3)]].flavorName

    return (
      <>
        <h2>{chosenBeanName}</h2>
        {beanOptions.map((bean) => (
          <button key={data.items[bean].beanId}>
            <img
              src={data.items[bean].imageUrl}
              alt={data.items[bean].flavorName}
            />
          </button>
        ))}
      </>
    )
  }
}
