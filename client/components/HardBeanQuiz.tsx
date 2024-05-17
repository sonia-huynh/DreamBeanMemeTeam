import { useQuery } from '@tanstack/react-query'
import { fetchAllJellyBeans } from '../apis/jellybean'
import LoadingSpinner from './LoadingSpinner'

export function HardBeanQuiz() {
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

  function getRandomNumber(max: number) {
    const numberArr = Array.from({ length: max }, (_, i) => i + 1)
    //maps through the length and inserts the index as a number in the array
    console.log(numberArr)

    const randomNumber = Math.floor(Math.random() * numberArr.length)
    const number = numberArr.splice(randomNumber, 1)[0]
    return number
  }

  // set up four random bean images
  const quizBeanArr = []
  for (let i = 0; i < 4; i++) {
    const bean = data?.items[getRandomNumber(114)].imageUrl
    quizBeanArr.push(bean)
  }
  console.log(quizBeanArr)

  return (
    <>
      <h1>WOW SO HARD</h1>
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
