/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  ReplyTo: String,
  ReplyToId: mongoose.Schema.Types.ObjectId,
  Author: String,
  AuthorId: mongoose.Schema.Types.ObjectId
  Body: String,
  Votes: Number,
  DateCreated: { type: Date, default: Date.now },
  Comments: [],
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('Comment', CommentSchema);

