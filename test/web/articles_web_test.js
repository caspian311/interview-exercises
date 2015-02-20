var request = require('supertest')
    , express = require('express')
    , expressApp = require('../../config/express')
    , config = require('../../config/config')
    , db = require('../../app/models');

function getApp() {
    var app = express();
    expressApp(app, config);
    return app;
}

describe('GET /articles', function () {
    beforeEach(function (done) {
        db.sequelize.sync().complete(function () {
            db.Article.findAll().success(function (articles) {
                articles.forEach(function (article) {
                    article.destroy();
                });

                db.Article.create({
                    title: 'title 1',
                    url: 'url 1',
                    text: 'text 1'
                }).success(function () {
                    done();
                });
            });
        });
    });

    afterEach(function (done) {
        db.Article.findAll().success(function (articles) {
            articles.forEach(function (article) {
                article.destroy();
            });

            done();
        });
    });

    it('should return a 200', function (done) {
        request(getApp())
            .get('/service/articles')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.not.exist;

                expect(res.body.length).to.equal(1);

                done();
            });
    });
});

