module.exports = {
  register: function register(request, response) {
    Parse.Cloud.useMasterKey();

    Parse.Cloud.run("checkExistsTeam", {teamId: request.params.teamId}).then(function(results){
      if(results>0){
        Parse.Cloud.run("getTeam", {teamId: request.params.teamId}).then(function(results){
          response.success(results);
        });
      }else{
        var Team = Parse.Object.extend("Team");
        var team = new Team();

        team.set("teamId", request.params.teamId);
        team.save(null, {
          success: function(team) {
            response.success(team);
          },
          error: function(error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            response.error('failed to create team');
          }
        });
      }
    }, function(error){
      response.error('error');
    });
  },
  linkUser: function linkUser(request, response){
    Parse.Cloud.useMasterKey();

    var teamId = request.params.team;
    var userId = request.params.user;

    var Team = Parse.Object.extend("Team");
    var query = new Parse.Query(Team);
    query.get(teamId, {
      success: function(team) {
        // The object was retrieved successfully.
        var User = Parse.Object.extend("User");
        var query = new Parse.Query(User);
        query.get(userId, {
          success: function(user) {
            var relation  = team.relation("members");
            relation.add(user);
            team.save(null, {
              success: function(team) {
                response.success('user linked');
              },
              error: function(error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                response.error('user link failed');
              }
            });
          },
          error: function(error){
            response.error('usser get failed');
          }
        });

      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        response.error('team get failed');
      }
    });
  },
  checkExists: function checkExists(request, response){
    Parse.Cloud.useMasterKey();

    var Team = Parse.Object.extend("Team");
    var query = new Parse.Query(Team);
    query.equalTo("teamId", request.params.teamId);
    query.count({
      success: function(count) {
        response.success(count);
      },
      error: function(error) {
        response.error('counting users failed');
      }
    });
  },
  get: function get(request, response){
    Parse.Cloud.useMasterKey();

    var Team = Parse.Object.extend("Team");
    var query = new Parse.Query(Team);
    query.equalTo("teamId", request.params.teamId);
    query.find({
      success: function(results) {
        response.success(results[0]);
      },
      error: function(error){
        response.error('error fetching customers');
      }
    });
  }
};
