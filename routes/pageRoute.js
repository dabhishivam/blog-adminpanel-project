const router = require('express').Router()
const Admin = require('../blog/blogmodel/adminmodel')
const Blog = require('../blog/blogmodel/blogmodel')
const {  accesspage } = require('../utils/accesspage')


router.get('/', async(req, res) =>{
    // res.render("pages/index")
    console.log(req.cookies.admin)
    accesspage(req,res,"pages/index")
})

router.get('/addBlog', async(req,res)=>{
    accesspage(req,res,'pages/addBlog')
})

router.get('/viewBlog', async(req,res)=>{
    const blog = await Blog.find()
    res.render('pages/viewBlog',{
        blog
    })
})

router.get('/updateBlog', async(req,res)=>{
    const {id} = req.query
    const singleBlog = await Blog.findById(id)
    res.render('pages/updateBlog',
        {blog:singleBlog}
    )
})

router.get('/register', async(req,res)=>{
    res.render('pages/register')
})

router.get('/login', async(req,res)=>{
    res.render('pages/login')
})

router.get('/logout', async(req,res)=>{
    res.clearCookie('admin')
    res.redirect('/login')
})

router.get('/myProfile', async(req,res)=>{
    const cookieadmin = req.cookies.admin
    console.log(cookieadmin)
    const email = cookieadmin.email
    const singleAdmin = await Admin.findOne({email})
    console.log(singleAdmin)
    res.render('pages/myProfile',{admin:singleAdmin})
})


module.exports = router