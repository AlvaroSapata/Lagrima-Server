function isAdmin(req, res, next) {
    const { payload } = req; 
    if (payload.role === "admin") {
      next();
    } else {
      res.status(401).json("Acceso no autorizado");
    }
  }
  
// Export the middleware so that we can use it to create protected routes
module.exports = {
    isAdmin,
  };