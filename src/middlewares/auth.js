const authMiddleware = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized request");
  }
};


const userMiddleware = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized request");
  }
};

module.exports = {
  authMiddleware,
  userMiddleware
};
