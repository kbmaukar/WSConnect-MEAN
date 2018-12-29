// default response to show routing is working
module.exports.index = function(req, res) {
    res.render('index', { title: 'API homepage' });
};

// cut-down code from Getting MEAN: Chapter 11
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);  
    res.json(content);
};

module.exports.register = function(req, res) {
    // check required inputs provided to create an account
    if(!req.body.username || !req.body.email || !req.body.name || !require.body.password) {
        sendJSONresponse(res, 400, {
            "message" : "All fields required"
        });
        return;
    }

    // create user from Mongoose model
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.name = req.body.name;
    user.password = req.body.password;

    // save user in model via Mongoose
    user.save(function (err) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            sendJSONresponse(res, 200, {
                "message" : "User account created for " + req.body.username
           });
        }
    })
}

module.exports.login = function(req, res) {
    // check required inputs provided to login
    // at this stage, login requires email and name as proxy for password
    if(!req.body.username || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message" : "All fields required"
        });
        return;
    }

    // the following simple check replaces use of Passport Authentication
    var idToCheck = req.body.username; 
    var credentialToCheck = req.body.password;
    var redirect = req.body.onSuccess;
    // find user in model via Mongoose
    User.findOne({username: idToCheck, password: credentialToCheck}, function (err,user) {
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            if (user) {
                // user authenticated
                if (redirect) {
                    // and redirected 
                    if (redirect=='dashboard') {
                        // ... to home page
                        res.cookie("token", JSON.stringify({"id" : idToCheck, "credential" : credentialToCheck}));
                        res.redirect('/dashboard.html');
                    } else {
                        // ... message sent 
                        sendJSONresponse(res, 200, {
                            "message" : "Redirecting '" + user.username + "' to " + redirect
                        });
                    }   
                } else {
                    // and success message sent 
                    sendJSONresponse(res, 200, {
                        "message" : "User '" + user.name + "' logged in as " + user.username
                    });
                }   
            } else {
                // user "not authenticated" and message sent 
                sendJSONresponse(res, 401, {
                    "message" : "User '" + idToCheck + "' not registered or credential not valid"
                });
            }
        }
    })
}