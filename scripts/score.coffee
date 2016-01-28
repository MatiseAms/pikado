# Description:
#   Game commands
#
# Commands:
#   hubot score [score] - submit score to challenge
#
# Notes:
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
#
# Author:
#   mmeester

module.exports = (robot) ->
  robot.respond /score (.*)/i, (res) ->
    scoreData = {}
    # get rid of @ in mentions
    scoreData.email = res.message.user.email_address
    scoreData.score = res.match[1]

    robot.http('https://api.parse.com/1/functions/submitScore')
      .headers({'Content-Type': 'application/json', 'X-Parse-Application-Id': 'Osy03fANgKzEjZvux7fjxNIgxC4QzrE3syBIF9Ir', 'X-Parse-REST-API-Key': 'xSUMLvhVG7N1cagDXm1k4IqQOhkYC8MUmYwG6ul5'})
      .post(JSON.stringify(scoreData)) (err, result, body) ->
        if err
          res.send "Encountered an error :( #{err}"
          return
        data = null
        try
          data = JSON.parse body
          if data.result
            res.send data.result
        catch error
         res.send "Ran into an error parsing JSON :("
         return
