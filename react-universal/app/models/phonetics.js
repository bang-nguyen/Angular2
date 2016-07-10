import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const phoneticsSchema = new Schema({
    word: { type: Schema.ObjectId, ref: 'Word' },
    path: { type: 'String' },
    accent: { type: 'String', required: true },
    createdDate: { type: 'Date', default: Date.now, required: true },
    modifiedDate: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Phonetics', phoneticsSchema);