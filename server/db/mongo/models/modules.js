/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
	id: String,
  ModuleCode: String,
  ModuleTitle: String,
  AcadYear: String,
  Department: String,
  ModuleDescription: String,
  ModuleCredit: String,
  Workload: String,
  Preclusion: String,
  CorsBiddingStats: [{}],
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('Module', ModuleSchema);

