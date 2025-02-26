const db=require('../database/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretOrPublicKey='asdfjsdflsjfl'

const Register=async (req,res)=>{
    let errors=[]
    let {username,password}=req.body

    if(typeof username!='string') username=''
    if(typeof password!='string') password=''

    username=username.trim()

    if(!username){
        errors.push('You must provide a username')
    }else{
        if(username.length<3) errors.push('Username must be at least 3 characters.')
        if(username.length>10) errors.push('Username cannot exceed 10 characters.')
        if(Number(username[0])) errors.push('Username first character cannot be a number')
    }
    
    if(!password){
        errors.push('You must provide a password')
    }else{
        if(password.length<8) errors.push('Password must be at least 8 characters.')
        if(password.length>20) errors.push('Password cannot exceed 20 characters.')
        if(password.match(/[A-Z]/)==null) errors.push('Password must be in capital letters.')
    }

    if(errors.length){
        return res.render('pages/sing',{errors})
    }
    
    db.execute('select * from users where name=?',[username],(err, fiels)=>{
        if(err) console.log(err)
        if(fiels&&fiels.length>0){
            errors.push('Username have.')
            return res.render('pages/sing',{errors})
        }
    })
    const hash =password //bcrypt.hashSync(password,10)
    db.execute(`insert into users(name,password) values(?,?)`,[username,hash],(err,fiels)=>{
        if(err) console.log(err)
        // token working
        const tokenValue=jwt.sign({id:fiels.insertId,username},secretOrPublicKey)
        res.cookie('ourApp',tokenValue,{
            httpOnly:true,
            secure:true,
            maxAge:1000*60*60*24
        })
        return res.redirect('/')
    })
}


module.exports=Register