import { useQuery } from '@tanstack/react-query'
import { fetchAllJellyBeans } from '../apis/jellybean'
import LoadingSpinner from './LoadingSpinner'
import { getRandomNumber } from '../modules/random-number'

export function HardBeanQuiz() {
  // bean option length array
  // maps through the length and inserts the index as a number in the array
  const numberArr = Array.from({ length: 114 }, (_, i) => i + 1)
  const quizBeanArr = []

  // Custom hook
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

  // set up four random bean images
  for (let i = 0; i < 4; i++) {
    const number = getRandomNumber(0, numberArr.length - 1)
    const bean = data?.items[number].imageUrl
    numberArr.splice(number, 1)[0]
    // splices the randomNumber to remove it from the array and prevent repitition
    quizBeanArr.push(bean)
    console.log({ number: number })
  }
  console.log(quizBeanArr)

  // set up the chosen bean

  return (
    <>
      <h1>WOW SO HARD</h1>
      <h1>{}</h1>
      <div>
        {quizBeanArr.map((bean, i) => (
          <button key={i}>
            <img src={bean} alt="some jelly bean" />
          </button>
        ))}
      </div>
    </>
  )
}
