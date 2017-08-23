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
  ReplyTo: String,
  ReplyToId: mongoose.Schema.Types.ObjectId,
  Author: String,
  AuthorId: mongoose.Schema.Types.ObjectId,
  Body: String,
  Votes: {
    up: mongoose.Schema.Types.ObjectId,
    down: mongoose.Schema.Types.ObjectId,
  },
  DateCreated: { type: Date, default: Date.now },
  Comments: [ mongoose.Schema.Types.ObjectId ],
  children: [ mongoose.Schema.Types.ObjectId ],
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('Thread', ThreadSchema);

