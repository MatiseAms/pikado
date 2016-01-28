module.exports = {
  challenge: function challenge(request, response) {
    Parse.Cloud.useMasterKey();

    var teamObj, challengerObj, challengedObj;

    var challengerUsername = request.params.challenger;
    var challengedUsername = request.params.challenged;

    var Team = Parse.Object.extend("Team");
    var query = new Parse.Query(Team);
    query.equalTo("teamId", request.params.teamId);
    query.first().then(function(object){
      teamObj = object;

      var UserInTeam = Parse.Object.extend("UserInTeam");
      var query = new Parse.Query(UserInTeam);
      query.include("user");
      query.equalTo("team", teamObj);

      return query.find();
    }).then(function(results){

      for(var i=0; i<results.length; i++ ){
        var slackUser = results[i].get("user").get("slackUsername");
        if(challengerUsername==slackUser){
          challengerObj = results[i].get("user");
          console.log('challenger user ' + challengerObj.get("realName"));
        }else if(challengedUsername==slackUser){
          challengedObj = results[i].get("user");
          console.log('challenged user ' + challengedObj.get("realName"));
        }
      }

      var Game = Parse.Object.extend("Game");
      var game = new Game();

      game.set("team", teamObj);
      game.set("challenger", challengerObj);
      game.set("challenged", challengedObj);
      // TODO: make this a game setting
      game.set("start", 301);

      return game.save();
    }).then(function(result){
      response.success("game made");
    }, function(error){
      response.error(error);
    });
  },
  choice: function choice(request, response){
    Parse.Cloud.useMasterKey();

    Parse.Cloud.run("getUserByEmail", {email: request.params.email}).then(function(user){
      var Game = Parse.Object.extend("Game");
      var query = new Parse.Query(Game);
      query.equalTo("challenged", user);
      query.doesNotExist("accepted");
      query.doesNotExist("finished");
      query.descending("createdAt");

      return query.first();
    }).then(function(result){
      if(result!==undefined){
        return result.fetch();
      }
    }).then(function(game){
      if(game!==undefined){

        var feedback = '';
        if(request.params.choice==='accept'){
          game.set("accepted", true);

          feedback = 'challenge accepted, keep the score during your game with `pikado score [score]`';
        }else{
          game.set("accepted", false);
          feedback = 'You partypooper, challenge someone else by using `pikado challenge [name]`';
        }
        game.save();

        response.success(feedback);
      }else{
        response.error('No games found to accept, challenge user first');
      }
    },function(error){
      response.error(error);
    });
  },
  finish: function finish(request, response){
    Parse.Cloud.useMasterKey();

    var Game = Parse.Object.extend("Game");
    var query = new Parse.Query(Game);

    query.get(request.params.id).then(function(object){
      object.set("finished",true);
      object.save();

      response.success('lekkah');
    },function(error){
      response.error(error);
    });

  },
  afterSave: function afterSave(request, response){
    Parse.Cloud.useMasterKey();

    if(request.object.get('accepted')===true&&request.object.get('finished')!==true){
      var remaining = request.object.get('start');
      var challenger = request.object.get('challenger');
      var challenged = request.object.get('challenged');

      // init the mofo score
      var Score = Parse.Object.extend("Score");

      // init score for challenger
      var challengerScore = new Score();
      challengerScore.set("user", challenger);
      challengerScore.set("game", request.object);
      challengerScore.set("remaining", remaining);
      challengerScore.save(null).then(function(){

        // init score for challenged
        var challengedScore = new Score();
        challengedScore.set("user", challenged);
        challengedScore.set("game", request.object);
        challengedScore.set("remaining", remaining);

        return challengedScore.save(null);
      }).then(function(results){
        console.log('inited the scores, game on');
      },function(error){
        console.error(error);
      });
    }

  }
};
