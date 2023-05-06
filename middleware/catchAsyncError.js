module.exports = (asyncFunct) => (req, res, next) => {
  Promise.resolve(asyncFunct(req, res, next)).catch(next);
};
