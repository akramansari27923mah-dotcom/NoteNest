import toast from "react-hot-toast"
import Navebar from "../components/Navebar"
import { useEffect, useState } from "react"
import RateLimited from "../components/RateLimited"
import CardNotes from "../components/CardNotes"
import axiosInstance from "../lib/axios"
import NoteNotFound from "../components/NoteNotFound"

const Home = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [note, setNote] = useState([]);
    const [loader, setLoader] = useState(true)


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoader(true)
                const res = await axiosInstance.get('/notes')
                setNote(res.data.notes);
                setIsRateLimited(false)
            }
            catch (err) {
                console.error('Data fatch failed', err);
                if (err.response?.status === 429) {
                    setIsRateLimited(true);
                }
                else {
                    toast.error('Failed to load notes', err)
                }
            }
            finally {
                setLoader(false)
            }
        }

        fetchNotes()
    }, [])

    return (
        <div className="min-h-screen">
            <Navebar note={note} />

            {
                note.length === 0 ? (
                   <NoteNotFound />
                ) :
                isRateLimited ? (
                    <RateLimited />
                ) : loader ? (
                    <div className="text-xl font-bold animate-pulse max-w-7xl mx-auto text-center">
                        Loading notes...
                    </div>
                ) : note.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto md:mt-5 gap-5">
                        {
                            note.map((n) => (
                                <CardNotes key={n._id} note={n} setNote={setNote} />
                            ))
                        }
                    </div>
                )
            }


        </div>

    )
}

export default Home