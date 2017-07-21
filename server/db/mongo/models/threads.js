/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ThreadSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  ModuleCode: String,
  Year: Number,
  Sem: Number,
  QuestionNumber: String,
  Title: String,
  Body: String,
  Comments: { mongoose.Schema.Types.ObjectId }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('Thread', ThreadSchema);

