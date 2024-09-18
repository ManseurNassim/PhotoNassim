const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Photo-Project/' // Le nom du sous-répertoire où ton site est hébergé
    : '/'
};
