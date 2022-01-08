const knex = require("../database/db");
all_like_dislike= (req, res) => {
  knex
    .select("*")
    .from("Like_Dislike")
    .join("UserDetail","Like_Dislike.User_id","UserDetail.id")
    // .join("UserDetail",function(){
    //   this.on("Like_Dislike.User_id","UserDetail.id")
  // })
    .where("post_id",parseInt(req.params.id))
    
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};


post_like_dislike= (req, res) => {
  if ( req.body.Like==undefined|| req.body.Dislike==undefined ){
    res.send({
      "success": false,
      "status": 400,
      "message": "Got error while saving",
      })
      console.log({
        "success": false,
        "status": 400,
        "message": "Got error while saving",
        });
      return""
  }
  const userdata = {
    Like: req.body.Like,
    Dislike: req.body.Dislike,
    User_id:res.tokendata.id,
    post_id:parseInt(req.params.id)
  };
  console.log(userdata);
  knex("Like_Dislike")
    .insert(userdata)
    .then((data) => {
      res.send({ success:data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err });
    });
};



module.exports = {all_like_dislike,post_like_dislike};