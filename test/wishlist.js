var should  = require('should-http'),
    request = require('supertest');

var url = 'http://52.67.112.155/v1';
var cookie, id;

describe('Wishlist', function() {
    it('Should Return Success: Successfully login.', function (done) {
        var user = {
            email: 'user@user.com',
            password: 'user'
        };
        request(url)
            .post('/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                cookie = res.get('set-cookie');
                res.should.have.status(200);
                done();
            });
    });
    describe('Create', function() {
        it('Should Return Error: You not have permission to access the page.', function (done) {
            request(url)
                .post('/wishlist')
                .expect(403)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(403);
                    done();
                });
        });
        it('Should Return Error: Please, fill in all the required fields.', function (done) {
            request(url)
                .post('/wishlist')
                .set('Cookie', cookie)
                .send({})
                .expect('Content-Type', /json/)
                .expect(422)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(422);
                    done();
                });
        });
        it('Should Return Success: Wishlist successfully save.', function (done) {
            var wishlist = {
                name: "My Wish",
                description: "Work on F(X)",
                averageValue: 123.45
            };
            request(url)
                .post('/wishlist')
                .set('Cookie', cookie)
                .send(wishlist)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    id = res.body.success.wishlist.id;
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('ListAll', function() {
        it('Should Return Error: You not have permission to access the page.', function (done) {
            request(url)
                .get('/wishlist')
                .expect(403)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(403);
                    done();
                });
        });
        it('Should Return Success: Wishlist successfully save.', function (done) {
            request(url)
                .get('/wishlist')
                .set('Cookie', cookie)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('List', function() {
        it('Should Return Error: You not have permission to access the page.', function (done) {
            request(url)
                .get('/wishlist/' + id)
                .expect(403)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(403);
                    done();
                });
        });
        it('Should Return Error: Wishlist does not found.', function (done) {
            request(url)
                .get('/wishlist/0')
                .set('Cookie', cookie)
                .expect(404)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(404);
                    done();
                });
        });
        it('Should Return Success: Wishlist successfully save.', function (done) {
            request(url)
                .get('/wishlist/' + id)
                .set('Cookie', cookie)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('Edit', function() {
        it('Should Return Error: You not have permission to access the page.', function (done) {
            request(url)
                .put('/wishlist/' + id)
                .expect(403)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(403);
                    done();
                });
        });
        it('Should Return Error: Wishlist does not found.', function (done) {
            request(url)
                .put('/wishlist/0')
                .set('Cookie', cookie)
                .expect(404)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(404);
                    done();
                });
        });
        it('Should Return Success: Wishlist successfully save.', function (done) {
            var wishlist = {
                name: "My Wish",
                description: "Work on F(X)",
                averageValue: 123.45
            };
            
            request(url)
                .put('/wishlist/' + id)
                .set('Cookie', cookie)
                .send(wishlist)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('Delete', function() {
        it('Should Return Error: You not have permission to access the page.', function (done) {
            request(url)
                .delete('/wishlist/' + id)
                .expect(403)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(403);
                    done();
                });
        });
        it('Should Return Error: Wishlist does not found.', function (done) {
            request(url)
                .delete('/wishlist/0')
                .set('Cookie', cookie)
                .expect(404)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(404);
                    done();
                });
        });
        it('Should Return Success: Wishlist successfully save.', function (done) {
            request(url)
                .delete('/wishlist/' + id)
                .set('Cookie', cookie)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    });
});