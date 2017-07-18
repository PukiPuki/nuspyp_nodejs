import _ from 'lodash';
import Module from '../models/modules';
import ModuleFS from '../models/modulesfs';

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

export function getyearsem(req, res) {
  ModuleFS.find({"ModuleCode": req.params.id.toUpperCase()}).distinct("Year").exec((err, years) => {
    if(err) {
      console.log('err');
      return res.status(500).send('wrong data');
    }
    return res.json(years);
  });
}

export default {
  all,
  getyearsem,
};
