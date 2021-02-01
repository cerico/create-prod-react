module.exports = (AppName, author) => `{
    "name": "${AppName}",
    "version": "1.0.0",
    "description": "${AppName}",
    "main": "server.js",
    "dependencies": {
      "css-mqpacker": "^7.0.0",
      "postcss": "^8.2.4",
      "postcss-cli": "^8.3.1",
      "postcss-combine-duplicated-selectors": "^10.0.2",
      "sass": "^1.26.10",
      "sergey": "0.0.13"
    },
    "scripts": {
      "dev": "sergey --watch --port=8500 --exclude=.vscode,*.conf,src",
      "netlify": "netlify deploy --prod -d public",
      "sass": "sass --no-source-map src/style.scss files/style.css ",
      "mqpacker": "mqpacker -s ./files/style.css ./files/style.css",
      "minify": "sass --no-source-map files/style.css files/style.min.css --style compressed",
      "build": "npm run sass && npm run mqpacker && npm run combine && npm run minify",
      "create": "sergey --exclude=.vscode,*.conf,src",
      "combine": "postcss --no-map files/style.css --use postcss-combine-duplicated-selectors --output files/style.css",
      "go": "npm run dev & npm run sass"
    },
     "author": "${author}",
    "license": "ISC"
  }`
