/* Landing Page */
module.exports.main = function (req, res) {
    res.render('dashboard', {
      title: 'WSConnect',
    pageHeader: { 
      title: 'Your Dashboard'}
    });
  };