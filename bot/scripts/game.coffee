# Description:
#   Game commands
#
# Commands:
#   hubot challenge [name] - challenge a user to a game of 301
#   hubot accept - user accepts a challenge
#   hubot reject - reject the challenge
#
# Notes:
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
#   TODO:
#   - hook-up to parse.com
#
# Author:
#   mmeester

module.exports = (robot) ->
  robot.respond /challenge (.*)/i, (res) ->
    challengeData = {}
    # get rid of @ in mentions
    challengeData.challenger = res.message.user.name.replace /@/, ""
    challengeData.challenged = res.match[1].replace /@/, ""

    challengeData.teamId = res.message.user.slack.team_id

    robot.http('https://api.parse.com/1/functions/startChallenge')
      .headers({'Content-Type': 'application/json', 'X-Parse-Application-Id': 'Osy03fANgKzEjZvux7fjxNIgxC4QzrE3syBIF9Ir', 'X-Parse-REST-API-Key': 'xSUMLvhVG7N1cagDXm1k4IqQOhkYC8MUmYwG6ul5'})
      .post(JSON.stringify(challengeData)) (err, result, body) ->
        if err
          res.send "Encountered an error :( #{err}"
          return
        # your code here, knowing it was successful
        res.send "@"+challengeData.challenger+" challenged @"+challengeData.challenged+" use `pikado accept` to accept or `pikado reject` to decline"

  robot.respond /accept/i, (res) ->
    challengeData = {}
    challengeData.slackUserName = res.message.user.name
    challengeData.realName = res.message.user.real_name
    challengeData.email = res.message.user.email_address

    challengeData.teamId = res.message.user.slack.team_id
    challengeData.choice = 'accept'

    robot.http('https://api.parse.com/1/functions/choiceChallenge')
      .headers({'Content-Type': 'application/json', 'X-Parse-Application-Id': 'Osy03fANgKzEjZvux7fjxNIgxC4QzrE3syBIF9Ir', 'X-Parse-REST-API-Key': 'xSUMLvhVG7N1cagDXm1k4IqQOhkYC8MUmYwG6ul5'})
      .post(JSON.stringify(challengeData)) (err, result, body) ->
        if err
          res.send "Encountered an error :( #{err}"
          return
        data = null
        try
          data = JSON.parse body
          if data.result
            res.send data.result
            setTimeout () ->
              res.send "@"+challengeData.slackUserName+" may start the game"
            , 500
            setTimeout () ->
              res.send "Let's play darts!!"
            , 1000
            return
          res.send data.error
        catch error
         res.send "Ran into an error parsing JSON :("
         return

  robot.respond /reject/i, (res) ->
    challengeData = {}
    challengeData.slackUserName = res.message.user.name
    challengeData.realName = res.message.user.real_name
    challengeData.email = res.message.user.email_address

    challengeData.teamId = res.message.user.slack.team_id
    challengeData.choice = 'reject'

    robot.http('https://api.parse.com/1/functions/choiceChallenge')
      .headers({'Content-Type': 'application/json', 'X-Parse-Application-Id': 'Osy03fANgKzEjZvux7fjxNIgxC4QzrE3syBIF9Ir', 'X-Parse-REST-API-Key': 'xSUMLvhVG7N1cagDXm1k4IqQOhkYC8MUmYwG6ul5'})
      .post(JSON.stringify(challengeData)) (err, result, body) ->
        if err
          res.send "Encountered an error :( #{err}"
          return
        data = null
        try
          data = JSON.parse body
          if data.result
            res.send data.result
            return
          res.send data.error
        catch error
         res.send "Ran into an error parsing JSON :("
         return
