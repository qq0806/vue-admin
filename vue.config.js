module.exports = {
  devServer: {
    proxy: {
      "/api": {
        ws: false,
        target: "http://localhost:4000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
