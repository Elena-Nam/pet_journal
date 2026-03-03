const Note = require('../models/Note')
const Pet = require('../models/Pet')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getPetNotes = async (req, res) => {
  const { petId } = req.params

  //  Query Parameters 
  const {
    search,       
    category,       
    sort = '-createdAt',  
    page = 1,
    limit = 10
  } = req.query

  // Verify pet belongs to user
  const pet = await Pet.findOne({
    _id: petId,
    createdBy: req.user.userId
  })

  if (!pet) {
    throw new NotFoundError(`No pet with the id: ${petId}`)
  }

  //  Build query object 
  const queryObject = { pet: petId }

  if (category) {
    queryObject.category = category
  }

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ]
  }

  // Pagination 
  const pageNum = Number(page) || 1
  const limitNum = Number(limit) || 10
  const skip = (pageNum - 1) * limitNum

  // Count total matching notes 
  const totalNotes = await Note.countDocuments(queryObject)

  //  Fetch notes 
  const notes = await Note.find(queryObject)
    .sort(sort)
    .skip(skip)
    .limit(limitNum)

  // Return response
  res.status(StatusCodes.OK).json({
    notes,
    count: notes.length,
    totalNotes,
    page: pageNum,
    totalPages: Math.ceil(totalNotes / limitNum),
  })
}

const getNote = async (req,res) => {
  const { petId, noteId } = req.params
  const note = await Note.findOne({
    _id: noteId,
    pet: petId,
    createdBy: req.user.userId
  })
  if(!note){
    throw new NotFoundError(`No note with the id: ${noteId}`)
  }
  res.status(StatusCodes.OK).json(note)
}

const createNote = async (req, res) => {
  const { petId } = req.params 
  
  //  verify pet ownership first
  const pet = await Pet.findOne({
    _id: petId,
    createdBy: req.user.userId
  })
  if (!pet) {
    throw new NotFoundError(`No pet with the id: ${petId}`)
  }

  req.body.pet = req.params.petId
  req.body.createdBy = req.user.userId

  const note = await Note.create(req.body)
  res.status(StatusCodes.CREATED).json({ note })
}

const updateNote = async (req,res) => {
  const { petId, noteId } = req.params
  const updatedNote = await Note.findOneAndUpdate({
    _id: noteId,
    pet: petId,
    createdBy: req.user.userId
  }, 
  req.body,
  {new: true, runValidators:true} 
  )
  if (!updatedNote) {
    throw new NotFoundError(`No note with the id: ${noteId}`)
  }
  res.status(StatusCodes.OK).json(updatedNote)
  }

const deleteNote = async (req,res) => {
  const { petId, noteId } = req.params
  
  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    pet: petId,
    createdBy: req.user.userId
  })
    if (!deletedNote) {
    throw new NotFoundError(`No note with the id: ${noteId}`)
  }
 
  res.status(StatusCodes.OK).json(deletedNote)
}


module.exports = {
  getPetNotes,
  getNote,
  updateNote,
  createNote,
  deleteNote,
}