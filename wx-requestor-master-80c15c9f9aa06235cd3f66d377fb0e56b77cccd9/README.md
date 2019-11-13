### 微信小程序请求封装
此js主要运用与公司内部(公司没有git服务器，只能放这)，并结合后端接口规范，简化请求而来。

#### 代码简化
开发人员真正关心只有url、参数，其它都可配置化

##### 使用说明
- 引用方式
```
const requestor = require('./wx-requestor.js')
let config = {}
let ajax = requestor(config)
ajax.requestAPI(apiOpt, params)
  .then((res) => {
  })
```
- 统一处理
res 为返回的 response, 统一处理了 resCode 的问题。
- 实现 all、race、spread 方法

```
ajax.requestALL([promise1, promise2, promise3])
  .then(ajax.spread(function(ret1, ret2, ret3){
      console.log(ret1, ret2, ret3)
    })
  )
```
##### 初始配置参数说明

- config

  参考代码中 defaultOpt

##### 使用参数说明
- apiOpt

| 参数      | 说明                      | 类型 | 可选值  | 默认值 |
| ----------- | --------------------------- | ------ | ---------- | ------ |
| addToHeader | 是否添加请求头       | bool   | true、false | false  |
| cookieName  | 添加到请求头的value值关键字 | string |            | scn    |
| headerName  | 添加到请求的key值    | string |            | Cookie |

- params

  请求参数

##### 原来
```
var headers = {};
if (that.scn != '') {
  headers = {
    Cookie: 'scn=' + that.scn
  };
}
wx.request({
  url: Host + '/query',
  header: headers,
  data: {
    longitude: that.longitude,
    latitude: that.latitude,
  },
  method: 'POST',
  success: function success(res) {
  }
});
```
##### 现在(具体可看demo)
```
let params = {
  longitude: that.longitude,
  latitude: that.latitude,
}
ajax.requestAPI(api.query, params)
  .then((res) => {
  });
```
#### 将要实现
- <font color=#F7F7F7 size=4>缓存配置接口</font>
- <font color=#F7F7F7 size=4>多请求设置</font>
- <font color=#F7F7F7 size=4>多个请求头code码设置</font>
