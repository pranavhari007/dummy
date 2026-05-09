const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles.some(role => roles.includes(role))) {
      return res.status(403).json({ 
        message: `User role is not authorized to access this route` 
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
