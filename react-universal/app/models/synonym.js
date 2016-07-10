import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const synonymSchema = new Schema({
    words: [{ type: Schema.ObjectId, ref: 'Word' }],
    createdDate: { type: 'Date', default: Date.now, required: true },
    modifiedDate: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Synonym', synonymSchema);