var User = require('cloud/User'),
    Team = require('cloud/Team'),
    Game = require('cloud/Game'),
    Score = require('cloud/Score');

    // User cloud functions
    Parse.Cloud.define('registerUser', User.register);
    Parse.Cloud.define('checkExistsUser', User.checkExists);
    Parse.Cloud.define('getUserByEmail', User.getByEmail);

    // Team cloud functions
    Parse.Cloud.define('registerTeam', Team.register);
    Parse.Cloud.define('linkUsertoTeam', Team.linkUser);
    Parse.Cloud.define('checkExistsTeam', Team.checkExists);
    Parse.Cloud.define('getTeamByExternal', Team.getByExternalId);

    // Game cloud functions
    Parse.Cloud.define('startChallenge', Game.challenge);
    Parse.Cloud.define('choiceChallenge', Game.choice);
    Parse.Cloud.define('finishGame', Game.finish);

    // Game event functions
    Parse.Cloud.afterSave("Game", Game.afterSave);

    // Score cloud function
    Parse.Cloud.define('submitScore', Score.submit);

    // Game event functions
    Parse.Cloud.afterSave("Score", Score.afterSave);
