const router = require('express').Router()
const Admin = require('../blog/blogmodel/adminmodel')
const Blog = require('../blog/blogmodel/blogmodel')
const {  accesspage } = require('../utils/accesspage')


router.get('/', accesspage, async(req, res) =>{
    // res.render("pages/index")
    // console.log(req.cookies.admin)
    res.render("pages/index")
})

router.get('/addBlog',accesspage, async(req,res)=>{
    res.render('pages/addBlog')
})

router.get('/viewBlog',accesspage, async(req,res)=>{
    const blog = await Blog.find()
    res.render('pages/viewBlog',{
        blog
    })
})

router.get('/updateBlog',accesspage, async(req,res)=>{
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

router.get('/logout',accesspage, async(req,res)=>{
    // res.clearCookie('admin')
    // res.redirect('/login')
    req.logout((err)=>{1
        if(err){
            console.log(err)
        }else{
            res.redirect('/login')
        }
    })
})

router.get('/myProfile',accesspage, async(req,res)=>{
    // const cookieadmin = req.user.admin
    // console.log(cookieadmin)
    const email = req.user.email
    const singleAdmin = await Admin.findOne({email})
    console.log(singleAdmin)
    res.render('pages/myProfile',{admin:singleAdmin})
})

router.get('/ChangePassword',accesspage, async(req,res)=>{
    const email =req.user.email
    res.render('pages/ChangePassword', {email})
})

module.exports = router