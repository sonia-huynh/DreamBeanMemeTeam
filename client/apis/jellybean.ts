import request from 'superagent'

export async function fetchJellyBean() {
  const res = await request.get(
    'https://jellybellywikiapi.onrender.com/api/Beans/19'
  )
  return res.body
}
