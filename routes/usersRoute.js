const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const { cloudinary } = require("../cloudinary");

router.post("/register", async(req, res) => {

    try {
        const newuser = new User(req.body)
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
  
});

router.post("/login", async(req, res) => {

    try {
        const user = await User.findOne({username : req.body.username , password : req.body.password})
        if(user)
        res.send(user)
        else
        return res.status(400).json('');
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
  
});















router.get("/getallusers", async(req, res) => {
  
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }

});



router.post("/followuser", async(req, res) => {

    const {currentuserid , receiveruserid} = req.body
    console.log(req.body)
    try {
        var currentuser = await User.findOne({_id : currentuserid})
        var currentUserFollowing = currentuser.following
        currentUserFollowing.push(receiveruserid)

        currentuser.following = currentUserFollowing

        await User.updateOne({_id : currentuserid} , currentuser)

        var receiveruser = await User.findOne({_id : receiveruserid})
        var receiverUserFollowers   = receiveruser.followers

        receiverUserFollowers.push(currentuserid)

        receiveruser.followers = receiverUserFollowers

        await User.updateOne({_id : receiveruserid} , receiveruser)

        res.send('Followed successfully')

    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
  
});


router.post("/unfollowuser", async(req, res) => {

    const {currentuserid , receiveruserid} = req.body
    console.log(req.body)
    try {
        var currentuser = await User.findOne({_id : currentuserid})
        var currentUserFollowing = currentuser.following
        
        const temp1 = currentUserFollowing.filter(obj=>obj.toString() !== receiveruserid)

        currentuser.following = temp1

        await User.updateOne({_id : currentuserid} , currentuser)



        var receiveruser = await User.findOne({_id : receiveruserid})
        var receiverUserFollowers   = receiveruser.followers

        const temp2 = receiverUserFollowers.filter(obj=>obj.toString()!==currentuserid)

        receiveruser.followers = temp2

        await User.updateOne({_id : receiveruserid} , receiveruser)

        res.send('UnFollowed successfully')

    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
  
});


router.post("/edit", async(req, res) => {

   try {
    var prevUser = await User.findOne({_id :req.body._id})

    if(prevUser.profilePicUrl == req.body.profilePicUrl){

           await User.updateOne({_id : req.body._id} , req.body)
           const user = await User.findOne({_id: req.body._id})
           res.send(user)

    }
    else{

          const uploadResponse = await cloudinary.v2.uploader.upload(req.body.profilePicUrl, {
            folder: "sheygram_udemy",
            use_filename: true,
          });

          req.body.profilePicUrl = uploadResponse.url

          await User.updateOne({_id : req.body._id} , req.body)
          const user = await User.findOne({_id: req.body._id})
          res.send(user)

    }
   } catch (error) {
       console.log(error)
       return res.status(400).json(error);
   }
    
  
});




module.exports = router;


