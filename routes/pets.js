const express = require('express')
const router = express.Router()
const notesRouter = require('./notes')
const upload = require('../middleware/uploads')

const { 
  getAllPets,
  getPet,
  updatePet,
  createPet,
  deletePet, 
} = require('../controllers/pets')

router.route('/').post(upload.single("image"), createPet).get(getAllPets)
router.route('/:petId').get(getPet).patch(upload.single('image'), updatePet).delete(deletePet)
router.use('/:petId/notes', notesRouter)


module.exports = router