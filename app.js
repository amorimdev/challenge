var express = require('express'),
    app = express(),
    setupPassport = require('./app/setupPassport'),
    appRouter = require('./app/routers/appRouter.js')(express),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jsonParser = bodyParser.json(),
    SequelizeStore = require('connect-session-sequelize')(session.Store),
    sequelize = require('./app/sequelize.js');

var port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(session({
    secret: 'challenge',
    store: new SequelizeStore({
        db: sequelize
    }),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(jsonParser);
app.use(bodyParser.urlencoded({
    extended: true
}));

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.code || 500)
            .json({
                error: {
                    code: err.code || 500,
                    message: err
                }
            });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
        .json({
            error: {
                code: err.code || 500,
                message: err.message
            }
        });
});

setupPassport(app);
app.use('/', appRouter);

app.listen(port);
console.log('Server started on port ' + port);
module.exports.getApp = app;
