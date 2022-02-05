const protect = (req, res, next) => {
    const { user } = req.session;
    if (!!user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ status: 'fail', message: 'You are not authorized' });
    } 
};

module.exports = protect;