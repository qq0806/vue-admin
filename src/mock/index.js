import Mock from "mockjs";

//新通知数据
Mock.mock("api/newNotice", "get", {
  code: 200,
  msg: "success",
  "data|5": [
    {
      boolean: "@boolean",
      text: "@cparagraph(1,3)"
    }
  ]
});
//头部利润
Mock.mock("api/profit", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      id: "@increment(1)",
      price: "@integer(10000,100000)",
      value: "@integer(0,100)"
    }
  ]
});
//生成城市
Mock.mock("api/city", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      city: "@city()",
      num: "@integer(0,100)",
      color: "@color"
    }
  ]
});

//汇报人数据
Mock.mock("api/reporter", "get", {
  code: 200,
  msg: "success",
  "data|20": [
    {
      name: "@cword(3, 4)"
    }
  ]
});
//获取网站问卷调查数据
Mock.mock("api/website", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      title: "@cword(2, 4)",
      content: "@cword(2, 5)",
      creationTime: "@date()",
      deadline: "@date",
      "topic|1": ["未发布", "已发布", "已截止"],
      "websiteName|1": ["百度", "豆瓣", "掘金", "Github"]
    }
  ]
});
