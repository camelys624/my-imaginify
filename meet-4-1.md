# 会议纪要

## 后端添加一个公共的方法

添加一个公共方法来处理后端返回到前端的数据，这样可以减少重复代码的编写。

返回格式大致如下：

```json
{
  "code": 1,  // 自己定义状态码意义
  "msg": "success",  // 状态码对应的信息
  "data": {}  // 返回的数据
}
```

## 所有的图片上传到七牛云

## 数据库添加一个表

这个表来记录图片与用户之间的关联关系。

然后用户表需要添加 userId 字段，也可以先加一个 head 字段来存储用户头像。

## 流程

前端上传图片 -> 后端上传图片到七牛云 -> 保存图片信息到数据库 -> 返回图片地址给前端

前端发起图片处理请求 -> 后端通知python服务处理图片 -> python 服务器返回处理之后的图片到后端 -> 后端上传图片到七牛云 -> 保存处理之后的图片信息到数据库 -> 返回处理后的图片地址给前端

![chrome-capture-2024-3-1.gif](https://img2.imgtp.com/2024/04/01/p9XV6g01.gif)