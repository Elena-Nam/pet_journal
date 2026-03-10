const express = require('express')
const router = express.Router({ mergeParams: true })

const { 
  getPetNotes,
  getNote,
  updateNote,
  createNote,
  deleteNote, 
} = require('../controllers/notes')

router.route('/').post(createNote).get(getPetNotes)
router.route('/:noteId').get(getNote).patch(updateNote).delete(deleteNote)



module.exports = router