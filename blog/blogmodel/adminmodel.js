const { Schema, model } = require("mongoose");
const common = {
    type:String,
    required:true,
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
    admin_profile:String,
    token:String,
    // role_id:{
    //     type:String,
    //     required:true,
    //     default:"user",
    //     enum : ["user","admin"]
    // },
    role_id:{
        type:Number,
        required:true,
        default : 0,
        enum:[0,1]
    }
},
{
    timestamps:true
})
const Admin=model("Admin", adminschema)
module.exports = Admin