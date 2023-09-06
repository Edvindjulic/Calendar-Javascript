const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./public/main.js",
    newcalendar: "./public/newcalendar.js",
    todo: "./public/todo.js",
    welcomesegment: "./public/welcomesegment.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main", "newcalendar", "todo", "welcomesegment"],
      filename: "index.html",
      scriptLoading: "blocking",
      inject: (data) => {
        let tags = '';
        for (let chunk in data.chunks) {
          if (chunk === 'todo') {
            tags += `<script defer src="${data.chunks[chunk].entry}"></script>`;
          } else {
            tags += `<script src="${data.chunks[chunk].entry}"></script>`;
          }
        }
        return tags;
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
