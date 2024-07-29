const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.listUser = async(req,res)=>{
    try{
        res.send('list Get User')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!!!')
    }
}

exports.login = async(req,res)=>{
    try{
        const { username,password } = req.body;
        var user = await User.findOneAndUpdate({username}, { new: true})
        if(user && user.enabled){
            const isMatch = await bcrypt.compare(password,user.password)
            console.log('isMatch: ', isMatch)
            if(!isMatch){
                return res.status(400).send('Password Invalid')
            }
            // Payload
            const payload = {
                user: {
                    username: user.username,
                    role: user.role,
                }
            }
            // Generate Token
            jwt.sign(payload,
                'jwtSecret',
                {expiresIn: 3600},
                (err,token) => {
                    if(err) throw err;
                    res.json({token,payload})
                }); // expire in 1 hour

            // return res.status(200).send('Login Success !!!')
        }else{
            return res.status(400).send('User Not found !!!')
        }

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!!!')
    }
}

exports.register = async(req,res)=>{
    try{

        //Check user
        const { username, password } = req.body
        var user = await User.findOne({username})
        console.log('user:' , user)
        if(user){ // if already user
            return res.status(400).send('User Already exists');
        } 
        // if new user
        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            password
        });


        // Encrypt
        user.password = await bcrypt.hash(password,salt);
        await user.save();


        res.send('Register Success')
        
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!!!')
    }
}

exports.editUser = async(req,res)=>{
    try{
        res.send('edit User')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!!!')
    }
}

exports.deleteUser = async(req,res)=>{
    try{
        res.send('remove User')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!!!')
    }
}