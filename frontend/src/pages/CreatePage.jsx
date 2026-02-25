import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, NavLink } from "react-router-dom"
import axiosInstance from "../lib/axios"

const CreatePage = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loader, setLoader] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return toast.error('All fields are required');
    }

    const paylode = {
      title,
      content
    }

    setLoader(true)
    try {

      await axiosInstance.post('/notes', paylode)
      navigate('/')

    } catch (error) {
      if (error.response.status === 429) {
        toast.error('Slow down. You’re making notes too fast.', {
          icon: '💀',
          duration: 4000
        })
      }
      console.log('Note create failed');

    }
    finally {
      setLoader(false)
    }

  }

  return (
    <div className='flex justify-center items-center  h-screen'>

      <form
        className='p-5 rounded-xl bg-black/50 md:w-4/12 w-full md:h-[500px] h-screen flex flex-col gap-5' onSubmit={handleSubmit}
      >
        <NavLink to={'/'} className={'flex items-center gap-3 px-4 py-2 bg-black/50 rounded-lg w-fit transition-all duration-300 hover:-translate-x-2'}>
          <ArrowLeft />
          Back
        </NavLink>
        <h1 className='text-2xl font-semibold '>Create New Content</h1>
        <div className='flex justify-center flex-col gap-2'>
          <label className='text-lg font-semibold tracking-wide'>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter your title here'
            className='p-4 bg-black/30 rounded-full placeholder:text-sm outline-none focus:border focus:border-gray-700' />
        </div>

        <div className='flex justify-center flex-col gap-2'>
          <label className='text-lg font-semibold tracking-wide'>Content</label>
          <textarea
            type="text"
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder='Write your content here...'
            className='p-4 bg-black/30 rounded-3xl placeholder:text-sm outline-none focus:border focus:border-gray-700' />
        </div>

        <div className='flex justify-end'>
          <button className='btn btn-active btn-accent text-white text-lg rounded-full'>
            {
              loader ? 'Creating...' : 'Create note'
            }
          </button>
        </div>
      </form>

    </div>
  )
}

export default CreatePage