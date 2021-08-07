const express=require("express");
const router=express.Router();

const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")
const {getApplicationById,getapplication,deleteApplication,createApplication,getAllApplication,getapplicationcount}=require("../controllers/Application")

router.param("userId",getUserById);
router.param("appId",getApplicationById);



router.post("/application/create/:userId",isSignedIn,isAuthenticated,createApplication);


router.get("/application/:appId/:userId",isSignedIn,isAuthenticated,getapplication);




router.delete("/delete/:appId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteApplication);



 router.get("/applications/:userId",isSignedIn,isAuthenticated,isAdmin,getAllApplication);
 
router.get("/count/oapplication",getapplicationcount);

module.exports=router;