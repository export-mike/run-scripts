# Add/Remove Run Scripts to your package.json
run-scripts allows you to add/remove run scripts to your package json in a oneliner.

```
run-scripts add test mocha
run-scripts add debug node --inspect --debug-brk index.js
```

both commands would add:
```js
	"scripts": {
		"debug": "node --inspect --debug-brk index.js",
		"test": "mocha"
	}
```

## Install
### Global
```
npm i -g @mikeljames/run-scripts
```
```
yarn global add @mikeljames/run-scripts
```
