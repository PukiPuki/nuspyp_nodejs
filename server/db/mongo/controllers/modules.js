import _ from 'lodash';
import Module from '../models/modules';
import Paper from '../models/papers';
import Thread from '../models/threads';
import Comment from '../models/comments';
import Fs from '../models/fs';
import mongoose from 'mongoose';


import * as types from '../../../../app/types'
/**
 * List
 */

import fs from 'mongoose-gridfs';
const newConn = mongoose.createConnection('mongodb://localhost/ReactWebpackNode')
const gridfs = fs({
  collection:'fs',
  mongooseConnection: newConn
});
const gfs = gridfs.model


// test.readById(mongoose.Types.ObjectId('596aeab7eff7d5653a5e40c1'), function(error, buffer){
//   console.log(error)
//   console.log(buffer);
// });

export function getPaper(req, res) {
  Fs.find(req.params).exec((err, paper) => {
    if(err) {
      return res.status(500).send('Something went wrong getting the data');
    }
    return paper;
  }).then((pass) => {
    const trans = pass.map((each) => {
      return each._id;
    })
    return trans
  }).then((pass) => {
    const trans = pass.map((each) => {
      gfs.readById(each, function(error, buffer){

        return res.send(buffer)

        // res.write(buffer,'binary')
        // res.end(null,'binary')

      })
    });
  })
}

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
      {$push: {
        Comments: {_id: mongoose.Types.ObjectId(comment._id)},
        children: {_id: mongoose.Types.ObjectId(comment._id)},
      }},
      {safe: true, upsert: true},
      (err, thread) => {
        return res.json(thread)
    })
  })
}
export function postCommentToComment(req, res) {
  console.log("req.body")
  console.log(req.body)
  Comment.create(req.body, (err, comment) => {
    console.log("comment")
    console.log(comment)
    Comment.findOneAndUpdate(
      {_id: comment.ReplyToId},
      {$push: {
        Comments: {_id: mongoose.Types.ObjectId(comment._id)},
        children: {_id: mongoose.Types.ObjectId(comment._id)},
      }},
      {safe: true, upsert: true},
      (err, thread) => {
        return res.json(thread)
    })
  })
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

export function updateComment(req, res) {
  Comment.findOneAndUpdate(
    {_id: req.params.commentId},
    {$set: {Body: req.body.Body}},
    (err, comment) => {
      if(err) {
        console.log(err);
        return res.status(500).send('Something went wrong getting the data');
      }
      console.log(comment);
      return res.status(200).send('OKAY! HEAVY MACHINEGUN!');
    }
  )
}

export function getThread2(req, res) {
  const threadId = req.params.threadId;
  Thread.aggregate([
    {$match: { _id: mongoose.Types.ObjectId(threadId) }},
    {
      $graphLookup: {
      from: 'comments',
      startWith: '$Comments',
      connectFromField: 'Comments',
      connectToField: '_id',
      as: 'Comments'
      }
    }
  ]).exec((err, thread) => {
    const type = types.ONE_THREAD_REQUEST_SUCCESS;
    const raw = thread[0]

    // ineffficient algorithm to reconstruct
    const tree2 = (comment, record) => {
      if(comment.children.length==0) {
        return comment;
      } else {
        const mycomment = comment.children.map((each) => {
            const logthis = record.find((one) => {
              return each.equals(one._id)
            })
            return tree2(logthis, record);
        })
        comment.Comments = mycomment
        return comment
      }
    }

    const data = tree2(raw, raw.Comments)

    return res.json({type, data});
  })
}

export default {
  all,
  getPapers,
  getThreads,
  getThread2,
  postThread,
  postCommentToThread,
  postCommentToComment,
  getPaper,
  updateComment,
};
