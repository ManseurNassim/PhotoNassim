const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' // Utilise '/' pour la racine du domaine sur Netlify
    : '/'
});
