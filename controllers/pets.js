const getAllPets = async (req,res) => {
  res.send('get all pets')
}

const getPet = async (req,res) => {
  res.send('get a pet')
}

const createPet = async (req,res) => {
  res.json(req.user)
}

const updatePet = async (req,res) => {
  res.send('get all pets')
}

const deletePet = async (req,res) => {
  res.send('get all pets')
}


module.exports = {
  getAllPets,
  getPet,
  updatePet,
  createPet,
  deletePet,
}