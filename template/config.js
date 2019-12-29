module.exports = (AppName, port, devport) => `server=${AppName}
appname=${AppName}
local_nginx_location=/usr/local/etc/nginx/servers/
production_nginx_location=/etc/nginx/conf.d/
port=${port}
devport=${devport}
user=deploy
key=~/.ssh/deploy
`
