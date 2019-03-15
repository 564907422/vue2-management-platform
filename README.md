# vue2-management-platform（请点右上角star）


# 概述
paas 管理平台 web端，提供申请服务、服务列表、编辑服务功能
# 依赖项版本


~~"vue": "^2.1.0",~~

~~"vue-router": "^2.1.3",~~ // vue.js官方路由
    
~~"axios": "^0.16.1",~~   // 官方已不再推荐使用vue-resource，如今推荐axios。

~~"element-ui": "^1.2.3",~~ // 样式库

  "mockjs": "^1.0.1-beta3", //模拟数据使用
     
     更新：vue已升级至2.5.X，elementUI已升级至2.2，其他相关依赖也已升级，
     具体请参考https://github.com/suweiteng/vue2-management-platform/blob/master/package.json
     
    
    
# 特别提醒
 为了便于项目在github pages直接在线预览，部分配置与本地运行配置不一样
 
 一是在`config/index.js`中的`assetsPublicPath: '/vue2-management-platform/'`,本地打包可改为`assetsPublicPath: '/'`
 
 
# 更新

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
