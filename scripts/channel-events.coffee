# Description:
#   Events when user enters a channel, checks if user is already in parse.com
#
# Commands:
#
# Notes:
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
#   TODO:
#   - hook-up to parse.com
#
# Author:
#   mmeester




module.exports = (robot) ->
  robot.enter (res) ->
    console.log(res.message.user)
    res.send "Hi @"+res.message.user.name+", it looks like your not registered to pikado yet, use `pikado register` to get started"
