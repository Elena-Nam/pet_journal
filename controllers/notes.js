const getPetNotes = async (req,res) => {
  res.send('get all pet notes')
}

const getNote = async (req,res) => {
  res.send('get a note')
}

const createNote = async (req,res) => {
  res.send('create a note')
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