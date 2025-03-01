const jwt = require('jsonwebtoken')

exports.verifyToken = (req,res,next)=>{
        const token = req.cookies.admin
        if(!token){
            res.redirect('/login')
        }

        const verifyToken  = jwt.verify(token,'mykey')
        if(verifyToken){
            req.user = verifyToken
            next()
        }else{
            res.redirect('/login')
        }
}

exports.isUser = (req,res,next)=>{
    console.log("req.user......")
    console.log(req.user)
    const {role_id} = req.user
    if(role_id===0){
        next()
    }else{
        res.json("you are not user")
    }
}

exports.isAdmin = (req,res,next)=>{
    console.log("req.user......")
    console.log(req.user)
    const {role_id} = req.user
    if(role_id===1){
        next()
    }else{
        res.json("you are not admin")
    }
}