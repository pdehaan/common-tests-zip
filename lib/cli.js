const format = require('util').format

const argv = require('argv')

const version = require('../package.json').version

module.exports.app = argv.option([
  {
    name: 'channel',
    short: 'c',
    type: 'string',
    description: 'Release channel. Valid values are "release" and "nightly". Required.',
    example: format('\'%s --channel=release\' or \'%s -c nightly\'', argv.name, argv.name)
  }, {
    name: 'os',
    short: 'o',
    type: 'string',
    description: 'Operating system. Valid values are "linux" and "mac". Required.',
    example: format('\'%s --os=mac\' or \'%s -o linux\'', argv.name, argv.name)
  }, {
    name: 'verify',
    short: 'v',
    type: 'string',
    description: 'Verifies the link and returns the result as a JSON object. Optional.',
    example: format('\'%s --verify\' or \'%s -v\'', argv.name, argv.name)
  }
]).version(version).run()

module.exports.options = module.exports.app.options

module.exports.help = argv.help
