const mongoose = require ('mongoose')

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'Please provide a name'],
    minLength: 2,
    maxLength: 50,
  },
  species: {
    type: String,
    required: [true,'Please provide species'],
  }, 
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: "female"
  },
  birthDate: {
    type: Date,
    required: [true, 'Please provide a date of birth']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"]
  },
   image: {
    type: String,
    default: null
  }
},{ timestamps: true})


module.exports = mongoose.model('Pet', PetSchema)