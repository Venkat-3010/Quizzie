const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401)
        .json({message: 'Invalid token, Authorization denied'});
    }

    try{
        const decoded = jwt.verify(token, secret);
        req.currentUserId = decoded.user.id;
        next();
    }catch(error){
        console.log('Token verification error:', e);
        res.status(400).json({message: 'Token is not valid'});
    }
};

module.exports = authMiddleware;