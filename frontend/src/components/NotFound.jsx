import { ArrowLeftSquare } from "lucide-react"
import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen flex-col gap-5'>
      <h1 className='text-2xl text-red-500'>404 | NotFound</h1>
      <NavLink to={'/'} className="flex items-center gap-5">
        <ArrowLeftSquare />
        < button className={'btn btn-link'}>Go to home page</button>
      </NavLink>
    </div>
  )
}

export default NotFound