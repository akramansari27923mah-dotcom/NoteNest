import { Link } from "react-router-dom"
import { EditIcon, Trash } from "lucide-react"
import formatted from "../lib/utils"
import DeleteNotes from "./DeleteNotes"
import { useState } from "react"

const CardNotes = ({ note, setNote }) => {

    const [isClicked, setIsClicked] = useState(false)
    const [noteId, setNoteId] = useState('')

    const handelPopup = async (e, id) => {
        setNoteId(id)
        e.preventDefault()
        setIsClicked(true)
    }

    return (
        <>
            <Link to={`/notes/${note._id}`} className="card bg-black/50 backdrop-blur-md border-t-4 border-[#00B29F]">

                <div className="p-4 card-body">
                    <h1 className="card-title">{note.title}</h1>
                    <p className="text-sm">{note.content}</p>

                    <div className="card-actions mt-4 flex justify-between">
                        <label className="text-sm">{formatted(note.createdAt)}</label>
                        <div className="flex items-center gap-3">
                            <EditIcon />
                            <button onClick={(e) => handelPopup(e, note._id)} className="p-2 rounded-full hover:bg-red-600 hover:text-white text-red-600 transition-all duration-300">
                                <Trash />
                            </button>
                        </div>
                    </div>
                </div>

            </Link>

            <div className="fixed md:top-[300px] md:left-[530px] top-[300px] left-[30px] z-10">
                {
                    isClicked &&
                    <DeleteNotes setIsClicked={setIsClicked} id={noteId} note={note} setNote={setNote}/>
                }
            </div>
        </>
    )
}

export default CardNotes