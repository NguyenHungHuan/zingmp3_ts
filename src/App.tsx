import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import PATH from './constants/path'
import ZingChart from './pages/ZingChart'
import NewReleased from './pages/NewReleased'
import Hub from './pages/Hub'
import Top100 from './pages/Top100'
import Library from './pages/Library'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={PATH.base} index element={<Home />} />
          <Route path={PATH.zingChart} element={<ZingChart />} />
          <Route path={PATH.thuVien} element={<Library />} />
          <Route path={PATH.newReleased} element={<NewReleased />} />
          <Route path={PATH.hub} element={<Hub />} />
          <Route path={PATH.top100} element={<Top100 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
