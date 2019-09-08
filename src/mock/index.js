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
