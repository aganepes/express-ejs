const db=require('../database/config.js')
const {marked} = require('marked')

const postsOfUser=(req,res)=>{
    const {id} = req.params;
    if(id==req.user.id){
    db.execute(`select * from posts where userid=? ORDER BY time DESC`,[id],(err,result)=>{
        if(err) console.log(err.sqlMessage)
            const posts=result.map((v,i)=>({...v,update:false}))
            res.render('pages/userPosts',{posts,title:req.user.username+' page'});        
        })
    }else res.status(404).render('pages/404',{title:'Not find(404)'})
}
const postItem=(req,res)=>{
    const {id} = req.params;
    db.execute(`select posts.id as id,users.name as name,posts.title as title,posts.content as content,posts.time as time 
    from posts
    inner join users on users.id=posts.userid
    where posts.id=?
    ORDER BY time DESC`,[id],async(err,result)=>{
        if(err) console.log(err.sqlMessage)
        else {
            if(result.lenght){
                res.status(404).render('pages/404',{title:'Not find(404)'})
            }else{
            const markedContent=await marked(result[0].content)
            res.render('pages/postItem',{post:result[0],markedContent,title:result[0].title});        
            }
        }
        
        })
}
const UpdatePost=async (req,res)=>{
    const {content} = req.body
    const {id} = req.params;
    db.execute(`update posts set content=? where id=?`,[content,id],(err)=>{
        if(err) console.log(err.sqlMessage)
        res.redirect(`/posts/user/${req.user.id}`)
    })
}

const UpdatePostsItemView=(req,res)=>{
    const {id} = req.params;
    db.execute(`select * from posts where userid=? ORDER BY time desc`,[req.user.id],(err,result)=>{
        if(err) console.log(err.sqlMessage)
        const posts=result.map((v,i)=>{
            if(v.id==id){
                return ({...v,update:true})
            }else{
                return ({...v,update:false})
            }
        })
        res.render('pages/userPosts',{posts,title:req.user.username+' page'});
    })
}

const DeletePost=(req,res)=>{
    const {id} = req.params;
    db.execute(`delete from posts where id=?`,[id],(err)=>{
        if(err) console.log(err.sqlMessage)
        res.redirect(`/posts/user/${req.user.id}`)
    })
}
const newPost=(req,res)=>{
    res.render('pages/newPost',{title:'New Post'})
}

const Post=(req,res)=>{
    const {content,id,title} = req.body
    db.query(`insert into posts(title,content,userid) values(?,?,?)`,[title,content,id],(err,field)=>{
        if(err) console.log(err.sqlMessage)
        res.redirect('/')
    })
}

module.exports={postsOfUser,newPost,Post,UpdatePostsItemView,UpdatePost,DeletePost,postItem}