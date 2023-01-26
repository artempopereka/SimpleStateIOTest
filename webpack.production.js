"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var webpack = require("webpack");
var fs_1 = require("fs");
var mini_css_extract_plugin_1 = require("mini-css-extract-plugin");
var optimize_css_assets_webpack_plugin_1 = require("optimize-css-assets-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var pkg = JSON.parse(fs_1.default.readFileSync(path.join(__dirname, "package.json"), "utf-8"));
module.exports = function (env) {
    return {
        mode: env.mode,
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        emitError: true,
                        emitWarning: true,
                        failOnError: true,
                        failOnWarning: true,
                    },
                },
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "game.[contenthash].js",
        },
        plugins: [
            new mini_css_extract_plugin_1.default({
                filename: "[name].[contenthash].css",
            }),
            new optimize_css_assets_webpack_plugin_1.default({
                assetNameRegExp: /\.css$/i,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ["default", { discardComments: { removeAll: true } }],
                },
                canPrint: true,
            }),
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version + "r"),
            }),
            new webpack.ProgressPlugin(),
        ],
    };
};
