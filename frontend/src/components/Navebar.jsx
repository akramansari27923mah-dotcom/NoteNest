import { Loader, Menu, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axiosInstance from '../lib/axios'
import { useNavigate } from 'react-router-dom'

const Navebar = ({ note }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isMeneOpen, setIsMenuOpen] = useState(false)
    const [logOut, setLogOut] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            const res = await axiosInstance.get('/auth/me', { withCredentials: true });
            setUser(res.data.user);
        }

        checkUser()
    }, [])


    const handleLogout = async () => {
        setLogOut(true)
        try {
            await axiosInstance.post(
                "/auth/logout",

                { withCredentials: true }
            );

            // UI update
            setUser(null);

            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
        finally {
            setLogOut(false)
        }
    };

    const createNote = () => {

        if(!user) return navigate('/sign')
            
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
                        <button onClick={createNote} className='md:flex justify-center hidden items-center text-lg btn btn-active btn-accent rounded-full text-white transition-all duration-300 hover:scale-105 fixed bottom-5 right-5'>
                            <Plus />
                            <button>Create</button>
                        </button>

                        {
                            user ? <div className='flex items-center gap-2'>
                                <p className='hidden md:block'>
                                    <span className='text-lg font-mono'>
                                        Hi👋"
                                    </span>
                                    <span className='font-mono font-bold ml-2'>
                                        {user.username}
                                    </span>
                                </p>
                                {
                                    logOut ? <Loader className='animate-spin' /> :
                                        <button onClick={handleLogout} className='md:flex justify-center hidden items-center text-lg btn btn-active  bg-red-500 rounded-full text-white transition-all duration-300 hover:scale-105'>Logout</button>
                                }
                            </div> :
                                (

                                    <NavLink to={'/sign'} className='md:flex justify-center hidden items-center text-lg btn btn-active  bg-green-500 rounded-full text-white transition-all duration-300 hover:scale-105'>
                                        <button>Sign In</button>
                                    </NavLink>
                                )
                        }

                        {
                            isMeneOpen ? <X className='cursor-pointer ' onClick={() => setIsMenuOpen(!isMeneOpen)} /> : <Menu onClick={() => setIsMenuOpen(!isMeneOpen)} className='md:hidden cursor-pointer ' />
                        }
                        {
                            isMeneOpen && (

                                <div className='fixed top-[70px] animate_animated animate__fadeIn  right-5 p-3 rounded-lg shadow-sm bg-black/50'>
                                    {
                                        user ? <div className='flex justify-center items-center gap-3'>

                                            <p className=''>Hi👋"
                                                <span className='font-sans font-bold ml-2'>
                                                    {user.username}
                                                </span>
                                            </p>
                                            <button onClick={handleLogout} className='flex justify-center  items-center text-lg px-4 py-2 opacity-80 hover:opacity-100  bg-red-500 rounded-full text-white transition-all duration-300 hover:scale-105'>Logout</button>
                                        </div> :
                                            (

                                                <NavLink to={'/sign'} className='flex justify-center  items-center text-lg px-4 py-2 hover:opacity-100 opacity-80  bg-green-500 rounded-full text-white transition-all duration-300 hover:scale-105'>
                                                    <button>Sign In</button>
                                                </NavLink>
                                            )
                                    }
                                </div>
                            )

                        }

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