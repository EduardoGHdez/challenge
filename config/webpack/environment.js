const { environment } = require('@rails/webpacker')

environment.loaders.get('babel').exclude = [/\.test\.js$/, environment.loaders.get('babel').exclude];

module.exports = environment
