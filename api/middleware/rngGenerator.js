module.exports = (req, res, next) => {
  let baseNum;
  const length = baseNum || 10;
  const id = Math.ceil(Math.random() * length);
  req.rng = id;
  next();
};
