const secrets = require("../secret");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const protected = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-cbtsao.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://jokr/api/",
  issuer: "https://dev-cbtsao.auth0.com/",
  algorithms: ["RS256"]
});

module.exports = {
  protected
};
// protected: function(req, res, next) {
//   const token = req.headers.authorization;
//   jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ msg: "unauthorized" });
//     }
//     req.decodedToken = decodedToken;
//     next();
//   });
// },
// generateToken: function(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username,
//     roles: user.roles_id
//   };
//   const options = {
//     expiresIn: `24h`
//   };
//   return jwt.sign(payload, secrets.jwtSecret, options);
// },
// checkRole: function(role) {
//   return function(req, res, next) {
//     if (
//       req.decodedToken &&
//       req.decodedToken.roles &&
//       req.decodedToken.roles.includes(role)
//     ) {
//       next();
//     } else {
//       res.status(403).json({ msg: "role not accessible" });
//     }
//   };
// }
