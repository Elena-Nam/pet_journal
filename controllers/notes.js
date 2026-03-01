const Note = require('../models/Note')
const {StatusCodes, NOT_ACCEPTABLE} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthorizedError} = require('../errors')


// const getPetNotes = async (req,res) => {
  // const notes = await Note.find({pet: req.params.petId}).sort('-createdAt')
  //   res.status(StatusCodes.OK).json({notes, count: notes.length})
  // }

const getPetNotes = async (req, res) => {
  const { petId } = req.params

  // --- Query Parameters ---
  const {
    search,          // search keyword
    category,        // filter by category
    sort = '-createdAt',  // default: newest first
    page = 1,
    limit = 10
  } = req.query

  // --- Build query object ---
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

  // --- Pagination calculation ---
  const pageNum = Number(page) || 1
  const limitNum = Number(limit) || 10
  const skip = (pageNum - 1) * limitNum

  // --- Count total matching notes ---
  const totalNotes = await Note.countDocuments(queryObject)

  // --- Fetch notes ---
  const notes = await Note.find(queryObject)
    .sort(sort)
    .skip(skip)
    .limit(limitNum)

  // --- Return response ---
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
    pet: petId
  })
  if(!note){
    throw new NotFoundError(`No note with the id: ${noteId}`)
  }
  res.status(StatusCodes.OK).json(note)
}


const createNote = async (req, res) => {
  req.body.pet = req.params.petId
  req.body.createdBy = req.user.userId  
  const note = await Note.create(req.body)
  res.status(StatusCodes.CREATED).json({ note })
}

const updateNote = async (req,res) => {
  const { petId, noteId } = req.params

  //  Find the note first to check ownership
  const noteToCheck = await Note.findOne({ 
    _id: noteId, 
    pet: petId 
  })
  if (!noteToCheck) {
    throw new NotFoundError(`No note with the id: ${noteId}`)
  }
  if (!noteToCheck.createdBy || noteToCheck.createdBy.toString() == req.user.userId) {
    throw new UnauthorizedError("You are not allowed to modify this note")
  }

  const updatedNote = await Note.findOneAndUpdate({
    _id: noteId,
    pet: petId,
  }, 
  req.body,
  {new: true, runValidators:true} 
  )
  res.status(StatusCodes.OK).json(updatedNote)
  }


const deleteNote = async (req,res) => {
  const { petId, noteId } = req.params
  //  Find the note first to check ownership
  const noteToCheck = await Note.findOne({ 
    _id: noteId, 
    pet: petId 
  })
  if (!noteToCheck) {
    throw new NotFoundError(`No note with the id: ${noteId}`)
  }
  if (!noteToCheck.createdBy || noteToCheck.createdBy.toString() == req.user.userId) {
    throw new UnauthorizedError("You are not allowed to delete this note")
  }
  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    pet: petId
  })
 
  res.status(StatusCodes.OK).json(deletedNote)
}


module.exports = {
  getPetNotes,
  getNote,
  updateNote,
  createNote,
  deleteNote,
}