/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ThreadSchema = new mongoose.Schema({
  ModuleCode: String,
  Year: Number,
  Sem: Number,
  QuestionNumber: String,
  Title: String,
  Body: String,
  Author: String,
  Votes: Number,
  DateCreated: { type: Date, default: Date.now },
  Comments: [ mongoose.Schema.Types.ObjectId ],
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('Thread', ThreadSchema);

