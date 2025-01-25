const { default: mongoose } = require("mongoose")

exports.dbconnect=()=>{
    mongoose.connect("mongodb+srv://dabhishivam2006:dabhishivam@crud.kqdwh.mongodb.net/blog")
    .then(()=>{
        console.log("db connect👍")
    })
    .catch((err)=>{
            console.log(err)
    })
}

