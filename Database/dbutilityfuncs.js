let User = require('./users');
exports.checkForReg = async (username) => {
  let document = await User.findOne({ name: username });
  if (!document) {
    return false;
  } else return true;
};
