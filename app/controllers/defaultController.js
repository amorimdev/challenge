var defaultController = {
    home: function (req, res) {
        return res.send({success: {message: 'Welcome!'}});
    }
};

module.exports = defaultController;
