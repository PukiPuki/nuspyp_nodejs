/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const modulesController = controllers && controllers.modules;
const nusLoginController = controllers && controllers.nusLogin;

export default (app) => {
  // // user routes
  // if (usersController) {
  //   app.post('/sessions', usersController.nusLogin);
  //   app.post('/users', usersController.nusSignUp);
  //   app.delete('/sessions', usersController.nusLogout);
  // } else {
  //   console.warn(unsupportedMessage('users routes'));
  // }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  // module routes
  if (modulesController) {
    app.get('/api/modules', modulesController.all);
    app.get('/api/modules/:moduleCode', modulesController.getPapers);
    app.get('/api/modules/:moduleCode/:yearSem', modulesController.getThreads);
    app.post('/api/modules/:moduleCode/:yearSem', modulesController.postThread);
    app.post('/api/threads', modulesController.postCommentToThread);
    app.get('/api/threads/:threadId', modulesController.getThread2);
    app.post('/api/comments', modulesController.postCommentToComment);
    app.get('/api/papers/:ModuleCode/:Year/:Sem', modulesController.getPaper);
    app.get('/api/papers/:ModuleCode/:Year/:Sem/:Page/', modulesController.getPaper);
  } else {
    console.warn(unsupportedMessage('modules routes'));
  }

  // module routes
  if (nusLoginController) {
    app.get('/api/login/:token', nusLoginController.getUser);
    app.get('/api/login/fetch/:token', nusLoginController.fetchModList);
    app.get('/api/login/validate:token', nusLoginController.validate);
  } else {
    console.warn(unsupportedMessage('nusLogin routes'));
	}
};
