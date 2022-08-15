/**
 * @fileoverview ESLint Plugin to error when using await inside promise statements
 * @author Hugo van Rijswijk
 */
'use strict';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
  configs: {
    recommended: {
      plugins: ['no-await-in-promise'],
      rules: {
        'no-await-in-promise/no-await-in-promise': 'error',
      },
    },
  },
  rules: require('./rules/no-await-in-promise'),
};
