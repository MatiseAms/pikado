# Description:
#   Game commands
#
# Commands:
#   hubot challenge [name] - challenge a user to a game of 301
#   hubot accept - user accepts a challenge
#   hubot reject - reject the challenge
#   hubot score [score] - submit score to challenge
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
    challenger = res.message.user.name
    challenged = res.match[1]
