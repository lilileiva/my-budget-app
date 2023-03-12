const jwt = require('jsonwebtoken');


module.exports = async(req, res, next) => {
    try {
        const authorization = req.get('Authorization')    
        let token = ''
      
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
          token = authorization.substring(7)
        }
        
        const decodedToken = await jwt.verify(token, process.env.SECRETWORD)
      
        if (!token || !decodedToken.id) {
          return res.status(401).json({ error: 'Token missing or invalid' })
        }
      
        const { id } = decodedToken
        req.user = id
        
        next()
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}