
const express = require("express");
const { getApplicationById } = require("../controllers/Application");
const { getnewApplicationById } = require("../controllers/newApplication");
const { payment,paymentsuccess } = require("../controllers/payment");
const { getUserById } = require("../controllers/user");


const router = express.Router();
router.param("appId",getnewApplicationById);
router.param("aId",getApplicationById);
router.param("userId",getUserById);


router.get("/payment",payment);
router.post("/payment/success/:appId/:userId",paymentsuccess);
router.post("/payment/success2/:aId/:userId",paymentsuccess);
module.exports=router;