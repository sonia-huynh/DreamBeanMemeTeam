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

// Fetch all possible jelly beans
export async function fetchAllJellyBeans() {
  const res = await request.get(
    `https://jellybellywikiapi.onrender.com/api/Beans?pageSize=114`
  )
  // console.log(res.body)
  return res.body as BeanList
}
