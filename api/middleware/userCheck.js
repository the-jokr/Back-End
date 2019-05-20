module.exports = {
  userCheck
};
function userCheck(req, res, next) {
  if (req.params) {
    next();
  } else {
    next({ code: 404 });
  }
}
function removeCheck(req, res, next) {}
