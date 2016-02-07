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
          result = JSON.parse data.result
          if data.result
            if result.scored.remaining>0
              replyTxt = "Score submitted @"+result.scored.userName+", you have "+result.scored.remaining+" points remaining"
            else
              replyTxt = "We have a winner, congratulations @"+result.scored.userName+"!"

            msgData = {
              channel: res.message.room
              text: replyTxt,
              attachments: [
                {
                    "fallback": "Score submitted @"+result.scored.userName+", you have "+result.scored.remaining+" points remaining",
                    "fields": [
                        {
                            "title": result.scored.name,
                            "value": result.scored.remaining,
                            "short": true
                        },
                        {
                            "title": result.next.name,
                            "value": result.next.remaining,
                            "short": true
                        }
                    ],
                    "color": "good"
                }
              ]
            }
            # post the message
            robot.adapter.customMessage msgData
        catch error
         res.send "Ran into an error parsing JSON :("
         return
