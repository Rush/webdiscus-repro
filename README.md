# Steps to reproduce

```ts
npm install
npm run reproduce
# or run: "npm run build" to see a successful build without the bug
```

To check how it should build:


It will create output:
```
> webdiscus-pug-node-example@1.0.0 reproduce
> webpack --config ./webpack.node.ts --mode=production

assets by status 4.63 KiB [cached] 1 asset
cached modules 5.15 KiB [cached] 2 modules

ERROR in ./server/views/unsupported-browser.pug 37:300-434
Module not found: Error: Can't resolve '/code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2' in '/code/webdiscus-pug-node-example/server/views'
resolve '/code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2' in '/code/webdiscus-pug-node-example/server/views'
  using description file: /code/webdiscus-pug-node-example/package.json (relative path: ./server/views)
    root path /code/webdiscus-pug-node-example
      using description file: /code/webdiscus-pug-node-example/package.json (relative path: ./code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2)
        no extension
          /code/webdiscus-pug-node-example/code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2 doesn't exist
        .ts
          /code/webdiscus-pug-node-example/code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2.ts doesn't exist
        .js
          /code/webdiscus-pug-node-example/code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2.js doesn't exist
        as directory
          /code/webdiscus-pug-node-example/code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2 doesn't exist
    using description file: /code/webdiscus-pug-node-example/package.json (relative path: ./assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2)
      no extension
        /code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2 doesn't exist
      .ts
        /code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2.ts doesn't exist
      .js
        /code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2.js doesn't exist
      as directory
        /code/webdiscus-pug-node-example/assets,/code/webdiscus-pug-node-example/assets2/fonts/ibm-plex-sans-v7-latin-regular.woff2 doesn't exist
 @ ./server/mainPublic.ts 2:12-54
```
