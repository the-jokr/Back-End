module.exports = {
  errorHandler
};

function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.code) {
    case 400:
      return res.status(400).json({
        msg: "Bad request, please make sure all required field are supplied",
        err: err.message
      });
    case 404:
      return res.status(404).json({
        msg: "The requested information is not found",
        err: err.message
      });
    default:
      return res.status(500).json({
        msg: "There is something wrong with the server",
        err: err.message
      });
  }
}
