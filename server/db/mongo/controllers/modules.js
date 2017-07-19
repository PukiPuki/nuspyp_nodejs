import _ from 'lodash';
import Module from '../models/modules';
import Paper from '../models/papers';
import mongoose from 'mongoose';

/**
 * List
 */
export function all(req, res) {
  Module.find(mongoose.Types.ObjectId("596ee5cdeff7d546a7c59ca1")).exec((err, modules) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(modules[0].ModuleList);
  });
}

export function getPapers(req, res) {
  const query = {"ModuleCode": req.params.id.toUpperCase()}
  Paper.find(query).exec((err, papers) => {
    if(err) {
      console.log('err');
      return res.status(500).send('wrong data');
    }
    return res.json(papers);
  });
}

export default {
  all,
  getPapers,
};
