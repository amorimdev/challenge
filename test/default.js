var should  = require('should-http'),
    request = require('supertest');

var url = 'http://52.67.112.155/v1';
var cookie;

describe('Default', function() {
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
    describe('Home', function() {
        it('Should Return Error: You not have permission to access the page.', function (done) {
            request(url)
                .get('/')
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
                .get('/')
                .set('Cookie', cookie)
                .expect('Content-Type', /json/)
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