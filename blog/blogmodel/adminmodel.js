const { Schema, model } = require("mongoose");
const common = {
    type:String,
    requireed:true,
    unique:true,
    trim:true
}
const adminschema = new Schema({
    username:common,
    email:common,
    password:{
        ...common,
        unique:false
    },
    admin_profile:String
},
{
    trimstamps:true
})
const Admin=model("Admin", adminschema)
module.exports = Admin