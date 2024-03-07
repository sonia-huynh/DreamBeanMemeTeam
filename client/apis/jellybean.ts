import request from 'superagent'
import { BeanList } from '../../models/BeanModel'

export async function fetchJellyBean() {
  const res = await request.get(
    `https://jellybellywikiapi.onrender.com/api/Beans`
  )
  return res.body as BeanList
}

// export async function fetchJellyBean(bean: number) {
//   const res = await request.get(
//     `https://jellybellywikiapi.onrender.com/api/Beans/${bean}`
//   )
//   return res.body as Beans
// }
