const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) => {
    try{
        console.log(process.env.SECRET)
        jwt.sign({id: req.user.id}, process.env.SECRET, function(err, token) {
            if(err){
                res.status(500).json({success: false, msg: err})
            }else{
                console.log(token)
                res.setHeader("token", token) 
                res.setHeader('Access-Control-Expose-Headers', 'token')              
                next()
            }
        });
    }catch(e){
        res.status(500).json({success: false, msg: 'e'})
    }
}

// module.exports = genToken