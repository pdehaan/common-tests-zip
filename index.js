#!/usr/bin/env node

const app = require('./lib/cli')
const utils = require('./lib/utils')

const flags = app.options

if (flags.os && flags.channel) {
  utils.getFiles(flags.os, flags.channel).then(function (link) {
    if (flags.verify) {
      utils.verifyBuild(link).then(function (data) {
        console.log(JSON.stringify(data, null, 2))
      }).catch(logError)
    } else {
      console.log(link)
    }
  }).catch(logError)
} else {
  console.error('`--os` and `--channel` are required')
  app.help()
}

function logError (err) {
  console.error(err.message)
}
