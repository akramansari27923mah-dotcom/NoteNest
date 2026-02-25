import express from 'express';
import notesController from '../controller/notes.controller.js'
import checkToken from '../middleware/auth.middleware.js';

const router = express.Router();


// GET API FOR SEND DATA
router.get('/', checkToken, notesController.getNotes)

// THIS API GET DATA TO ESPACIFIC ID
router.get('/:id',checkToken, notesController.getDataWithId)

// POST API FOR CREATE POST
router.post('/',checkToken, notesController.createNotes)


// PUT API FOR UPDATE POST
router.put('/:id',checkToken, notesController.updateNotes)


// DELETE API FOR DELETE POST
router.delete('/:id',checkToken, notesController.deleteNotes)

export default router