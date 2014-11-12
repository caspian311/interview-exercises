var request = require('supertest')
    , express = require('express')
, db = require('../../app/models');

describe.only('/articles', function() {
    beforeEach(function(done) {
        db.sequelize
            .sync()
            .complete(done);
    });

    describe('GET', function() {
        beforeEach(function(done) {
            db.Article.findAll().success(function(articles) {
                articles.forEach(function(article) {
                    article.destroy();
                });

                db.Article.create({
                    title: 'title 1',
                    url: 'url 1',
                    text: 'text 1'
                }).success(function() {
                    done();
                });
            });
        });

        afterEach(function(done) {
            db.Article.findAll().success(function(articles) {
                articles.forEach(function (article) {
                    article.destroy();
                });

                done();
            });
        });

        it('should return a 200', function(done) {
            var app = express();

            app.get('/user', function(req, res){
                res.send(200, { name: 'tobi' });
            });

            request(app)
                .get('/articles')
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.empty;

                    console.dir(res.body);

                    done();
                });
        });
    });
});

