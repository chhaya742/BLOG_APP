const knex = require("../database/db");
const {sign}=require("jsonwebtoken");
const bcrypt = require('bcrypt');
saltRounds=10;



//insert data
createUsers = (req, res) => {
  if ( !req.body.Name || !req.body.email ||  !req.body.password){
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
  
  const salt = bcrypt.genSaltSync(saltRounds);
  // const hash = bcrypt.hashSync(Password, salt);
  const userdata = {
    Name: req.body.Name,
    email: req.body.email,
    password:bcrypt.hashSync(req.body.password,salt)

  };
  

  knex("UserDetail")
    .insert(userdata)
    .then((data) => {
      res.send({ success: `${data} registered successfully!` });
    })
    .catch((err) => {
      if (res.errorno=1062){
      res.send({message:"this email already exist"})}
      else{
      console.log(err);
      res.send({ message: err });}
    });
  }
// login
UserLogin=(req,res)=>{
  if (!req.body.email||!req.body.password){
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
knex.from('UserDetail').select("*").where("email","=",req.body.email,"password","=",req.body.password)
  .then((data) => {
    if (data.length==0){
      console.log("user account not exist");
      res.json({message:"this user account not exist"})

    }
    else{
    if(bcrypt.compareSync(req.body.password,data[0].password)){
    const token=sign({id:data[0].id},"chhayabagwan",{ expiresIn:"6h"})
    res.cookie("user",token)
        res.json({"success": true,
        "status": 200,
        "message": "Login successfull.",
        "token": token,
      })
      console.log({message:data});
    }
    else{
      res.json({message:"error"})
    }
  }
  })
  .catch((err) => { 
    res.json({message:err })
    console.log({message:err });
    })
}


// // logoutusr

logoutUser=(req,res)=>{
  res.clearCookie("user")
  res.json({message:"logout success"})


}

module.exports = {createUsers,UserLogin,logoutUser}