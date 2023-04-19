# eslint-plugin-no-await-in-promise

[![npm](https://img.shields.io/npm/v/eslint-plugin-no-await-in-promise)](https://www.npmjs.com/package/eslint-plugin-no-await-in-promise)

ESLint Plugin to error when using await inside promise statements. Using `await` inside a `Promise.all` or `Promise.race` will make the awaited Promise resolve first, and only after that the `Promise.all` or `Promise.race` will be called. For `.all`, this means the promises are run serially, for `.race`, the awaited promise will now _always_ win. This is rarely what you want. This plugin will warn you against such usages and suggest an auto-fix.

## Rule Details

Examples of **incorrect** code for this rule:

```js
await Promise.all([await foo(), bar()]);
await Promise.race([foo(), await bar()]);
```

Examples of **correct** code for this rule:

```js
await Promise.all([foo(), bar()]);
await Promise.race([foo(), bar()]);
```

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
// Or
yarn add -D eslint
```

Next, install `eslint-plugin-no-await-in-promise`:

```sh
npm install eslint-plugin-no-await-in-promise --save-dev
// Or
yarn add -D eslint-plugin-no-await-in-promise
```

## Usage

Configure the plugin in your `.eslintrc`:

```json
{
  "extends": ["plugin:no-await-in-promise/recommended"]
}
```

This essentially expands to:

```json
{
  "plugins": ["no-await-in-promise"],
  "rules": {
    "no-await-in-promise/no-await-in-promise": "error"
  }
}
```
