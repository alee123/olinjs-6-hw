var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
//mongoose.connect('localhost/fakeFB2');

var userSchema = mongoose.Schema({
  name: String,
  idNum: String,
  url: String,
  bg: String,
  font: String,
  border: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;
