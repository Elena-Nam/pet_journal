const Note = require('../models/Note')
const {StatusCodes, NOT_ACCEPTABLE} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getPetNotes = async (req,res) => {
  const notes = await Note.find({pet: req.params.petId}).sort('createdAt')
    res.status(StatusCodes.OK).json({notes, count: notes.length})
  }


const getNote = async (req,res) => {
  res.send('get a note')
}

const createNote = async (req,res) => {
  req.body.createdForPet = req.params.petId
  const note = await Note.create(req.body)
  res.status(StatusCodes.CREATED).json({note})

}

const updateNote = async (req,res) => {
  res.send('update a note')
}

const deleteNote = async (req,res) => {
  res.send('delete a note')
}


module.exports = {
  getPetNotes,
  getNote,
  updateNote,
  createNote,
  deleteNote,
}