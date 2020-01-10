import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
   googleID: String
})

export const Users = mongoose.model('Users', userSchema)