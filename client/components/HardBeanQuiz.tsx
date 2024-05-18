import { useQuery } from '@tanstack/react-query'
import { fetchAllJellyBeans } from '../apis/jellybean'
import LoadingSpinner from './LoadingSpinner'
import { getRandomNumber } from '../modules/random-number'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Beans } from '../../models/BeanModel'
import { puns } from './BeanPuns'
import pop from '../../public/images/pop.mp3'
import home from '../../public/images/homebean.mp3'
import squeak from '../../public/images/squeak.mp3'

export function HardBeanQuiz() {
  // set game state
  const [game, setGame] = useState(true)
  const [result, setResult] = useState('')
  const [score, setScore] = useState(0)

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

  // shuffle method to randomise array
  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const randomI = getRandomNumber(0, i)
      ;[array[i], array[randomI]] = [array[randomI], array[i]]
    }
    return array
  }
  const shuffledArr = shuffle(numberArr)

  // pick 4 random numbers
  const beanArr: Beans[] = []
  const pickBeans = (arr: number[]) => {
    for (let i = 0; i < 4; i++) {
      const beanNum = Number(arr.pop())
      const bean = data?.items[beanNum]
      // console.log(bean)
      beanArr.push(bean)
      if (bean === undefined) {
        beanArr.pop()
        const newBean = Number(arr.pop())
        const bean = data?.items[newBean]
        beanArr.push(bean)
      }
    }
    return beanArr
  }

  const quizBeanArr = pickBeans(shuffledArr)
  console.log(quizBeanArr)

  // set up the chosen bean
  const chosenNum = getRandomNumber(0, quizBeanArr.length - 1)
  const chosenBean = quizBeanArr[chosenNum]
  const chosenBeanName = chosenBean?.flavorName
  // console.log(chosenBean?.imageUrl)
  console.log(score)

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

  if (game === true) {
    return (
      <>
        <h1 className="hardmode">WOW, SO HARD!!!</h1>
        <Link to="/">
          <button className="homeButton" onClick={() => homebean.play()}>
            <img
              className="homeImage"
              src="../../public/images/homeJelly.png"
              alt="Red home jelly bean"
            />
          </button>
        </Link>
        <h1 className="chosen">{chosenBeanName}</h1>
        <div className="image-container">
          {quizBeanArr.map((bean, i) => (
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
          <img src="../../public/images/Lucas.png" alt="replay button" />
        </button>
        <h1>Click to replay!</h1>
        <Link to="/">
          <button className="homeButton" onClick={() => homebean.play()}>
            <img
              className="homeImage"
              src="../../public/images/homeJelly.png"
              alt="Red home jelly bean"
            />
          </button>
        </Link>
      </>
    )
  }
}
