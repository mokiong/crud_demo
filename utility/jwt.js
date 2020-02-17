var jwt = require('jsonwebtoken');


function createToken(user) {
    jwt.sign( user, 'hello ', { expiresIn: '1h' }, function(err, token) {
        console.log(token);
      });
}

function validateToken(req,res,next) {
    const header = req.headers['authorization'];
    console.log(header)
    const token = header.split(' ')[1]
    
    if(token != null){
        jwt.verify(token, 'hello ', (err,user) => {
            if(err){
                console.error(err)
            } else {
                console.log(user)
            }
        })
    } else {
        console.log('no token')
        res.sendStatus(403)
    }

}

module.exports.createToken = createToken;
module.exports.validateToken = validateToken;