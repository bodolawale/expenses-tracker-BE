module.exports = async (req, res, next) => {
  try {
    let token;
    //Check if authorization header is present
    if(req.headers && req.headers.authorization) {
    //authorization header is present
      const parts = req.headers.authorization.split(' ');
      if(parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if(/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return res.status(401).json({error: 'Format is Authorization: jwt [token]'});
      }
    } else {
    //authorization header is not present
      return res.status(401).json({error: 'No Authorization header was found'});
    }
    jwToken.verify(token, async (err, decoded) => {
      if(err) {
        return res.status(401).json({error: 'Invalid token'});
      }
      req.user = decoded.data;
      const user = await User.findOne({id : decoded.data.id});
      if(!user) {
        return res.status(401).json({messaage: 'User from token not found'});
      }
      next();
    });
  } catch (error) {
    return res.status(400).json({error});
  }
};
