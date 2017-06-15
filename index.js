#!/usr/bin/env node
const fs = require('fs');
const pkgPath = `${process.cwd()}/package.json`;
if (process.argv.length <= 2) {
    console.log('Usage: run-scripts:{add|delete} <command>');
    process.exit(-1);
}
var param = process.argv[2];
if (param === '--version' || param === '-v') {
	console.log(`v${require('./package.json').version}`);
}

if (param === '--help') {
	console.log(usage());
	process.exit(0);
}

let pkg;
try {
	pkg = require(pkgPath);
} catch (e) {
	console.log('Failed to read package.json. Ensure you are in the correct working directory');
	process.exit(1);
}

const commandName = process.argv[3];
if (!commandName) {
	console.log(usage());
	process.exit(1);
}

if (param === 'add') {
	const [_, __, ___, ...command] = process.argv;
	const commandValue = command.join(' ');
	if (!pkg.scripts) {
		pkg.scripts = {};
	}
	pkg.scripts[commandName] = commandValue;
	write();
	process.exit(0);
}

if (param === 'del') {
	if (!pkg.scripts[commandName]) {
		console.log(`${commandName} does not exist.`);
		process.exit(1);
	}

	delete pkg.scripts[commandName];
	write();
	process.exit(0);
}

console.log(usage());

function usage() {
	return `Version: --version, -v
Add: add <command>
Delete: del <commandName>`;
}

function write() {
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
}
