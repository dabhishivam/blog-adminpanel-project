exports.accesspage =(req,res,url)=>{
    if(!req.cookies.admin){
        res.redirect('/login')
    }else{
        res.render(url)
    }
}