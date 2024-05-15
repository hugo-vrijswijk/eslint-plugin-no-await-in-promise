import type { ESLint } from 'eslint';

/**
 * @fileoverview ESLint Plugin to error when using await inside promise statements
 * @author Hugo van Rijswijk
 */
import noAwaitInPromise from './rules/no-await-in-promise';

const plugin: ESLint.Plugin = {
  meta: {},
  configs: {},
  rules: {
    'no-await-in-promise': noAwaitInPromise,
  },
  processors: {},
};

const configs = {
  recommended: {
    plugins: {
      'no-await-in-promise': plugin,
    },
    rules: {
      'no-await-in-promise/no-await-in-promise': 'error',
    },
  },
  /**
   * @deprecated use recommended (flat) config instead
   */
  'recommended-legacy': {
    plugins: ['no-await-in-promise'],
    rules: {
      'no-await-in-promise/no-await-in-promise': 'error',
    },
  },
};
Object.assign(plugin.configs!, configs);

export default plugin as typeof plugin & { configs: typeof configs };
