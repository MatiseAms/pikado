function randomPass(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

module.exports = {
  register: function register(request, response) {
    Parse.Cloud.useMasterKey();

    // reusable objects
    var teamObject, userObj;

    // set all variables
    var team = request.params.teamId;

    var username = request.params.email;
    var slackUsername = request.params.slackUserName;
    var email = request.params.email;

    var realName = request.params.realName;
    var firstName = request.params.firstName;
    var lastName = request.params.lastName;
    var phone = request.params.phone;
    var profilePicture = request.params.profilePicture;

    Parse.Cloud.run("checkExistsUser", {email: username}).then(function(results){
      if(results>0){
        Parse.Cloud.run("getUserByEmail", {email: username}).then(function(results){
          userObj = results;
        });
      }else{

        var user = new Parse.User();
        user.set("username", username);
        user.set("slackUsername", slackUsername);
        user.set("password", randomPass(12));
        user.set("email", email);
        user.set("realName", realName);
        user.set("firstName", firstName);
        user.set("lastName", lastName);
        user.set("phone", phone);
        user.set("profilePicture", profilePicture);

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            userObj = user;
            Parse.Cloud.run("registerTeam", {teamId: team}).then(function(results){
              teamObject = results;
              Parse.Cloud.run("linkUsertoTeam", {team: teamObject.id, user: userObj.id}).then(function(results){
                response.success(results);
              });
            });
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            response.error("Error: " + error.code + " " + error.message);
          }
        });

      }
    });

  },
  checkExists: function checkExists(request, response){
    Parse.Cloud.useMasterKey();

    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("username", request.params.email);
    query.count({
      success: function(count) {
        response.success(count);
      },
      error: function(error) {
        response.error('counting users failed');
      }
    });
  },
  getByEmail: function getByEmail(request, response){
    Parse.Cloud.useMasterKey();

    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("username", request.params.email);
    query.first({
      success: function(object) {
        response.success(object);
      },
      error: function(error){
        response.error('error fetching customers');
      }
    });
  }
};
