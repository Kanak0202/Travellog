const express = require("express");
const mongoose = require("mongoose");
const User = require("./db/User");
require('./db/config');
const cors = require("cors");
const Destination = require("./db/Destination");
const Comment = require("./db/Comment");
const Reply = require("./db/Reply");


const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async(req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"User not created"});
    }
});

app.post("/login", async(req, res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            res.send(user);
        }
        else{
            res.send({result:"User not found"});
        }
    }
    else{
        res.send({result:"Data not obtained"});
    }
    
});


app.post("/add",async(req, res)=>{
    let destination = new Destination(req.body);
    let result = await destination.save();
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"Destination not added"});
    }
    
});

app.get("/view", async(req, res)=>{
    let result = await Destination.find({},'name').distinct('name');
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"Destination names cannot be retrieved"});
    }
});

app.get("/location/:name", async(req, res)=>{
    let result = await Destination.find({name:req.params.name});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"Can't find data to retrieve"});
    }
})

app.get("/profile/:id",async(req, res)=>{
    let result = await User.findOne({_id:req.params.id}).select(['-password']);
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"No such User found"});
    }
});


// app.get("/destination", async(req, res)=>{
//     let result = await Destination.findOne({_id:"647f71ac5fbc8583f81f772b"}).populate('userId')
//     res.send(result);
// });


app.get("/my-uploads/:id", async(req, res)=>{
    let result = await Destination.find({userId:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"Data not found"});
    }
})

app.get("/get-upload/:id", async(req, res)=>{
    let result = await Destination.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"No data to show"})
    }
});

app.put("/get-upload/:id", async(req, res)=>{
    let result = await Destination.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )
    res.send(result);
});

app.delete("/get-upload/:id",async(req,res)=>{
    const result = await Destination.deleteOne({_id:req.params.id});
    res.send(result)
});

app.get("/search/:key", async(req, res)=>{
    let result = await Destination.find({
        "$or":[
            {name:{$regex:req.params.key, $options:'i'}},
            {city:{$regex:req.params.key, $options:'i'}},
            {state:{$regex:req.params.key, $options:'i'}},
            {country:{$regex:req.params.key, $options:'i'}}
        ]
    })
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"Data not found"});
    }
});

app.post("/comment", async(req, res)=>{
    let comment = new Comment(req.body);
    let result = await comment.save();
    if(result){
        res.send(result);
    }
    else{
        res.send({result: "No comment added"});
    }
});

app.get("/comment/:Wid", async(req, res)=>{
    let result = await Comment.find({commentedIn:req.params.Wid}).populate({path:'person'}).sort({commentedOn:-1});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"No comments found"});
    }
});

app.put("/postLikes/:id", async (req, res) => {
    try {
      const result = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            likes: req.body.likes,
          },
        },
        { new: true } // This option returns the updated document
      );
  
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.put("/editComment/:id", async(req,res)=>{
    try {
        const result = await Comment.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              comment: req.body.oldComment,
            },
          },
          { new: true } // This option returns the updated document
        );
    
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } 
  })

app.delete("/deleteComment/:id", async(req,res)=>{
    const result = await Comment.deleteOne({_id:req.params.id});
    res.send("Deleted successfully");
})

app.get('/getIndividualComment/:id', async(req, res)=>{
    let result = await Comment.findOne({_id:req.params.id}, {comment:1, likes:1});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"Could not find comment"});
    }
});

app.post('/postReply', async(req,res)=>{
    let result = new Reply(req.body);
    reply = await result.save();
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"No reply added"});
    }
})

app.get('getReplies/:id', async(req,res)=>{
    {
        let result = await Comment.find({_id:req.params.id}, {replies:1});
        if(result){
            res.send(result);
        }
        else{
            res.send("Couldn't retrieve replies");
        }
    }
})


const port = 5000;

app.listen(port, console.log("Server started at port 5000"));