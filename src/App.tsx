import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Layout from './hoc/Layout'
import HomePage from './pages/HomePage'
import About from './pages/About'

function App() {
  return (
   
      <Router>
        <Routes>
          <Route element={<Layout/>} path={'/'}>
          <Route index element={<HomePage/>}/>
          <Route path={'/about'} element={<About/>}/>

          </Route>
        </Routes>
      </Router>
     
  )
}

export default App
