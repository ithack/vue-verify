# vue-verify

> A Vue-verify.js project

上一个开发项目中发现表单验证这个东西可定制性很强，在网上看了一些vue现成的表单验证插件，但用起来还是不如DIY一个方便，所以萌生了自己写一个表单验证的想法，尽量做到如下几点：
1.报错时机可选
2.可以直接用
3.看到即可上手
4.按顺序来校验，在第一个报错的框弹出错误


还在开发阶段，目前只是弄了个大概的架子；

直接看directives>verify.js(架子)后期的所有验证方法都会放到这个文件中
用法可看 hello.vue 文件如下：

```
#引用指令文件
import '../directives/verify';
#input使用指令()
<input type="text" class="input" v-verify:opt.change.fn="[{'fn':'diy'},{'dd':'vanow'}]" tag="登录密码" v-model.trim="Password" name="mydiy">
#注：name="mydiy"和class="input"是必不可少的值修改，verify里相应的DOM获取也要修改

```

## start

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

For detailed explanation on how things work, checkout the [guide](https://github.com/ithack/vue-verify.git) and [docs for vue-loader](https://github.com/ithack/vue-verify.git).
