/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
	id: String,
  ModuleCode: String,
  ModuleTitle: String,
  Semesters:  []
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('Module', ModuleSchema);

