const router = require('express').Router()
const Admin = require('../blog/blogmodel/adminmodel')
const Blog = require('../blog/blogmodel/blogmodel')
const {  accesspage } = require('../utils/accesspage')
const { verifyToken, isUser, isAdmin } = require('../utils/Auth')


router.get('/', verifyToken,isAdmin,  async(req, res) =>{
    // res.render("pages/index")
    // console.log(req.cookies.admin)
    res.render("pages/index")
})

router.get('/addBlog',verifyToken, isAdmin,async(req,res)=>{
    res.render('pages/addBlog')
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
    // req.logout((err)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         res.redirect('/login')
    //     }
    // })
})

router.get('/myProfile', verifyToken, isAdmin, async(req,res)=>{
    const {id} = req.user
    const singleAdmin = await Admin.findById(id)
    console.log(singleAdmin)
    res.render('pages/myProfile',{admin:singleAdmin})
})

router.get('/ChangePassword', async(req,res)=>{
    const email =req.cookies.email
    res.render('pages/ChangePassword', {email})
})

module.exports = router