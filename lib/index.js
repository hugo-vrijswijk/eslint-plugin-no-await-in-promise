/**
 * @fileoverview ESLint Plugin to error when using await inside promise statements
 * @author Hugo van Rijswijk
 */
'use strict';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  configs: {
    recommended: {
      plugins: ['no-await-in-promise'],
      rules: {
        'no-await-in-promise/no-await-in-promise': 'error',
      },
    },
  },
  rules: {
    'no-await-in-promise': require('./rules/no-await-in-promise'),
  },
};
