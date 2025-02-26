const jwt = require('jsonwebtoken')
const db=require('../database/config')

const secretOrPublicKey='asdfjsdflsjfl'

const Login=async (req,res,next)=>{
    if(req.headers.cookie&&req.cookies['ourApp']){
        const token=req.cookies['ourApp']
        const json=jwt.verify(token,secretOrPublicKey)
        const {id,username}=json
        const result= await new Promise((resolve,reject)=>{
            db.query('select * from users where id=?',[id],(err,result)=>{
                if(err) reject(err)
                resolve(result)
            })
        })
        if(result[0].name==username){
            req.user=json
        }else req.user=false
        
    }else req.user=false
    res.locals.user=req.user

    if(!req.user && req.url!='/'){
        res.redirect('/')
    }
    next()
}
module.exports=Login