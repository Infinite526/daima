const glob = require("glob");
const PAGE_PATH = './src/pages';
const path = require('path');
const contentBase = process.cwd();

//  首先得到包含pages文件夹里面符合条件的路径数组
let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');

//  pages就是vue.config.js里面pages选项的值，是一个对象
let pages = {};

//  遍历得到的路径数组，从字符串中分割出需要的页面名字
entryHtml.forEach((filePath) => {
    let fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
    pages[fileName] = {
        entry: `src/pages/${fileName}/${fileName}.js`,
        template: `src/pages/${fileName}/${fileName}.html`,
        filename: `${fileName}.html`
    }
});

module.exports = {
    baseUrl: './',
    lintOnSave: false,
    pages: pages,
    devServer: {
        disableHostCheck: true,
        port: 80,
        proxy: {
            "^/api-meidian-app": {
                target: 'http://apigrouporder.uatplus.com', //http://apigrouporder.gome.com.cn
                // target: 'http://10.115.5.6:9109',
                // target: 'http://apigrouporder.gome.com.cn', //第三套
                // target: 'http://apigrouporder.gome.com.cn', //生产
                changeOrigin: true,
                pathRewrite: function(path) {
                    return path.replace(/\/api-meidian-app\//, '')
                }
            },
            //瓜分团
            "^/api-meidian-wap": {
                target: 'http://mobile.atguat.com.cn', //http://apigrouporder.gome.com.cn
                changeOrigin: true,
                pathRewrite: function(path) {
                    return path.replace(/\/api-meidian-wap\//, '')
                }
            },


        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('css', path.join(contentBase, 'src/assets/css'))
            .set('components', path.join(contentBase, 'src/components'))
            .set('util', path.join(contentBase, 'src/util'))
            .set('io', path.join(contentBase, 'src/io'))
    }

}