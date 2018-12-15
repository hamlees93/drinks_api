const express = require("express");
const router = express.Router();
const { authorise, alreadyLoggedIn } = require(`./../middleware/authentication_middleware`);
const { celebrate, Joi } = require(`celebrate`);
const AuthenticationController = require(`./../controllers/authentication_controller`);

router.get("/", (req, res) => res.send("Welcome"));


//email, password, name
router.post(`/register`, celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationController.create);

router.get(`/success`, (req,res) => res.send(`Great success!`));

//email, password
// router.post(`/login`, (req, res) => res.send("Welcome") );

//user --> user_info
// router.get();

//user --> update user_info
// router.put();
// router.patch();

//list all drinks
// router.get(`/drinks`, (req, res) => res.send("List all drinks"));

//Add new drinks --> name,type,subtype,size(ml),alcohol_percentage,price,locations,timestamp
// router.post(`/drinks`);

//increase the amount of drinks and add a time stamp
//decrease the amount of drinks and remove the last time stamp
// router.put();
// router.patch();

module.exports = router;