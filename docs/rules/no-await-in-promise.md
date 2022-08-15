# Don't use await inside promise statements (no-await-in-promise)

Using `await` inside a `Promise.all` or `Promise.race` will make the awaited Promise resolve first, and only after that the `Promise.all` or `Promise.race` will be called. For `.all`, this means the promises are run serially, for `.race`, the awaited promise will now _always_ win. This is almost never what you want.

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


## When Not To Use It

If you are absolutely sure that awaiting a promise is what you want inside a promise, you can disable it, but you should consider doing so only if you know what you are doing.
