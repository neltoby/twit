const jwt = require('jsonwebtoken');
module.exports = () => {
    return {
        authenticate: (req, res, next) => {
            const auth = req.headers['authorization']
            console.log(auth)
            if(auth){
                const token = auth.split(' ')[1]
                req.token = token
                next()
            }else{
                res.status(401).json({success: false, msg: 'Authorization information is missing or invalid'})
            }
        }, 
        validate: (req, res, next) => {
            const token = req.token
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if(err){
                    res.status(401).json({success: false, msg: 'invalid token'})
                }else{
                    if(decoded.id){
                        req.body.id = decoded.id
                        next()
                    }
                }
            });
        },
        registerValidation: (req, res, next) => {
            const { fullname, email, password } = req.body   
            if(fullname === undefined || fullname === null || !fullname){
                res.status(400).json({success: false, msg: 'Fullname missing'})
            }else{
                if(email === undefined || email === null || !email){
                    res.status(400).json({success: false, msg: 'Email missing'})
                }else{
                    if(password === undefined || password === null || !password ){
                        res.status(400).json({success: false, msg: 'Email missing'})
                    }else{
                        next()
                    }
                }
            }
        }, 
        loginValidation: (req, res, next) => {
            const { email, password } = req.body
            if(email === undefined || email === null || password === undefined || password === null){
                res.status(400).json({success: false, msg: 'Missing data'})
            }else{
                next()
            }
        }
    }
}