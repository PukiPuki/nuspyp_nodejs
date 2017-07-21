import _ from 'lodash';
import Module from '../models/modules';
import Paper from '../models/papers';
import Thread from '../models/threads';
import mongoose from 'mongoose';

import * as types from '../../../../app/types'
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
  const query = {"ModuleCode": req.params.moduleCode.toUpperCase()}
  Paper.find(query).exec((err, papers) => {
    if(err) {
      console.log('err');
      return res.status(500).send('wrong data');
    }
    const type = types.PAPERS_REQUEST_SUCCESS;
    const data = papers;
    return res.json({ type, data });
  });
}

export function getThreads(req, res) {
  const { moduleCode, yearSem } = req.params
  const type = types.THREADS_REQUEST_SUCCESS;
  const data = {moduleCode, yearSem};
  return res.json({ type, data })
}

export function postThread(req, res) {
  Thread.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    return res.status(200).send('OK');
  });
}

export default {
  all,
  getPapers,
  getThreads,
};
