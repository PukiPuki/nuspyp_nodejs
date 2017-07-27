import User from '../models/user';
import ivle_api_key from '../../../../config/lapi.js';
import request from 'request';

import * as types from '../../../../app/types'

/**
 * POST /login
 */

export function getUser(req, res, next) {
  const token = req.params.token;
  const url = `https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=${ivle_api_key}&Token=${token}`

  request(url, function (error, response, body){
    if (!error && response.statusCode == 200) {
      const userid = body.substring(1,9);
      const data = {type: types.NUS_LOGIN_SUCCESS, userid};
      return res.send(data);
      }
    })
}

export function fetchModList(req, res, next) {
  const token = req.params.token;
  const url = `https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=${ivle_api_key}&AuthToken=${token}&Duration=10&IncludeAllInfo=false`;
  
  request(url, function (error, response, body){
    if (!error && response.statusCode == 200) {
      const userid = body.substring(1,9);
      const data = {type: types.FETCH_MODULE_LIST, userid};
      return res.send(data);
      }
    })
}

export function validate(req, res, next) {
  const token = req.params.token;
		const url = `
https://ivle.nus.edu.sg/api/Lapi.svc/Validate?APIKey=${ivle_api_key}&Token=${token}`;
				request(url, function(error, response, body){
				if (error || response.statusCode != 200) {
					console.error(err.message);
				} else {
					console.log("Body:");
					console.log(body);
					const result = {type:types.VALIDATE, success:body};
					return res.send(result);
				}
			});
}

/**
 * POST /signup
 * Create a new local account
 */
export function nusSignUp(req, res, next) {
  const token = req.query.token;
  const user = new User({
    password: req.body.password, 
    token
  });

  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.sendStatus(401);
        return res.sendStatus(200);
      });
    });
  });
}

/**
 * POST /logout
 */
export function nusLogout(req, res) {
  req.logout();
  res.sendStatus(200);
}

export default {
	getUser,
	fetchModList,
	validate,
	nusSignUp,
	nusLogout
};

