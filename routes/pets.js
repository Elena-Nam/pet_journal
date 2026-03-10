const express = require('express')
const router = express.Router()
const notesRouter = require('./notes')

const { 
  getAllPets,
  getPet,
  updatePet,
  createPet,
  deletePet, 
} = require('../controllers/pets')

router.route('/').post(createPet).get(getAllPets)
router.route('/:petId').get(getPet).patch(updatePet).delete(deletePet)
router.use('/:petId/notes', notesRouter)


module.exports = router