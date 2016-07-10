import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    wordId: { type: 'Number', required: true },
    content: { type: 'String', required: true },
    createdDate: { type: 'Date', default: Date.now, required: true },
    modifiedDate: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Word', wordSchema);