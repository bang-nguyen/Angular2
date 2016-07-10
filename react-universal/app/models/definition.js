import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const definitionSchema = new Schema({
    wordId: { type: 'Number', ref: 'Word' },
    content: { type: 'String' },
    type: { type: 'String', required: true },
    synonym: { type: Schema.ObjectId, ref: 'Synonym' },
    createdDate: { type: 'Date', default: Date.now, required: true },
    modifiedDate: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Definition', definitionSchema);