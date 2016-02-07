var Pusher = require('cloud/pusher/pusher.js');

module.exports = {
  submit: function submit(request, response) {

    var userObj, remaining, inputScore, scoreObj, feedback;
    // init the mofo score
    var Score = Parse.Object.extend("Score");

    Parse.Cloud.run("getUserByEmail", {email: request.params.email}).then(function(user){
      userObj = user;

      var query = new Parse.Query(Score);
      // get latest score of user
      query.equalTo("user", userObj);
      query.descending("createdAt");

      return query.first();
    }).then(function(result){
      if(result!==undefined){
        return result.fetch();
      }
    }).then(function(score){
      if(score!==undefined){
        scoreObj=score;
        remaining = scoreObj.get("remaining");
        inputScore = parseInt(request.params.score);

        remaining = remaining-inputScore;
        if(remaining<0){
          return "it looks like you've thrown too much, score isn't submitted";
        }else{
          var newScore = new Score();
          newScore.set("score", inputScore);
          newScore.set("remaining", remaining);
          newScore.set("user",userObj);
          newScore.set("game",scoreObj.get("game"));

          newScore.save(null);

          if(remaining===0){
            Parse.Cloud.run("finishGame", {id: scoreObj.get("game").id});
          }

        }
      }
    }).then(function(score){

      // for the feedback
      var opponentScore = new Score();
      var opponentQuery = new Parse.Query(opponentScore);
      opponentQuery.equalTo("game", scoreObj.get("game"));
      opponentQuery.include("user");
      opponentQuery.notEqualTo("user", userObj);
      opponentQuery.descending("createdAt");

      return opponentQuery.find();
    }).then(function(results){
      var opponentResult = results[0];
      var opponent = opponentResult.get('user');

      feedback = {
        scored: {
          name: userObj.get('realName'),
          userName: userObj.get('slackUsername'),
          remaining: remaining
        },
        next: {
          name: opponent.get('realName'),
          userName: opponent.get('slackUsername'),
          remaining: opponentResult.get('remaining')
        }
      };
      return feedback;
    }).then(function(msg){
      response.success(JSON.stringify(msg));
    },function(error){
      response.error(error);
    });

  },
  afterSave: function afterSave(request) {
     if (!request.object.existed()) {
        var score = request.object,
            pusher = new Pusher({
                appId: '174471',
                key: '6d519dd40253cd6ef8cb',
                secret: 'cd12333c22da9fb0a78a'
            });

        pusher.trigger('score', 'newScore', {
          scoreId: score.id,
          feedObject: score
        }, null, function(evt) {
          console.log(evt);
        });
      }
    }
};
