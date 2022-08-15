# eslint-plugin-no-await-in-promise

ESLint Plugin to error when using await inside promise statements. Using `await` inside a `Promise.all` or `Promise.race` will make the awaited Promise resolve first, and only after that the `Promise.all` or `Promise.race` will be called. For `.all`, this means the promises are run serially, for `.race`, the awaited promise will now _always_ win. This is almost never what you want.

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
```

Next, install `eslint-plugin-no-await-in-promise`:

```sh
npm install eslint-plugin-no-await-in-promise --save-dev
```

## Usage

Add `no-await-in-promise` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["no-await-in-promise"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "no-await-in-promise/rule-name": "error"
  }
}
```
