
// const webpack= require('webpack')

// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = {
    target: "node",
    resolve: {

        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "url": require.resolve("url/"),
            "stream": require.resolve("stream-browserify"),
            "fs": false,
            "http": require.resolve("stream-http"),
            "crypto": require.resolve("crypto-browserify")

        }

    },
    plugins: [
        new NodePolyfillPlugin()
    ]
}