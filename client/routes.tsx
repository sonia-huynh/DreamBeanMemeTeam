import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App'
import { HomeBean } from './components/HomeBean'
import { BeanQuiz } from './components/BeanQuiz'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomeBean />} />
    <Route path="quiz" element={<BeanQuiz />} />
  </Route>
)
