var db = require('../../app/models/index');

describe('Articles', function() {
    beforeEach(function(done) {
        db.sequelize
            .sync()
            .complete(done);
    });

    describe('crud operation', function() {
        afterEach(function(done) {
            db.Article.findAll().success(function(articles) {
                articles.forEach(function(article) {
                    article.destroy();
                });
                done();
            });
        });

        beforeEach(function(done) {
            db.Article.findAll().success(function(articles) {
                articles.forEach(function(article) {
                    article.destroy();
                });
                done();
            });
        });

        it('should allow us to create', function(done) {
            db.Article.create({
                title: 'How to use Express!',
                url: 'http://www.asynchrony.com',
                text: 'lots of good stuff'
            }).success(function() {
                db.Article.findAll().success(function(articles) {
                    expect(articles.length).to.equal(1);
                    expect(articles[0].title).to.equal('How to use Express!');

                    done();
                });
            });
        });
    });
});