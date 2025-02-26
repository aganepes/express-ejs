const db=require('../database/config.js')

const home = (req,res)=>{
    db.query(`select posts.id as id,users.name as name,posts.title as title,posts.content as content,posts.time as time 
            from posts
            inner join users on users.id=posts.userid
            ORDER BY time DESC`,(err,result)=>{
                if(err) console.log(err.sqlMessage)
                else res.render('pages/home',{posts:result,title:'Home'})
            })
}

module.exports=home