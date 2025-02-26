const db=require('../database/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretOrPublicKey='asdfjsdflsjfl'

const ControlLogin=async (req,res)=>{
    let errors=[]
    let {username,password}=req.body
    username=username.trim()
    
    db.execute('select * from users where name=?',[username],(err, result)=>{
        if(err) console.log(err)
        if(!result.length){
            errors.push('Not username.')
        }else{
            const hash = password//bcrypt.hashSync(password,10)
            if(result[0].password!=hash)
                errors.push('Error  password.')
        }
        
        if(errors.length){
            return res.render('pages/login',{errors})
        }else{
            // token working
            const tokenValue=jwt.sign({id:result[0].id,username},secretOrPublicKey)
            res.cookie('ourApp',tokenValue,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                maxAge:1000*60*60*24
            })
            return res.redirect('/')
        }
    })
}


module.exports=ControlLogin