#!/usr/bin/env node

'use strict'

const AppName = process.argv[2]
const Location = process.argv[3]
if (!AppName) {
  console.log("no")
  process.exit(1);
}

const fs = require('fs');
const path = require('path');

const { spawn, spawnSync } = require('child_process')
const createLocalNginx = require('./template/nginx/serge.js');
const createPackageJson = require('./template/package/serge.js')

spawnSync('cp', ['-r', './site', 'serge', AppName])

const who = spawnSync('whoami')
const author = who.stdout.toString().trim()
const LocalNginxData = createLocalNginx(AppName, Location);
const PackageJsonData = createPackageJson(AppName, author)

const createApp = (LocalNginxData, PackageJsonData) => {
  let localNginx = path.resolve(process.cwd(), AppName, 'nginx', `${AppName}.test.conf`);
  fs.writeFile(localNginx, LocalNginxData, function (err) {
    console.log(`${localNginx} created`)
  })
  let packageJson = path.resolve(process.cwd(), AppName, 'package.json');
  fs.writeFile(packageJson, PackageJsonData, function (err) {
    console.log(`${packageJson} created`)
  })
}

createApp(LocalNginxData, PackageJsonData)

module.exports = { createApp };


