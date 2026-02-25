import { Plus } from 'lucide-react'

import { NavLink } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

const Navebar = ({ note }) => {
    const navigate = useNavigate()




    const createNote = () => {

        navigate('/create')
    }


    return (
        <>
            <header className=' bg-base-300 border border-base-content/30 sticky top-0 z-10'>
                <div className='flex justify-between items-center p-3 max-w-7xl mx-auto '>
                    <div className='text-[#00B29F] text-3xl font-semibold flex items-center'>
                        <img src="/logo.png" className='w-[50px] h-[50px]' />
                        <h1>NoteNest</h1>
                    </div>

                    <div className='md:flex items-center gap-3 hidden sm:block'>
                        <p className='font-bold'>Total Notes :</p>
                        {note.length}
                    </div>

                    <div className='flex items-center gap-3 '>
                        <button onClick={createNote} className='md:flex justify-center hidden items-center text-lg btn btn-active btn-accent rounded-full text-white transition-all duration-300 hover:scale-105'>
                            <Plus />
                            <button>Create</button>
                        </button>
                    </div>

                </div>
            </header>

            <NavLink to={'/create'} className='flex justify-center md:hidden z-20 fixed bottom-5 right-5 items-center text-lg btn btn-active btn-accent rounded-full text-white transition-all duration-300 hover:scale-105'>
                <Plus />
                <button>Create</button>
            </NavLink>
        </>
    )
}

export default Navebar