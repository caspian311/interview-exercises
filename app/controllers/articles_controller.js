var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
    app.use('/', router);
};

function allArticles(req, res) {
    db.Article.findAll().success(function (articles) {
        res.status(200).send(articles).end();
    });
}

router.get('/service/articles', allArticles);
