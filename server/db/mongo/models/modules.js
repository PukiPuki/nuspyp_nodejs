/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
  ModuleList: [],
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('modules', ModuleSchema);

