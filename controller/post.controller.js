const knex = require("../database/db");
const jwt = require("jsonwebtoken")


post= (req, res) => {
  knex
    .select("*")
    .from("postDetail").join("UserDetail","postDetail.User_id","UserDetail.id")
    .where("User_id",res.tokendata.id)
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: er });
    });
};


createPost = (req,res) => {
  if ( !req.body.Title || !req.body.Description){
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
    Title: req.body.Title,
    Description: req.body.Description,
    User_id:res.tokendata.id
    
  };
  knex("postDetail")
    .insert(userdata)
    .then((data) => {
      res.send({ success: `${userdata.Title} post Create successfully!` });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err });
    });

};




module.exports = { post,createPost};