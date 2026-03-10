const Pet = require('../models/Pet')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllPets = async (req,res) => {
  const pets = await Pet.find({createdBy: req.user.userId}).sort('createdAt')
  res.status(StatusCodes.OK).json({pets, count: pets.length})
}

const getPet = async (req,res) => {
  const {user: {userId}, params:{petId}} = req
  const pet = await Pet.findOne({
    _id: petId,
    createdBy: userId
  })
  if(!pet){
    throw new NotFoundError(`No pet with the id: ${petId}`)
  }
  res.status(StatusCodes.OK).json(pet)
}

const createPet = async (req,res) => {
  req.body.createdBy = req.user.userId
  const pet = await Pet.create(req.body)
  res.status(StatusCodes.CREATED).json({pet})
}

const updatePet = async (req,res) => {
  const { user: {userId}, params:{petId}} = req
  const pet = await Pet.findOneAndUpdate({
    _id: petId,
    createdBy: userId
  }, 
  req.body,
  {returnDocument: 'after', runValidators:true} 
  )
  if(!pet){
    throw new NotFoundError(`No pet with the id: ${petId}`)
  }
  res.status(StatusCodes.OK).json(pet)
}

const deletePet = async (req,res) => {
  const { user: {userId}, params:{petId}} = req
  const pet = await Pet.findOneAndDelete({
    _id: petId,
    createdBy: userId
  })
  if(!pet){
    throw new NotFoundError(`No pet with the id: ${petId}`)
  }
  res.status(StatusCodes.OK).json({pet})
}


module.exports = {
  getAllPets,
  getPet,
  updatePet,
  createPet,
  deletePet,
}