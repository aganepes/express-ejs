const db=require('../database/config.js')

const loginView=(req,res)=>{
    res.render('pages/login',{title:'Login'})
}
const CreateLoginView=(req,res)=>{
    res.render('pages/sing',{title:'Create login'})
}

const loginOut=(req,res)=>{
    res.clearCookie('ourApp')
    res.redirect('/')
}

module.exports={loginOut,loginView,CreateLoginView}