const express = require("express");
const router = express.Router();
const { createUsers ,UserLogin,logoutUser} = require("../controller/user.controller");
const {post, createPost} = require("../controller/post.controller");
const {all_like_dislike,post_like_dislike}=require("../controller/Lile_Dislike");
const {verify } = require("jsonwebtoken");

authentication=(req,res,next)=>{
    token=req.cookies;
    console.log(token);
    if (token.user==undefined){
        res.send({succses:0,
        message:"authentication erroe"})
    }else{
    verify(token.user,"chhayabagwan",(err,tokendata)=>{
        if(err){
            res.send({message:"authentication  erro"});

        }
        else if(tokendata.id==undefined){
            res.send({message:"authentication error"})
        }
        else{
            res.tokendata=tokendata
            next()
        }

    })}

}

router.post("/api/register",createUsers);
router.post("/api/Login", UserLogin);
router.get("/api/logout",logoutUser)


router.get("/api/post",authentication, post);
router.post("/api/post",authentication,createPost);

router.get("/api/like/:id",authentication,all_like_dislike);
router.post("/api/like/:id",authentication,post_like_dislike);




module.exports = router;