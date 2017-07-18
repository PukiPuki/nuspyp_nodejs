/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ModuleFSSchema = new mongoose.Schema({
	id: String,
  ModuleCode: String,
  Year: String,
  Sem: String,
  Page: String,
  Type: String,
  Resolution: String,
  FileName: String,
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('fs.files', ModuleFSSchema);

