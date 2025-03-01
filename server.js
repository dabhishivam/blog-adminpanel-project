const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000


const Router = require('./blog/blogrouter/blogrouter')
const pageview = require('./routes/pageRoute')
const Blog = require('./blog/blogmodel/blogmodel')
const Admin = require('./blog/blogrouter/adminrouter')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const Adminmodel = require('./blog/blogmodel/adminmodel')
const jwt = require('jsonwebtoken')



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/profile', express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('test'))
app.use(session('test2'))

app.use(async (req, res, next) => {


    const token = req.cookies.admin
    if (!token) {
        res.redirect('/login')
    }

    const verifyToken = jwt.verify(token, 'mykey')


    const singleAdmin = await Adminmodel.findById(verifyToken.id)
    res.locals.req = req
    res.locals.res = res
    res.locals.singleAdmin = singleAdmin
    next()
})
// db connect
require('./config/db').dbconnect()
// page routing
app.use('/', pageview)
// api router
app.use('/api/blog', Router)
// admin
app.use('/api/admin', Admin)
app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))