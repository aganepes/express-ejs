const express =require('express')
const path = require('path')
const cookieParser=require('cookie-parser')
const LoginMiddelware=require('./middelwares/login.js')
const app=express()


app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use((req,res,next)=>{
    res.locals.errors=[]
    res.locals.user=false
    res.locals.title='Our App'
    next()
})

const home = require('./controllers/home')
app.get('/',LoginMiddelware,home)

const {loginView,loginOut,CreateLoginView}=require('./controllers/login')
app.get('/login',loginView)
app.get('/loginOut',loginOut)
app.get('/create-login',CreateLoginView)
app.post('/control-login',require('./controllers/controlLogin'))
app.post('/register',require('./controllers/register'))

const {postsOfUser,newPost,Post,UpdatePostsItemView,UpdatePost,DeletePost,postItem} = require('./controllers/post')
app.get('/posts/user/:id',LoginMiddelware,postsOfUser)
app.get('/newpost',LoginMiddelware,newPost)
app.post('/posts',LoginMiddelware,Post)
app.get('/posts/item/:id',postItem)
app.get('/postupdate/:id',LoginMiddelware,UpdatePostsItemView)
app.post('/posts/item/:id',LoginMiddelware,UpdatePost)
app.get('/postdelete/:id',LoginMiddelware,DeletePost)


app.use((req,res,next)=>{
    res.status(404).render('pages/404',{title:'Not find(404)'})
})

app.listen(3000,()=>{
    console.log('Listening 3000 port.')
}) 