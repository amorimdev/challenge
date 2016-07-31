var should  = require('should-http'),
    request = require('supertest');

describe('User', function() {
    var url = 'http://52.67.112.155/v1';
    var cookie;

    describe('Login', function() {
        it('Should Return Error: Authentication failed.', function (done) {
            var user = {
                email: 'user@user.com',
                password: '123'
            };
            request(url)
                .post('/login')
                .send(user)
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(401);
                    done();
                });
        });
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
    });
    describe('Signup', function() {
        it('Should Return Error: Email already in use.', function(done) {
            var user = {
                name: 'user',
                email: 'user@user.com',
                password: 'user',
                zipcode: '05735030'
            };

            request(url)
                .post('/signup')
                .send(user)
                .expect('Content-Type', /json/)
                .expect(409)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(409);
                    done();
                });
        });
        it('Should Return Error: Please, fill in all the fields.', function(done) {
            request(url)
                .post('/signup')
                .send({})
                .expect(400)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(400);
                    done();
                });
        });
        it('Should Return Success: Account successfully created.', function(done) {
            var d = new Date(),
                user = {
                    name: 'user',
                    email: d.getTime() + 'user@user.com',
                    password: 'user',
                    zipcode: '05735030'
                };

            request(url)
                .post('/signup')
                .send(user)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('Edit', function() {
        it('Should Return Error: You not have permission to access the page.', function(done){
            var user = {
                name: 'user',
                email: 'user@user.com',
                password: 'user',
                zipcode: '05735030'
            };

            request(url)
                .put('/user')
                .send(user)
                .expect('Content-Type', /json/)
                .expect(403)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(403);
                    done();
                });
        });
        it('Should Return Error: Email already in use.', function(done) {
            var user = {
                email: 'amorim.dev@gmail.com'
            };

            request(url)
                .put('/user')
                .set('Cookie', cookie)
                .send(user)
                .expect('Content-Type', /json/)
                .expect(409)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(409);
                    done();
                });
        });
        it('Should Return Success: Account successfully updated.', function(done){
            var user = {
                name: 'user',
                email: 'user@user.com',
                password: 'user',
                zipcode: '05735030'
            };

            request(url)
                .put('/user')
                .set('Cookie', cookie)
                .send(user)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('Logout', function() {
        it('Should Return Error: You not have permission to access the page.', function (done) {
            request(url)
                .get('/logout')
                .expect(403)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(403);
                    done();
                });
        });
        it('Should Return Success: Successfully logout.', function (done) {
            request(url)
                .get('/logout')
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