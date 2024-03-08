import { useQuery } from '@tanstack/react-query'
import { fetchJellyBean } from '../apis/jellybean'
import { getRandomNumber } from '../modules/random-number'
import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

export function BeanQuiz() {
  let beans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let beanOptions = []
  const [result, setResult] = useState('')
  const out = ['1', '2', '3', '4', '5', '6']

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
    return <p>Error, u stupid: {error.message}</p>
  }

  function rightBean() {
    console.log('right bean')
    setResult('')
    setResult(out[getRandomNumber(0, 5)])
    beans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    beanOptions = []
  }
  function wrongBean() {
    console.log('wrong bean')
    setResult('')
    setResult(out[getRandomNumber(0, 5)])
    beans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    beanOptions = []
  }

  function handleClick(chosen, actual) {
    chosen === actual ? rightBean() : wrongBean()
  }

  if (data) {
    const chosenBeanName =
      data.items[beanOptions[getRandomNumber(0, 3)]].flavorName

    return (
      <>
        <h2>{chosenBeanName}</h2>
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
        <p>{result}</p>
      </>
    )
  }
}
