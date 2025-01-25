const admincontroller = require('../blogcontroller/admincontroller')
const upload = require('../../middleware/upload')
const router = require('express').Router()

router.post('/register', admincontroller.register)
router.post('/login', admincontroller.login)
router.post('/updateProfile',  upload.single('admin_profile') , admincontroller.updateProfile)


module.exports = router