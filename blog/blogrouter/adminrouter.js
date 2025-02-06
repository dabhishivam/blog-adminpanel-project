const admincontroller = require('../blogcontroller/admincontroller')
const upload = require('../../middleware/upload')
const router = require('express').Router()
const passport = require('passport')
router.post('/register', admincontroller.register)
// router.post('/login', admincontroller.login)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect :'/' }), admincontroller.login)
router.post('/updateProfile',  upload.single('admin_profile') , admincontroller.updateProfile)
router.post('/ChangePassword', admincontroller.ChangePassword)


module.exports = router
