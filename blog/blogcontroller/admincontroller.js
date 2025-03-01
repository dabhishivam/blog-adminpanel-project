const { plainTohash, hashToplain } = require('../../utils/password')
const Admin = require('../blogmodel/adminmodel')
const jwt = require('jsonwebtoken')
exports.register = async(req,res)=>{
try {
        console.log(req.body)
        const {username,email,password,confirm_password} = req.body
        const existEmail = await Admin.findOne({email}).countDocuments().exec()
        console.log(existEmail)
        if(existEmail>0){
            res.json("email already exist")
        }else{
            const hashpass = await plainTohash(password)
            await Admin.create({username,email,password:hashpass})
            res.redirect('/login')
        }
} catch (error) {
    res.json(error)
}
}

exports.login = async(req,res)=>{
   try {
     console.log(req.body)
     const {email,password} = req.body
     const existEmail = await Admin.findOne({email}).countDocuments().exec()
     if(existEmail>0){
         const admin = await Admin.findOne({email})
         console.log(admin)
             const match_pass = await hashToplain(password, admin.password)
             if(match_pass){
                const payload = {
                    id:admin._id,
                    role_id:admin.role_id
                }
                // set data into cookie 
                const token = jwt.sign(payload, "mykey", {expiresIn: "1h"})
                // console.log("token...")
                // console.log(token)
                res.cookie('admin',token,{httpOnly:true,maxAge:60*60*1000})
                 res.redirect('/')
             }else{
                 res.json("your password is not match")
             }
     }else{
         res.json("email is not exist")
     }
   } catch (error) {
    res.json(error)
   }
}

exports.updateProfile = async (req,res)=>{
   try {
     console.log(req.body)
     console.log(req.file)
     const {username,email } = req.body
     const existEmail = await Admin.findOne({email}).countDocuments().exec()
    
     if(existEmail>0){
         await Admin.updateOne(
             {email:email},
             {
                 username,
                 admin_profile:req?.file?.filename

             }
         )
         res.redirect('/myProfile')
     }else{
         res.json("your email is not exist")
     }
   } catch (error) {
    res.json(error)
   }
}

exports.ChangePassword = async (req,res)=>{
    // console.log(req.body)
    const {email,password,new_password,confirm_password} = req.body
    const existEmail = await Admin.findOne({email}).countDocuments().exec()

    if(existEmail>0){
        const admin = await Admin.findOne({email})
        const match  = await  hashToplain(password,admin.password)
        if(match) {
            if(new_password===confirm_password){
                const hashpass = await plainTohash(new_password)

                await Admin.updateOne(
                    {email:email},
                    {
                        password:hashpass
                    }
                )
                res.redirect('/')
            }else{
                res.json("consirm password does not match")
            }
        }else{
            res.json("password not match")
        }
    }else{
        res.json("email is not exist")
    }
}