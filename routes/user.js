var express=require('express')
var router=express.Router();
const {check}=require("express-validator")
const {signup,signin,signout,isSignedIn,isAuthenticated, isAdmin,googlelogin}=require("../controllers/auth");
const { getUser, deleteUser,getUserById,getAlluser,getUserStatus,getUserName, getadmincount,getstudentscount, userisnew, userapp } = require('../controllers/user');

const { route } = require('./newApplication');

router.post("/signup",[
    check("name").isLength({min:2}).withMessage("name must be two character long"),
    check("email").isEmail().withMessage("Enter correct email"),
    check("password").isLength({min:8}).withMessage("password lenght must be 8 or more")
],signup)
router.post("/signin",[
    check("email").isEmail().withMessage("Enter correct email"),
    check("password").isLength({min:1}).withMessage("enter password")
],signin)

router.post("/googlelogin",googlelogin)
//TODO

router.get("/signout",signout)

router.param("userId",getUserById);
router.get("/u/:userId",getUser)
router.delete("/delete/:userId",isSignedIn,isAuthenticated,isAdmin,deleteUser);
router.get("/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAlluser);


router.get("/status/:userId",getUserStatus);
router.get("/isnew/:userId",userisnew);
router.get("/application/:userId",userapp);
router.get("/count/student",getstudentscount);
router.get("/count/admin",getadmincount);
module.exports=router;