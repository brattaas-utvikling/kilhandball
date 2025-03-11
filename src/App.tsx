import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Layout from './components/Layout'

function App() {


  return (
    <div className='text-black'>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/om-oss" element={<About />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
