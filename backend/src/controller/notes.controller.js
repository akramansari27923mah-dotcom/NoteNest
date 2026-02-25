import noteModel from "../models/notes.model.js";

// GET ALL NOTES
const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, notes });
  } catch (err) {
    console.error("GET NOTES ERROR:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

// GET NOTE BY ID
const getDataWithId = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.status(200).json({ success: true, note });
  } catch (err) {
    console.error("GET NOTE BY ID ERROR:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

// CREATE NOTE
const createNotes = async (req, res) => {
  try {
    console.log('BODY', req.body);
    
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const newNote = await noteModel.create({ title, content });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (err) {
    console.error("CREATE NOTE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

// UPDATE NOTE
const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title?.trim() && !content?.trim()) {
      return res.status(400).json({ success: false, message: "Nothing to update" });
    }

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.status(200).json({ success: true, note: updatedNote });
  } catch (err) {
    console.error("UPDATE NOTE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

// DELETE NOTE
const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await noteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    console.error("DELETE NOTE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export default { getNotes, getDataWithId, createNotes, updateNotes, deleteNotes };