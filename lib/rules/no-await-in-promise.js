/**
 * @fileoverview Error when using await inside promise statements
 * @author Hugo van Rijswijk
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'no await inside Promise statements',
      recommended: true,
      url: 'https://github.com/hugo-vrijswijk/eslint-plugin-no-await-in-promise/blob/main/docs/rules/no-await-in-promise.md',
    },
    messages: {
      noAwaitInPromise:
        "Don't use await inside Promise.{{ name }}. The promise will be awaited first, and then the Promise.{{ name }} will be called.",
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function (context) {
    return {
      AwaitExpression: function (node) {
        const nonAllowedNames = ['all', 'allSettled', 'any', 'race'];
        if (
          node.parent.type === 'ArrayExpression' &&
          node.parent.parent.type === 'CallExpression' &&
          node.parent.parent.callee.type === 'MemberExpression' &&
          node.parent.parent.callee.object.type === 'Identifier' &&
          node.parent.parent.callee.object.name === 'Promise' &&
          node.parent.parent.callee.property.type === 'Identifier' &&
          nonAllowedNames.includes(node.parent.parent.callee.property.name) &&
          node.range &&
          node.argument.range
        ) {
          const start = node.range[0];
          const end = node.argument.range[0];

          context.report({
            node,
            messageId: 'noAwaitInPromise',
            data: {
              name: node.parent.parent.callee.property.name,
            },
            fix: function (fixer) {
              return fixer.removeRange([start, end]);
            },
          });
        }
      },
    };
  },
};
