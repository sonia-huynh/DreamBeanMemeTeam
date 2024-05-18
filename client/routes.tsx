import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App'
import { HomeBean } from './components/HomeBean'
import { BeanQuiz } from './components/BeanQuiz'
import { HardBeanQuiz } from './components/HardBeanQuiz'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomeBean />} />
    <Route path="quiz" element={<BeanQuiz />} />
    <Route path="harder-bean-quiz" element={<HardBeanQuiz />} />
  </Route>
)
