source config.env
sftp root@$server << EOF
  cd /etc/nginx/conf.d
  put nginx/$server.conf
  mkdir /var/www/html/$server
  cd /var/www/html/$server
  put server.js
  put package.json
  mkdir dist
  put -r dist
  bye
EOF
ssh root@$server << EOF
  cd /var/www/html/$server
  npm install --only=production
  pm2 start server.js --name $server
  pm2 save
  service nginx stop
  /opt/letsencrypt/letsencrypt-auto certonly --standalone -d $server
  service nginx start
EOF
