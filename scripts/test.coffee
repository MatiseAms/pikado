# Description:
#   Testing some new commands
#
# Commands:
#   hubot test - just test the shit out of hubot
#
# Notes:
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
#
# Author:
#   mmeester

module.exports = (robot) ->
  robot.hear /test/i, (res) ->
    msgData = {
      channel: res.message.room
      text: "Latest changes"
      attachments: [
        {
            "fallback": "Score submitted @maurits, you have 218 points remaining",
            "text": "Score submitted @maurits, you have 218 points remaining",
            "fields": [
                {
                    "title": "Maurits",
                    "value": "218",
                    "short": true
                },
                {
                    "title": "Tim",
                    "value": "67",
                    "short": true
                }
            ],
            "color": "good"
        }
      ]
    }
    # post the message
    robot.adapter.customMessage msgData
