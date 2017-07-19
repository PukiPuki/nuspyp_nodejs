/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const PapersSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  ModuleCode: String,
  Papers: [
    {Year: String, Sem: String}
  ]

});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Module' collection in the MongoDB database
export default mongoose.model('papers', PapersSchema);

