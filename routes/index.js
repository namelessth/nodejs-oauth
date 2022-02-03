const express = require('express');
const router = express.Router();
const OauthController = require('../controllers/oauthcontroller');
const OAuthServer = require('express-oauth-server');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.oauth = new OAuthServer({
  model: OauthController
});

router.post('/oauth/token', router.oauth.token());

router.post('/oauth/set_client', function (req, res, next) {
  OauthController.setClient(req.body)
    .then((client) => res.json(client))
    .catch((err) => {
      return next(err);
    });
});

router.post('/oauth/signup', function (req, res, next) {
  OauthController.setUser(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
      return next(err);
    });
});

router.get('/secret', router.oauth.authenticate(), function (req, res) {
  res.json('Secret area');
});

module.exports = router;
