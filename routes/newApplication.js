const express=require("express");
const router=express.Router();

const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")
const {createNewApplication,getnewApplicationById,getapplication,updateAstatus,deleteNewApplication,getnewApplicationByuser,photo,scorecard,marksheet, getAllApplication,getApplication, getapplicationcount
}=require("../controllers/newApplication")

router.param("userId",getUserById);
router.param("appId",getnewApplicationById);

router.get("/new/application/:appId",getapplication)

router.post("/newapplication/create/:userId",isSignedIn,isAuthenticated,createNewApplication);
// router.get("/product/:productId",getProduct);
// router.get("/product/photo/:productId",photo);

router.get("/new/application/:appId/:userId",isSignedIn,isAuthenticated,isAdmin,getApplication);
router.get("/new/application/photo/:appId/:userId",isSignedIn,isAuthenticated,isAdmin,photo);
router.get("/new/application/marksheet/:appId/:userId",isSignedIn,isAuthenticated,isAdmin,marksheet);
router.get("/new/application/scorecard/:appId/:userId",isSignedIn,isAuthenticated,isAdmin,scorecard);

router.put("/update/:appId/:userId",isSignedIn,isAuthenticated,isAdmin,updateAstatus);
router.delete("/new/delete/:appId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteNewApplication);
// router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);


 router.get("/new/applications/:userId",isSignedIn,isAuthenticated,isAdmin,getAllApplication);
 
router.get("/count/application",getapplicationcount);

module.exports=router;