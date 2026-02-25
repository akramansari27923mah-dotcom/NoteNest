import toast from "react-hot-toast"
import axiosInstance from "../lib/axios"

const DeleteNotes = ({ setIsClicked, id, setNote }) => {

  const handelDelete = async () => {
    const d = await axiosInstance.delete(`/notes/${id}`)
    toast.success(d.data.message)
    setNote((prev) => prev.filter(note => note._id !== id))
    setIsClicked(false)
  }

  return (
    <div className="bg-white p-3 rounded-xl space-x-5 flex flex-col gap-3 justify-center items-center">
      <p className="text-center text-black md:text-base text-sm font-bold">Are you sure you want to delete this note?<br />
        This action can’t be undone.</p>
      <div className="space-x-5">
        <button className="btn btn-sm" onClick={() => setIsClicked(false)}>cancel</button>
        <button className="btn btn-error btn-sm text-white" onClick={handelDelete}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteNotes