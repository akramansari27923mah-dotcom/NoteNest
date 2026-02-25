import express from 'express';
import notesController from '../controller/notes.controller.js'

const router = express.Router();


// GET API FOR SEND DATA
router.get('/',  notesController.getNotes)

// THIS API GET DATA TO ESPACIFIC ID
router.get('/:id', notesController.getDataWithId)

// POST API FOR CREATE POST
router.post('/', notesController.createNotes)


// PUT API FOR UPDATE POST
router.put('/:id', notesController.updateNotes)


// DELETE API FOR DELETE POST
router.delete('/:id', notesController.deleteNotes)

export default router