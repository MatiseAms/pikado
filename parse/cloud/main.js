var User = require('cloud/User'),
    Team = require('cloud/Team');

// User cloud functions
Parse.Cloud.define('registerUser', User.register);
Parse.Cloud.define('checkExistsUser', User.checkExists);
Parse.Cloud.define('getUser', User.get);


// Team cloud functions
Parse.Cloud.define('registerTeam', Team.register);
Parse.Cloud.define('linkUsertoTeam', Team.linkUser);
Parse.Cloud.define('checkExistsTeam', Team.checkExists);
Parse.Cloud.define('getTeam', Team.get);
