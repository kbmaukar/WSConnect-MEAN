/* Landing Page */
module.exports.main = function (req, res) {
    res.render('index', { title: 'Welcome User' });
  };

/* Register */
module.exports.registerUser = function (req, res) {
    res.render('register', { title: 'Register' });
  };

/* Login */
module.exports.loginUser = function(req, res){

  res.render('login', {
    title: 'Please Login',
    pageHeader: {
      title: 'WSConnect',
      strapline: 'Connecting Investors Worldwide'
    },
  });
};
  