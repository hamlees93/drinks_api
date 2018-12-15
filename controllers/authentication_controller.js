const UserModel = require(`./../database/models/user_model`);
const jwt = require(`jsonwebtoken`);

function loginForm(req, res) {
    res.render(`authentication/login_form`);
};

async function loginVerify(req, res) {
    //Search mongoose to see if the email exists, as its unique
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email});

    //If the search returned nothing, i.e. email doesn't exist in database, send them back to the login screen
    if (!user) {
        return res.redirect(`/login`);
    };

    //Use bcrypt to verify password agaisnt encrypted password in database
    const valid = await user.verifyPassword(password);

    //If password does not match, send them back to login screen
    if (!valid) {
        return res.redirect(`/login`);
    };

    //set session on user
    req.session.user = user;
    res.redirect(`/dashboard`);
};

function make(req, res) {
    res.render(`authentication/make`);
};

async function create(req, res, next) {
    const user = await UserModel.create(req.body);
    // const token = jwt.sign({ sub: user._id}, process.env.JWT_SECRET);
    // res.cookie("jwt", token);
    console.log(req.body);
    res.redirect("/success");
};

function logout(req,res) {
    //logout method is only available through passport
    req.logout();
    res.cookie(`jwt`, null, { maxAge: -1 });
    res.redirect(`/`);
};

function generateJWT(req, res) {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.cookie(`jwt`, token);
    res.redirect(`/dashboard`);
};

module.exports = {
    loginForm,
    loginVerify,
    make,
    create,
    logout,
    generateJWT
};

