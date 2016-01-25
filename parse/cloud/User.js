module.exports = {
  register: function register(request, response) {
    Parse.Cloud.useMasterKey();

    // reusable objects
    var teamObject;

    // set all variables
    var team = request.params.team;
    var username = request.params.username;

    var Team = Parse.Object.extend("Team");
    var query = new Parse.Query(Team);
    query.equalTo("teamId", team);
    query.find().then(function(results) {
      // console.log('found '+results.length);
      response.success('found '+results.length);
    },function(error){
      // console.log('team lookup failed');
      response.error("team lookup failed");
		});

  }
};
