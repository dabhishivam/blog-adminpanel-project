const bcrypt = require("bcryptjs")

exports.plainTohash = async(password)=>{
    const salt  = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(password,salt)
    console.log(hashpass)
    return hashpass
}


exports.hashToplain = async(password,hash_pass)=>{
    const match_pass = await bcrypt.compare(password,hash_pass)
    console.log(match_pass)
    return match_pass
}