const express=require("express");
const { isAdmin,isSignedIn,isAuthenticated} = require("../controllers/auth");
const { getNoticeById, getNoticeCount, createNotice, getAllNotice, getNotice, deleteNotice, updateNotice, attachment } = require("../controllers/notice");
const { getUserById } = require("../controllers/user");
const router=express.Router();

router.param("noticeID",getNoticeById);
router.param("userId",getUserById)

router.get('/notice/count',getNoticeCount)
router.get('/notice/all',getAllNotice)
router.get('/notice/:noticeID',getNotice)
router.get('/notice/attachment/:noticeID',attachment)

router.post('/notice/create/:userId',isSignedIn,isAuthenticated,isAdmin,createNotice)
router.put('/notice/:noticeID',updateNotice)
router.delete('/notice/:noticeID/:userId',isSignedIn,isAuthenticated,isAdmin,deleteNotice)
module.exports=router