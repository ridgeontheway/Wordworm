import { Schema, model } from 'mongoose'

const bookProgressSchema = new Schema({
    title: String,
    wordsRead: Number
})

export const bookProgress = model('UserBookProgression', bookProgressSchema)