module.exports = (AppName, Port) => `server {
    listen 80;
    server_name ${AppName};
    return 301 https://$host$request_uri;
  }
  
  server {
    listen 443 ssl;
    server_name ${AppName};
    ssl_certificate /etc/letsencrypt/live/${AppName}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${AppName}/privkey.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
  
    location / {
      proxy_pass http://localhost:${Port};
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      add_header Content-Security-Policy "form-action 'self';
	             base-uri 'self';
                     frame-ancestors none;
	             default-src 'none';
		     script-src 'self' https://d3js.org https://fonts.googleapis.com https://maps.googleapis.com;
		     img-src 'self' https://*.ggpht.com https://*.googleapis.com https://*.gstatic.com data:;
		     style-src 'self' https://*.googleapis.com 'unsafe-inline';
		     font-src 'self' https://*.gstatic.com data:;
		     frame-src 'self';
		     connect-src 'self' https://apis.google.com;
		     object-src 'none' ";
      add_header X-Frame-Options SAMEORIGIN always;
      add_header X-XSS-Protection "1; mode=block";
      add_header X-Content-Type-Options nosniff;
      add_header Content-Security-Policy "frame-ancestors none;";
      add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    }
  }
  `
