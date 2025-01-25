const { model, Schema } = require("mongoose")

const common={
    trim:true,
    type:String
}
const blogschema = new Schema({
    blog_title:{
        ...common,
        unique:true
    },
    blog_category:common,
    blog_auther:common,
    blog_content:common,
    blog_date:common,
    blog_desc:common,
    blog_image:String
})

const Blog = model("Blog", blogschema)
module.exports = Blog