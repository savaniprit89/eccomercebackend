const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { createerror } = require("./error");


//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    img:req.body.img,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    
  });
  console.log(newUser)
  try {
    const savedUser = await newUser.save();

    const accessToken = jwt.sign(
      {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );
      const { password, ...others } = savedUser._doc;  
      console.log("final")
      res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  console.log("hii")
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
        console.log(user)
        
        if(!user){
         return res.status(400).json("username wrong");
        }
     

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        if(originalPassword != inputPassword){
         return res.status(401).json("Wrong Password");
        }
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        console.log(hashedPassword)
        const { password, ...others } = user._doc;  
        console.log("final")
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;