var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/service/articles', function (req, res) {
  db.Article.findAll().success(function (articles) {
    res.status(200).send(articles).end();
  });
});
