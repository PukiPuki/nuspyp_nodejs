import _ from 'lodash';
import Module from '../models/modules';

/**
 * List
 */
export function all(req, res) {
  Module.find({}).exec((err, modules) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(modules);
  });
}

export default {
  all,
};
