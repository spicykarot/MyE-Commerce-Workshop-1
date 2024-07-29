const express = require('express')
const router = express.Router()

//controller
const { register,login,listUser,editUser,deleteUser } = require('../controllers/authController')

// Middleware
const { auth } = require("../middleware/auth")

//@Endpoint http://localhost:3000/api/register
//@Method POST
//@Access Publish
router.post('/register', register)

//@Endpoint http://localhost:3000/api/login
//@Method POST
//@Access Publish
router.post('/login', login)

router.get('/1', auth, (req,res) => {
    res.send('hello111!!!')
})

//@Endpoint http://localhost:3000/api/auth
//@Method GET
//@Access Publish
router.get('/auth', listUser)

//@Endpoint http://localhost:3000/api/auth
//@Method PUT
//@Access Publish
router.put('/auth', editUser)

//@Endpoint http://localhost:3000/api/auth
//@Method DELETE
//@Access Publish
router.delete('/auth', deleteUser)

module.exports = router