module.exports = (AppName, Location) => `server {
    listen 80;
    server_name ${AppName.split('.')[0]}.test ${AppName}.test;
  
    root ${Location}/public;
    index index.html;

    location / {
      try_files $uri $uri/ =404;
    }
  }

  server {
    listen 80;
    server_name dev.${AppName.split('.')[0]}.test dev.${AppName}.test;

    root ${Location};
    index index.html;

    location / {
      try_files $uri $uri/ =404;
    }
  }
  `
