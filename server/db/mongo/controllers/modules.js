import _ from 'lodash';
import Module from '../models/modules';
import Paper from '../models/papers';
import Thread from '../models/threads';
import Comment from '../models/comments';
import mongoose from 'mongoose';

import * as types from '../../../../app/types'
/**
 * List
 */
export function all(req, res) {
  Module.find({_id: mongoose.Types.ObjectId("596ee5cdeff7d546a7c59ca1")}).exec((err, modules) => {
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
  const ModuleCode = moduleCode;
  const Year = Number.parseInt(yearSem.substring(0,4));
  const Sem = Number.parseInt(yearSem.substring(4,5));
  const query = { ModuleCode, Year, Sem }
  console.log(query);
  Thread.find(query).sort({DateCreated:'descending'}).exec((err, threads) => {
    if(err) {
      console.log('err');
      return res.status(500).send('wrong data');
    }
    const data = threads
    //console.log(data)
    return res.json({ type, data });
  })
}

export function postThread(req, res) {
  console.log(req)
  Thread.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    return res.status(200).send('Updated successfully');
  });
}

export function postCommentToThread(req, res) {
  Comment.create(req.body, (err, comment) => {
    Thread.findOneAndUpdate(
      {_id: comment.ReplyToId},
      {$push: {Comments: {_id: mongoose.Types.ObjectId(comment._id)}}},
      {safe: true, upsert: true},
      (err, thread) => {
        return res.json(thread)
    })
  })
}

export function postCommentToComment(req, res) {
  Comment.create(req.body, (err, comment) => {
    Comment.findOneAndUpdate(
      {_id: comment.ReplyToId},
      {$push: {Comments: {_id: mongoose.Types.ObjectId(comment._id)}}},
      {safe: true, upsert: true},
      (err, thread) => {
        return res.json(thread)
    })
  })
}

function arrayIdToComment(arrayOfId) {
  if(arrayOfId.length == 0) {
    return [];
  } else {

    const objectOfComments = arrayOfId.map((comment, key) => {
      return {"_id": comment}
    })

    Comment
      .find({"$or": objectOfComments})
      .sort({DateCreated: -1})
      .exec((err, arrayOfComments) => {
        return (
          arrayOfComments.map((each) => {
            return arrayIdToComment(each.Comments);
          })
        )
      })
  }
}



export function getArrayOfComments(req, res) {
  const arrayOfComments = req.body
  const objectOfComments = arrayOfComments.map((comment, key) => {
    return {"_id": comment}
  })

  console.log("objectOfComments");
  console.log(objectOfComments);

  Comment
    .find({"$or": objectOfComments})
    .sort({DateCreated: -1})
    .exec((err, arrayOfComments) => {

      const throwback2 = arrayOfComments.map((each) => {
        each.Comments = arrayIdToComment(each.Comments);
        return each;
      })
      console.log("throwback2");
      console.log(throwback2);
    return res.json(throwback2);
  })
}

export default {
  all,
  getPapers,
  getThreads,
  postThread,
  postCommentToThread,
  postCommentToComment,
  getArrayOfComments,

};
