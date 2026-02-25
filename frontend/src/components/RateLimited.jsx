import { ZapIcon } from 'lucide-react'

const RateLimited = () => {
    return (
        <div className='p-5 max-w-3xl my-3 mx-auto bg-[#00B29F]/30 border border-[#00B29F]/40 rounded-sm'>

            <div className='flex items-center gap-5'>
                <div className='p-2  flex justify-center items-center rounded-full bg-[#00B29F]/30 border border-[#00B29F]/40'>
                    <ZapIcon size={50} color='#00B29F' />
                </div>
                <div >
                    <h1 className='text-lg font-bold text-[#00B29F]'>Rate Limit Reached</h1>
                    <p className='text-sm text-[#00B29F]'>Too many requests. Please wait a moment and try again.</p>
                </div>
            </div>

        </div>
    )
}

export default RateLimited