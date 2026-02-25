import { useState } from 'react';
import { axiosLogin } from '../lib/axios';
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate()
    const [loging, setLogIng] = useState(false)

    const handelLogin = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value.trim()
        const password = e.target.elements.password.value.trim()

        if (!email) return toast.error('Email is required')
        if (!password) return toast.error('Password is required')
        const paylode = {
            email,
            password
        }
        setLogIng(true)
        try {
            const res = await axiosLogin.post('/auth/login', paylode)

            const sucess = res.data?.success;

            if (sucess) {
                navigate('/')
            }

            toast.success('Login successfully')
        }
        catch (err) {
            console.log('login failed', err);
            toast.error('Invalid credentials')
        }
        finally {
            setLogIng(false)
        }

    }
    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <div className='bg-white p-5 backdrop-blur-3xl h-screen md:h-[400px] w-[400px] rounded-lg shadow-sm flex justify-center  flex-col'>
                <h1 className='text-center text-3xl text-black font-bold mb-6'>Login</h1>
                <form method="post" className='flex flex-col gap-3' onSubmit={handelLogin}>

                    <div className='flex flex-col gap-2'>
                        <label className='text-black'>Username && Email</label>
                        <input type="text"
                            name="email"
                            placeholder='Enter email && username'
                            className='p-3 w-full text-black rounded-lg bg-white outline-none border border-gray-300 focus:border-gray-600'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-black'>Password</label>
                        <input type="password"
                            placeholder='**********'
                            name="password"
                            className='p-3 w-full text-black rounded-lg bg-white outline-none border border-gray-300 focus:border-gray-600'
                        />
                    </div>

                    <div className='mt-5'>
                        <button type='submit' className='px-4 py-2 rounded-sm bg-black text-white w-full'>
                            {
                                loging ? (
                                    <div className='flex justify-center items-center'>
                                        <Loader className='animate-spin' />
                                    </div>
                                )
                                    :
                                    'Log in'
                            }
                        </button>
                    </div>

                    <NavLink to={'/sign'} className={'flex items-center justify-center gap-2'}>
                        <h1 className='text-black'>Don't have an account ?</h1>
                        <button className='hover:underline text-blue-500'>
                            Sign up
                        </button>
                    </NavLink>
                </form>
            </div>
        </div>
    )
}

export default Login