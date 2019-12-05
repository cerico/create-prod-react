source config.env
rsync --rsh=ssh -av server.js "root@$server:/var/www/html/$server"
rsync --rsh=ssh -av dist "root@$server:/var/www/html/$server"
rsync --rsh=ssh -av package.json "root@$server:/var/www/html/$server"
ssh root@$server pm2 restart $server
