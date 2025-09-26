const controller=require('../controller/user.controller')
const express=require('express');
const router=express.Router();

router.post('/signup',controller.signup)

router.post('/signin',controller.signin)

module.exports=router;