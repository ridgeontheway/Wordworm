import { Schema, model } from 'mongoose'

const bookProgressSchema = new Schema({
    title: String,
    wordsRead: Number, 
    userIDReading: String
})

export const bookProgress = model('UserBookProgression', bookProgressSchema)