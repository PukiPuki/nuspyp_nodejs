/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const FsSchema = new mongoose.Schema({
  ModuleCode: String,
  Year: String,
  Sem: String,
  Page: String,
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('fs.file', FsSchema);

