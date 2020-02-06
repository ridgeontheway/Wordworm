import { Schema, model } from 'mongoose'

const userSchema = new Schema({
   googleID: String, 
   currentlyReading: [{
      type: Schema.Types.ObjectId,
      ref: 'UserBookProgression',
   }]
})

export const Users = model('Users', userSchema)