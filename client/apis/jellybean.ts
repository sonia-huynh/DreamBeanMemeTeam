import request from 'superagent'
import { Beans } from '../../models/BeanModel'

export async function fetchJellyBean(bean: number) {
  const res = await request.get(
    `https://jellybellywikiapi.onrender.com/api/Beans/${bean}`
  )
  return res.body as Beans
}
