# Description:
#   Registration script to set user to parse.com
#
# Notes:
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md
#   TODO:
#   - hook-up to parse.com


module.exports = (robot) ->
  robot.hear /register/i, (res) ->
    console.log(res.message.user)
    res.send "Hi "+res.message.user.real_name+", welcome to Pikado, wait a second so I can register you"
    setTimeout () ->
        res.send "@"+res.message.user.name+" You're now registered"
      , 2000
