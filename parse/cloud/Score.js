var Pusher = require('cloud/pusher/pusher.js');

module.exports = {
  submit: function submit(request, response) {

    var userObj, remaining;
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
        remaining = score.get("remaining");
        inputScore = parseInt(request.params.score);

        remaining = remaining-inputScore;
        if(remaining<0){
          return "it looks like you've thrown too much, score isn't submitted";
        }else{
          var newScore = new Score();
          newScore.set("score", inputScore);
          newScore.set("remaining", remaining);
          newScore.set("user",userObj);
          newScore.set("game",score.get("game"));

          newScore.save(null);

          if(remaining>0){
            return 'Score submitted, you have '+remaining+' points remaining';
          }else{
            Parse.Cloud.run("finishGame", {id: score.get("game").id});
            return 'We have a winner, congratulations @'+userObj.get('slackUsername')+'!';
          }
        }
      }
    }).then(function(msg){
      response.success(msg);
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
