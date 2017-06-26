/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
  code: String,
  papers: [],
  last_update: { type: Date, default: Date.now }
});

const paper_schema = new mongoose.Schema({
  //20171 = 2017 sem 1
  //20172 = 2017 sem 2
  year: Number,
  //
  file: mongoose.Schema.Types.ObjectId
})

const thread_schema = new mongoose.Schema({
  title: String,
  description: String,
  tag: [String],
  author: String,
  thumbnail: mongoose.Schema.Types.ObjectId,

})
// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Topic', TopicSchema);

