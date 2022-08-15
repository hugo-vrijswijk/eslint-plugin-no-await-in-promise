/**
 * @fileoverview ESLint Plugin to error when using await inside promise statements
 * @author Hugo van Rijswijk
 */
'use strict';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = require('./rules/no-await-in-promise');
