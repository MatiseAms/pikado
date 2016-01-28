# Description:
#   Registration script to set user to parse.com
#
# Commands:
#   hubot register - register user to the game
#
# Notes:
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
#   TODO:
#   - hook-up to parse.com
#
# Author:
#   mmeester

module.exports = (robot) ->
  robot.respond /register/i, (res) ->
    registerData = {}
    registerData.slackUserName = res.message.user.name
    registerData.realName = res.message.user.real_name
    registerData.email = res.message.user.email_address
    # slack profile stuff
    registerData.teamId = res.message.user.slack.team_id
    registerData.firstName = res.message.user.slack.profile.first_name
    registerData.lastName = res.message.user.slack.profile.last_name
    registerData.phone  = res.message.user.slack.profile.phone
    registerData.profilePicture = {image_24: res.message.user.slack.profile.image_24, image_32: res.message.user.slack.profile.image_32, image_48: res.message.user.slack.profile.image_48, image_72: res.message.user.slack.profile.image_72, image_192: res.message.user.slack.profile.image_192, image_512: res.message.user.slack.profile.image_512}

    res.send "Hi " + registerData.realName + ", welcome to Pikado, wait a second so I can register you"
    robot.http('https://api.parse.com/1/functions/registerUser')
      .headers({'Content-Type': 'application/json', 'X-Parse-Application-Id': 'Osy03fANgKzEjZvux7fjxNIgxC4QzrE3syBIF9Ir', 'X-Parse-REST-API-Key': 'xSUMLvhVG7N1cagDXm1k4IqQOhkYC8MUmYwG6ul5'})
      .post(JSON.stringify(registerData)) (err, result, body) ->
        if err
          res.send "Encountered an error :( #{err}"
          return
        # your code here, knowing it was successful
        res.send "@" + registerData.slackUserName + " You're registered now challenge a user by using `pikado challenge [name]`"
