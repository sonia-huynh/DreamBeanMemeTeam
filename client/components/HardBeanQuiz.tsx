import { useQuery } from '@tanstack/react-query'
import { fetchAllJellyBeans } from '../apis/jellybean'
import LoadingSpinner from './LoadingSpinner'
import { getRandomNumber } from '../modules/random-number'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Beans } from '../../models/BeanModel'
import { puns } from './BeanPuns'
import pop from '/images/pop.mp3'
import home from '/images/homebean.mp3'
import squeak from '/images/squeak.mp3'

export function HardBeanQuiz() {
  // set game state
  const [game, setGame] = useState(true)
  const [result, setResult] = useState('')
  const [score, setScore] = useState(0)
  // const [time, setTime] = useState(60)

  //audio
  const sound = new Audio(pop)
  const homebean = new Audio(home)
  const replay = new Audio(squeak)

  // bean option length array
  const numberArr: number[] = []
  for (let i = 0; i < 115; i++) {
    const item = i
    numberArr.push(item)
  }

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

  const dataLength = data?.items.length as number

  // Picking Random Jelly Bean
  function getFourRandomNumbers(max: number) {
    // Create an array of numbers from 0 to max-1
    const numbers = Array.from({ length: max }, (_, i) => i)
    const fourBeans = []

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length)
      const number = numbers.splice(randomIndex, 1)[0]
      const bean = data?.items[number]
      fourBeans.push(bean)
    }

    return fourBeans
  }
  const fourBeansArr = getFourRandomNumbers(dataLength)

  // random number function
  function randomNumber(range: number) {
    return Math.floor(Math.random() * range)
  }

  // // OLD CODE: shuffle method to randomise array
  // const shuffle = (array: number[]) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const randomI = getRandomNumber(0, i)
  //     ;[array[i], array[randomI]] = [array[randomI], array[i]]
  //   }
  //   return array
  // }
  // const shuffledArr = shuffle(numberArr)

  // // pick 4 random numbers
  // const beanArr: Beans[] = []
  // const pickBeans = (arr: number[]) => {
  //   for (let i = 0; i < 4; i++) {
  //     const beanNum = Number(arr.pop())
  //     const bean = data?.items[beanNum]
  //     // console.log(bean)
  //     beanArr.push(bean)
  //     if (bean === undefined) {
  //       beanArr.pop()
  //       const newBean = Number(arr.pop())
  //       const bean = data?.items[newBean]
  //       beanArr.push(bean)
  //     }
  //   }
  //   return beanArr
  // }

  // const quizBeanArr = pickBeans(shuffledArr)
  // console.log(quizBeanArr)

  // set up the chosen bean
  const chosenNum = randomNumber(fourBeansArr.length)
  const chosenBean = fourBeansArr[chosenNum]
  const chosenBeanName = chosenBean?.flavorName

  // handle what happens if bean correct or wrong
  function handleClick(bean: Beans) {
    sound.play()
    console.log(bean.imageUrl)
    if (bean.imageUrl === chosenBean?.imageUrl) {
      setResult(puns[getRandomNumber(0, puns.length - 1)])
      setGame(true)
      setScore((prev) => prev + 1)
      console.log(score)
    } else {
      setGame(false)
    }
  }

  // function timer() {
  //   setTimeout(() => {
  //     setTime((time) => time - 1)
  //   }, 1000)
  // }
  // timer()

  if (game === true) {
    return (
      <>
        <h1 className="hardmode">WOW, SO HARD!!!</h1>

        <Link to="/">
          <button className="homeButton" onClick={() => homebean.play()}>
            <img
              className="homeImage"
              src="/images/homeJelly.png"
              alt="Red home jelly bean"
            />
          </button>
        </Link>
        <h1 className="chosen">{chosenBeanName}</h1>
        <div className="image-container">
          {fourBeansArr.map((bean, i) => (
            <button key={i} onClick={() => handleClick(bean)}>
              <img src={bean?.imageUrl} alt={bean?.flavorName} />
            </button>
          ))}
        </div>
        <h1>{result}</h1>
      </>
    )
  } else {
    return (
      <>
        <h1 className="lucas">Lucas ate {score} Jellybeans</h1>
        <button
          onClick={() => {
            replay.play()
            setGame(true)
            setScore(0)
          }}
        >
          <img src="/images/Lucas.png" alt="replay button" />
        </button>
        <h1>Click to replay!</h1>
        <Link to="/">
          <button className="homeButton" onClick={() => homebean.play()}>
            <img
              className="homeImage"
              src="/images/homeJelly.png"
              alt="Red home jelly bean"
            />
          </button>
        </Link>
      </>
    )
  }
}
