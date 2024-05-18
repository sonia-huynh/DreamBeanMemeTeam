import { useQuery } from '@tanstack/react-query'
import { fetchAllJellyBeans } from '../apis/jellybean'
import LoadingSpinner from './LoadingSpinner'
import { getRandomNumber } from '../modules/random-number'

export function HardBeanQuiz() {
  // bean option length array
  // maps through the length and inserts the index as a number in the array
  let numberArr = []
  for (let i = 0; i < 115; i++) {
    const item = i
    numberArr.push(item)
  }
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
    const beanNumber = getRandomNumber(0, numberArr.length - 1)
    // console.log({ number: beanNumber })
    const filt: number[] = numberArr.filter((num: number) => num != beanNumber)
    // filters the beanNumber out to remove it from the array and prevent repitition
    numberArr = filt
    // sets numberArr as filt which is the array without the picked numbers
    // console.log(numberArr)
    quizBeanArr.push(data?.items[beanNumber])
  }
  console.log(quizBeanArr)

  // set up the chosen bean
  const theBean = []
  const chosenNum = getRandomNumber(0, quizBeanArr.length - 1)
  const chosenBean = quizBeanArr[chosenNum]?.flavorName
  theBean.push(chosenBean)
  // console.log(theBean)

  // function handleCorrect(){
  //   if()
  // }

  return (
    <>
      <h1>WOW SO HARD</h1>
      <h1>{theBean}</h1>
      <div>
        {quizBeanArr.map((bean, i) => (
          <button key={i}>
            <img src={bean?.imageUrl} alt={bean?.flavorName} />
          </button>
        ))}
      </div>
    </>
  )
}
