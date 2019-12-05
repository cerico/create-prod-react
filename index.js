#!/usr/bin/env node

'use strict'

const AppName = process.argv[2]
if (!AppName) {
  console.log("no")
  process.exit(1);
}

const fs = require('fs');
const path = require('path');

const { spawn, spawnSync } = require('child_process')
const createLocalNginx = require('./template/nginx/local.js');
const createNginx = require('./template/nginx/production.js');
const createServer = require('./template/server.js');
const createConf = require('./template/config.js');
const createPackageJson = require('./template/package.js')
const createWebpack = require('./template/webpack.js')

spawnSync('cp', ['-r', './site', AppName])

function testPort () {
  const ls = spawn('sh', ['./bin/freeport']);
  const who = spawnSync('whoami')
  ls.stdout.on('data', (d) => {
    const port= d.toString().split(',')[0]
    const devport= d.toString().split(',')[1]
    const author = who.stdout.toString().trim()
    const LocalNginxData = createLocalNginx(AppName, port, devport);
    const NginxData = createNginx(AppName, port);
    const ServerData = createServer(port)
    const WebpackData = createWebpack(devport)
    const ConfData = createConf(AppName, port, devport)
    const PackageJsonData = createPackageJson(AppName, author)
    createApp(LocalNginxData, NginxData, ServerData, ConfData, PackageJsonData, WebpackData)
});

  ls.stderr.on('data', (port) => {
    console.log(`stderr: ${port}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

const createApp = (LocalNginxData, NginxData, ServerData, ConfData, PackageJsonData, WebpackData) => {
  let localNginx = path.resolve(process.cwd(), AppName, 'nginx', `${AppName}.test.conf`);
  fs.writeFile(localNginx, LocalNginxData, function (err) {
    console.log(`${localNginx} created`)
    // spawnSync('cp', ['-r', nginx, '/usr/local/etc/nginx/servers/'])
    // spawnSync('sudo brew services reload nginx')
  })
  let nginx = path.resolve(process.cwd(), AppName, 'nginx', `${AppName}.conf`);
  fs.writeFile(nginx, NginxData, function (err) {
    console.log(`${localNginx} created`)
    // spawnSync('cp', ['-r', nginx, '/usr/local/etc/nginx/servers/'])
    // spawnSync('sudo brew services reload nginx')
  })
  let server = path.resolve(process.cwd(), AppName, 'server.js');
  fs.writeFile(server, ServerData, function (err) {
    console.log(`${server} created`)
  })
  let conf = path.resolve(process.cwd(), AppName, 'config.env');
  fs.writeFile(conf, ConfData, function (err) {
    console.log(`${conf} created`)
  })
  let packageJson = path.resolve(process.cwd(), AppName, 'package.json');
  fs.writeFile(packageJson, PackageJsonData, function (err) {
    console.log(`${packageJson} created`)
    // publish()
  })
  let Webpack = path.resolve(process.cwd(), AppName, 'webpack', 'dev.config.js');
  fs.writeFile(Webpack, WebpackData, function (err) {
    console.log(`${Webpack} created`)
    // publish()
  })
}

testPort()

module.exports = { testPort};


