module.exports = {
  ...require('./parser'),
  ...require('./html'),
  ...require('./errors'),
  Default: require('./default')
}
