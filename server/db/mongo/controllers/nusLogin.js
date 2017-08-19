import User from '../models/user';
import ivle_api_key from '../../../../config/lapi.js';
import request from 'request';
import rp from 'request-promise';
import async from 'async'

import * as types from '../../../../app/types';

/**
 * POST /login
 */

export function getUser(req, res, next) {
  const token = req.params.token;
  const url = `https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=${ivle_api_key}&Token=${token}`

  request(url, function (error, response, body){
    if (!error && response.statusCode == 200) {
      const userid = body.substring(1,9);
      const data = {type: types.NUS_LOGIN_SUCCESS, userid:body};
      return res.json(data);
      }
    })
}

export function fetchModList(req, res, next) {
  const token = req.params.token;
  const url = `https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=${ivle_api_key}&AuthToken=${token}&Duration=10&IncludeAllInfo=false`;
  
  request(url, function (error, response, body){
    if (!error && response.statusCode == 200) {
      const userid = body.substring(1,9);
      const data = {type: types.FETCH_MODULE_LIST, modList:body };
      return res.json(data);
      }
    })
}

export function validate(req, res, next) {
  const token = req.params.token;
	const url = `
https://ivle.nus.edu.sg/api/Lapi.svc/Validate?APIKey=${ivle_api_key}&Token=${token}`;
				request(url, function(error, response, body){
				if (error || response.statusCode != 200) {
					console.error(error.message);
				} else {
					const result = {type:types.VALIDATE, success:JSON.parse(body).Success};
					return res.json(result);
				}
			});
}

function validate(token) {
	const url = `
https://ivle.nus.edu.sg/api/Lapi.svc/Validate?APIKey=${ivle_api_key}&Token=${token}`;
	return rp(url, function(error, response, body){
		if (error || response.statusCode != 200) {
			console.error(error.message);
		} else {
		}
	})
	.then((result) => {return {token:JSON.parse(result).Token , success:JSON.parse(result).Success};})
	.catch(function (err) {console.log("Error in validation" + err);});

}

export function injectAll(req, res, next) {
	var token = req.params.token;
	const user = req.user;
	const userID = user._id;
	validate(token).then((result) => {
		if (result.success==true){
			token = result.token;
			function httpGet(url, callback){
				const options = {
					url : url,
					json : true
				};
				request(options, 
					function (error, response, body){
						callback(error, body);
					}
				);
			}
			const urls= [`https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=${ivle_api_key}&Token=${token}`,`https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=${ivle_api_key}&AuthToken=${token}&Duration=10&IncludeAllInfo=false`];

			async.map(urls, httpGet, function(err, result){
				if (err) return console.log(err);
					const modsArr = result[1].Results.map((x)=> {return x.CourseCode;});
					const data = {success:true, userid:result[0], mods: modsArr};
					return res.json(data);
				});
		} else {
		console.log(result);
			console.error("Invalid token, unable to fetch modules");
			const data ={success:false};
			return res.json(data);
		}
	});
}

export function all(req, res, next) {
	const token = req.params.token;
	validate(token).then((result) => {
		if (result.success==true){
			function httpGet(url, callback){
				const options = {
					url : url,
					json : true
				};
				request(options, 
					function (error, response, body){
						callback(error, body);
					}
				);
			}
			const urls= [`https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=${ivle_api_key}&Token=${token}`,`https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=${ivle_api_key}&AuthToken=${token}&Duration=10&IncludeAllInfo=false`];

			async.map(urls, httpGet, function(err, result){
				if (err) return console.log(err);
					const modsArr = result[1].Results.map((x)=> {return x.CourseCode;});
					const data = {success:true, userid:result[0], mods: modsArr};
					return res.json(data);
				});
		} else {
			console.error("Invalid token, unable to fetch modules");
			const data ={success:false};
			return res.json(data);
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
	injectAll,
	all,
	getUser,
	fetchModList,
	validate,
	nusSignUp,
	nusLogout
};

