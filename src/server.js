import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './components/app'

// init express
const app = express();

// 以下のパスで以下ディレクトリのファイルを、静的ファイルとして公開する
app.use('/static', express.static('build'));

// root（'/'のパスにindex.htmlがあると優先される点には注意）
app.get('/', (req, res) => {
  console.log("/root");
  res.send(
    // ReactDOMServer.renderToString()を使って、コンポーネントをプリレンダリングできる
    // プリレンダリング後もクライアント側で処理し続けるためには、js再度読込も必要
    // ただ、再レンダリングされるので、ブラウザのコンソールにプリレンダリングが無駄になってるよってwarningが出てしまう
    ReactDOMServer.renderToString(
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <title>app</title>
        </head>
        <body>
          <div>
            ほげほげ
            <div id="app">
              <App />
            </div>
            <script src="/static/transformed.js" />
          </div>
        </body>
      </html>
    )
    // waring回避したいなら、コンポーネント部分を外すだけでよい
    /*
    ReactDOMServer.renderToString(
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <title>app</title>
        </head>
        <body>
          <div>
            ほげほげ
            <div id="app">
            </div>
            <script src="/static/transformed.js" />
          </div>
        </body>
      </html>
    )
    */
  );
});

// start listen
app.listen(3000, () => {
  console.log('Express listening on port 3000!');
});
