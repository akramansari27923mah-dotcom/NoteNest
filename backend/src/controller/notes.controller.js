import noteModel from "../models/notes.model.js";

// GET NOTES
const getNotes = async (req, res) => {
  try {
    const notes = await noteModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET NOTES BY ID
const getDataWithId = async (req, res) => {
  try {
    const note = await noteModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// CREATE NOTE
const createNotes = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = await noteModel.create({
      title,
      content,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// UPDATE NOTE
const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await noteModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, note: updatedNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE NOTE
const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await noteModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default { createNotes, getNotes, updateNotes, deleteNotes, getDataWithId };