module.exports = (AppName, Port, DevPort) => `server {
    listen 80;
    server_name www.${AppName}.test ${AppName}.test;

    location / {
      proxy_pass http://localhost:${Port};
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }

  server {
    listen 80;
    server_name dev.${AppName}.test;

    location / {
      proxy_pass http://localhost:${DevPort};
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
  `