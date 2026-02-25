import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreatePage from "./pages/CreatePage"
import NotesDetails from "./pages/NotesDetails"
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div data-theme="forest" className="fixed overflow-y-scroll md:overflow-y-auto hide-scrollbar -z-10 h-full w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#1F1F1F_30%,#000000_100%)]">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NotesDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App