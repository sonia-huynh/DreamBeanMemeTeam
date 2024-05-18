import { useQuery } from '@tanstack/react-query'
import { fetchJellyBean } from '../apis/jellybean'
import { getRandomNumber } from '../modules/random-number'
import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { puns } from './BeanPuns'
import { Link } from 'react-router-dom'
import squeak from '../../public/images/squeak.mp3'
import pop from '../../public/images/pop.mp3'
import home from '../../public/images/homebean.mp3'

export function BeanQuiz() {
  const beans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const beanOptions = []
  const [result, setResult] = useState('')
  const [score, setScore] = useState(0)
  const [game, setGame] = useState(true)
  const replay = new Audio(squeak)
  const homebean = new Audio(home)

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

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  function rightBean() {
    setResult(puns[getRandomNumber(0, puns.length - 1)])
    setScore(score + 1)
  }
  function wrongBean() {
    setGame(false)
  }

  function handleClick(chosen, actual) {
    chosen === actual ? rightBean() : wrongBean()
    const sound = new Audio(pop)
    sound.play()
  }

  if (data) {
    const chosenBeanName =
      data.items[beanOptions[getRandomNumber(0, 3)]].flavorName

    if (game) {
      return (
        <>
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
            {beanOptions.map((bean) => (
              <button
                onClick={() => {
                  handleClick(data.items[bean].flavorName, chosenBeanName)
                }}
                key={data.items[bean].beanId}
              >
                <img
                  src={data.items[bean].imageUrl}
                  alt={data.items[bean].flavorName}
                />
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
            <img src="../../public/images/Lucas.png" alt="Zaks mouse Lucas" />
          </button>
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
}
