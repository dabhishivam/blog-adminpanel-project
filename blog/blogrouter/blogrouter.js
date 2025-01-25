const upload = require('../../middleware/upload')
const blogcontroller = require('../blogcontroller/blogcontroller')

const router = require('express').Router()
router.post('/', upload.single('blog_image'),blogcontroller.store)
router.get('/', blogcontroller.index)
router.get('/:id', blogcontroller.trash)
router.post('/:id', upload.single('blog_image'), blogcontroller.update)


module.exports = router