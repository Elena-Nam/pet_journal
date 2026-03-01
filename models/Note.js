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
    required: [true, 'Please provide the content']
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date']
  },
  pet: {
    type: mongoose.Types.ObjectId,
    ref: "Pet",
    required: [true, "Please provide a pet"]
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"]
    },
},{ timestamps: true})


module.exports = mongoose.model('Note', NoteSchema)