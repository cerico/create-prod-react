module.exports = (AppName, author) => `{
    "name": "${AppName}",
    "version": "1.0.0",
    "description": "${AppName}",
    "main": "server.js",
    "dependencies": {
      "express": "^4.17.1"
    },
    "devDependencies": {
      "@babel/core": "^7.7.7",
      "babel-loader": "^8.0.6",
      "babel-plugin-transform-react-jsx": "^6.24.1",
      "babel-preset-react": "^6.24.1",
      "css-loader": "^3.4.0",
      "node-sass": "^4.13.0",
      "react": "^16.12.0",
      "react-dom": "^16.12.0",
      "react-redux": "^7.1.3",
      "redux": "^4.0.4",
      "redux-thunk": "^2.3.0",
      "sass-loader": "^8.0.0",
      "style-loader": "^1.1.1",
      "webpack": "^4.41.4",
      "webpack-cli": "^3.3.10",
      "webpack-dev-server": "^3.10.1",
      "webpack-merge": "^4.2.2"
    },
    "scripts": {
      "dev": "webpack-dev-server --config webpack/dev.config.js",
      "build": "webpack --config webpack/prod.config.js && npm run copy",
      "copy": "cp -r src/index.html dist && cp -r public dist",
      "start": "node server.js",
      "deploy": "./bin/deploy.sh"
    },
    "author": "${author}",
    "license": "ISC"
  }`
