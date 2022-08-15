/**
 * @fileoverview Error when using await inside promise statements
 * @author Hugo van Rijswijk
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'no await inside Promise statements',
      recommended: true,
    },
    messages: {
      noAwaitInPromise:
        "Don't use await inside Promise.{{ name }}, the promise will be awaited first and then the Promise.{{ name }} will be called.",
      removeAwait: 'Remove await statement',
    },
    hasSuggestions: true,
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
          context.report({
            node,
            messageId: 'noAwaitInPromise',
            data: {
              name: node.parent.parent.callee.property.name,
            },
            suggest: [
              {
                messageId: 'removeAwait',
                fix: function (fixer) {
                  // @ts-expect-error checked above
                  const start = node.range[0];
                  // @ts-expect-error checked above
                  const end = node.argument.range[0];
                  return fixer.removeRange([start, end]);
                },
              },
            ],
          });
        }
      },
    };
  },
};
