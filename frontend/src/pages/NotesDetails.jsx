import { ArrowLeft, Loader, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'


const NotesDetails = () => {

  const [notes, setNotes] = useState({})
  const [loader, setLoader] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {

    const fetchNotes = async () => {
      setLoader(true)
      try {
        const res = await axiosInstance.get(`/notes/${id}`)
        setNotes(res.data.note)
      }
      catch (err) {
        console.log('Failed to fetch notes', err);
        toast.error('Failed to fetch notes')
      }
      finally {
        setLoader(false)
      }

    }
    fetchNotes()
  }, [id])


  // DELETE NOTE FUNCTION
  const noteDelete = async (e) => {
    e.preventDefault()
    await axiosInstance.delete(`/notes/${id}`)
    navigate('/')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const title = e.target.value.trim() || notes.title.trim()
    const content = e.target.value.trim() || notes.content.trim()
    if (!title || !content) {
      return toast.error('Please add title or content')
    }

    setSaving(true)

    try {
      await axiosInstance.put(`/notes/${id}`, notes)
      toast.success('Note updated successfully')
      navigate('/')
    }
    catch (err) {
      console.log('Note update failed');
      toast.error('Note update failed')
    }
    finally {
      setSaving(false)
    }
  }

  if (loader) return <div className='flex justify-center items-end w-full h-[300px]'>
    <Loader className='animate-spin' size={50} />
  </div>

  return (

    <div className='flex justify-center items-center  h-screen'>

      <form
        className='p-5 rounded-xl bg-black/50 md:w-4/12 w-full min-h-screen md:h-[500px] flex flex-col gap-5' onSubmit={handleSave}
      >
        <div className='flex justify-between items-center'>
          <NavLink to={'/'} className={'flex items-center gap-3 px-4 py-2 bg-black/50 rounded-lg w-fit transition-all duration-300 hover:-translate-x-2'}>
            <ArrowLeft />
            Back
          </NavLink>

          <button className='flex items-center gap-3 btn btn-error text-white' onClick={noteDelete}>
           <Trash />
            Delete
          </button>

        </div>
        <h1 className='text-2xl font-semibold '>Update Content</h1>
        <div className='flex justify-center flex-col gap-2'>
          <label className='text-lg font-semibold tracking-wide'>Title</label>
          <input
            type="text"
            value={notes.title}
            onChange={(e) => setNotes({ ...notes, title: e.target.value })}
            placeholder='Enter your title here'
            className='p-4 bg-black/30 rounded-full placeholder:text-sm outline-none focus:border focus:border-gray-700' />
        </div>

        <div className='flex justify-center flex-col gap-2'>
          <label className='text-lg font-semibold tracking-wide'>Content</label>
          <textarea
            type="text"
            value={notes.content}
            onChange={(e) => setNotes({ ...notes, content: e.target.value })}
            rows={4}
            placeholder='Write your content here...'
            className='p-4 bg-black/30 rounded-3xl placeholder:text-sm outline-none focus:border focus:border-gray-700' />
        </div>

        <div className='flex justify-end'>
          <button className='btn btn-active btn-accent text-white text-lg rounded-full' onClick={handleSave}>
            {
              saving ? 'Saving...' : 'Save'
            }
          </button>
        </div>
      </form>

    </div>
  )
}


export default NotesDetails