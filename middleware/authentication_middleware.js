//current logged in user is always available through req.user
function authorise (req,res,next) {
    if (!req.user) {
        return res.redirect(`/login`);
    }
    next();
};

function alreadyLoggedIn (req,res,next) {
    if (req.user) {
        return res.redirect(`/dashboard`);
    }
    next();
}

module.exports = {
    authorise,
    alreadyLoggedIn
};