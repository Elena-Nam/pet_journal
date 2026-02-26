const mongoose = require ('mongoose')

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'Please provide a title'],
    minLength: 2,
    maxLength: 50,
  },
  category: {
    type: String,
    required: true,
    enum: ['health', 'behavior', 'vet', 'diet', 'other'],
  }, 
  content: {
    type: String,
    required: [true, 'Please provide note content']
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date']
  },
  createdForPet: {
    type: mongoose.Types.ObjectId,
    ref: "Pet",
    required: [true, "Please provide a pet"]
  },
},{ timestamps: true})


module.exports = mongoose.model('Note', NoteSchema)