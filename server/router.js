let express = require('express')
let router = express.Router()
// let user = require('./API/user')

// router.get('/user', user.get)


let login = require('./API/login')
router.post('/login', login.post)

let sendMessage = require('./API/sendMessage')
router.post('/sendMessage', sendMessage.post)

module.exports = router



