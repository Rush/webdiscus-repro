# Steps to reproduce

```ts
npm install
npm run reproduce
```

It will create output:
```

> webdiscus-pug-node-example@1.0.0 reproduce
> webpack --config ./webpack.node.ts --mode=production

assets by status 2.5 KiB [cached] 1 asset
cached modules 103 bytes [cached] 1 module
./server/views/unsupported-browser.pug 39 bytes [built] [1 error]

ERROR in ./server/views/unsupported-browser.pug
Module build failed (from ./node_modules/@webdiscus/pug-loader/src/index.js):
NonErrorEmittedError: (Emitted value instead of an instance of Error)
[pug-loader] Failed to execute template function.
Template file: /code/webdiscus-pug-node-example/server/views/unsupported-browser.pug
Possible reason: in the template may be used undefined variable.
Solution in this case pass a variable into a pug file via the query parameter.
For example, if in pug is used the external variable, like title= customData.options.title,
then pass it into pug 'template.pug?customData=' + JSON.stringify({options:{title:'My title'}})
TypeError: Cannot read properties of undefined (reading 'undefined')
    at processResult (/code/webdiscus-pug-node-example/node_modules/webpack/lib/NormalModule.js:750:12)
    at /code/webdiscus-pug-node-example/node_modules/webpack/lib/NormalModule.js:855:5
    at /code/webdiscus-pug-node-example/node_modules/loader-runner/lib/LoaderRunner.js:399:11
    at /code/webdiscus-pug-node-example/node_modules/loader-runner/lib/LoaderRunner.js:251:18
    at runSyncOrAsync (/code/webdiscus-pug-node-example/node_modules/loader-runner/lib/LoaderRunner.js:156:3)
    at iterateNormalLoaders (/code/webdiscus-pug-node-example/node_modules/loader-runner/lib/LoaderRunner.js:250:2)
    at /code/webdiscus-pug-node-example/node_modules/loader-runner/lib/LoaderRunner.js:223:4
    at /code/webdiscus-pug-node-example/node_modules/webpack/lib/NormalModule.js:829:15
    at eval (eval at create (/code/webdiscus-pug-node-example/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:12:1)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
 @ ./server/mainPublic.ts 2:12-54

server (webpack 5.68.0) compiled with 1 error in 243 ms
```
