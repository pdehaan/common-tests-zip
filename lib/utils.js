const format = require('util').format

const $ = require('cheerio')
const got = require('got')

const BASE_URL = 'https://ftp.mozilla.org/pub/mozilla.org/firefox/'
const NIGHTLY_BASE_URL = BASE_URL + 'nightly/latest-trunk/'
const RELEASE_BASE_URL = BASE_URL + 'tinderbox-builds/mozilla-release-%s/latest/'

module.exports.getFiles = getFiles
module.exports.verifyBuild = verifyBuild

function getFiles (os, channel) {
  var directory
  var filepart
  var channelURL

  switch (os.toLowerCase()) {
    case 'mac':
      directory = 'macosx64'
      filepart = 'mac'
      break
    case 'linux':
      directory = 'linux64'
      filepart = 'linux-x86_64'
      break
    default:
      throw new Error('Unknown `--os`: ' + os)
  }

  switch (channel.toLowerCase()) {
    case 'nightly':
      channelURL = NIGHTLY_BASE_URL
      break
    case 'release':
      channelURL = format(RELEASE_BASE_URL, directory)
      break
    default:
      throw new Error('Unknown `--channel`: ' + channel)
  }

  return got(channelURL).then(function (res) {
    var html = $.load(res.body)
    var links = []

    html('a[href$="' + filepart + '.common.tests.zip"]').map(function (i, link) {
      var href = $(link).attr(href).href
      links.push(channelURL + href)
    })
    return links.pop()
  })
}

function verifyBuild (href) {
  return got.head(href).then(function (res) {
    return {
      href: href,
      statusCode: res.statusCode,
      contentLength: parseInt(res.headers['content-length'], 10)
    }
  })
}
