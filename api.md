# 下周需要开发的接口

## 图片列表接口

需要返回当前用户所有上传的图片（可以考虑分页），返回数据大体如下：

```json
{
  "code": 1,
  "msg": "",
  "data": {
    "list": [
      {
        "title": "xx",
        "originImg": "upload-imgs/xx.jpg",
        "processedImg": "processed-imgs/xx.jpg", // 可以先不传
        "createTime": "",
        "createUser": ""
      }
    ],
    // 下面的字段是如果做了分页的话需要返回的
    "total": 1,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

用户可以通过 title 来筛选图片。

## 上传文件接口

前端上传数据格式如下：

```json
{
    file: ... // 二进制文件流
}
```

后端需要接收数据并将数据写入到对应的文件目录，然后返回目录地址：

```json
{
  "code": 1,
  "msg": "",
  "data": {
    "path": "/upload-imgs/xx.jpg"
  }
}
```

## 修复图片接口

前端上传以下数据：

```json
{
  "title": "xxx",
  "path": "/upload-imgs/xx.jpg",
  "type": "restore"
}
```

后端返回处理之后的图片地址：

```json
{
  "code": 1,
  "msg": "",
  "data": {
    "path": "/upload-imgs/restored.jpg"
  }
}
```

## 背景移除接口

同上

## 静态文件服务器

需要研究 Java 分享静态文件。

## 找工作

- [阮一峰](https://github.com/ruanyf/weekly/issues/4075)
- [leetcode](https://leetcode.cn/company/)
- [v2ex](https://www.v2ex.com/?tab=jobs)
- 与之前被内推进去的兄弟打好关系，叫他帮忙内推
- 直接搜索想去的公司校招，通过官网页面投递简历

## text2img

有空的话可以研究这个，[Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) bilibili 应该蛮多教程，可以训练自己的模型，或者使用别人的模型生成小姐姐什么的，总之有时间就可以玩玩，劳逸结合。实在不行就调文言一心的api。
