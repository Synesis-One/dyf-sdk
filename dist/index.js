
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dyf.cjs.production.min.js')
} else {
  module.exports = require('./dyf.cjs.development.js')
}
