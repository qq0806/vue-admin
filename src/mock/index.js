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
//通讯录数据
let regionArr = [
  "成都分公司",
  "北京分公司",
  "上海分公司",
  "哈尔滨公司",
  "微易",
  "郑州公司",
  "测试部门",
  "财务部",
  "地州区",
  "盒马项目组",
  "成都区",
  "贵州区",
  "电商部",
  "综合管理部",
  "全民营销项目组",
  "单团部",
  "新销售业务部",
  "欧洲组",
  "中东非组",
  "票务组",
  "外联部",
  "西南总经理办公室",
  "市场营销部",
  "单团计调部",
  "票务部",
  "南亚计调部",
  "欧洲散拼计调部",
  "签证部",
  "东南亚事业部",
  "产品组",
  "途牛组",
  "携程组",
  "其他电商组",
  "资料组",
  "运营支持组",
  "京津组",
  "河北组",
  "太原公司",
  "内蒙古组"
];
let positionArr = ["经理", "主管", "员工", "实习生"];
let genderArr = ["男", "女"];
Mock.mock("api/mailListData", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: "@increment(1)",
      name: "@cname",
      img: "@dataImage(80x80)",
      backgroundColor: "@color",
      phone: /\d{3}-\d{8}|\d{4}-\d{7}/,
      tel: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
      qq: /^[1-9][0-9]{4,10}$/,
      gender: () => {
        let num = parseInt(Math.random() * genderArr.length);
        return genderArr[num];
      },
      region: () => {
        let num = parseInt(Math.random() * regionArr.length);
        return regionArr[num];
      },
      position: () => {
        let num = parseInt(Math.random() * positionArr.length);
        return positionArr[num];
      },
      label: [
        {
          teg: "@cword(0,3)",
          color: "@color()"
        },
        {
          teg: "@cword(0,3)",
          color: "@color()"
        },
        {
          teg: "@cword(0,3)",
          color: "@color()"
        }
      ]
    }
  ]
});
//人员信息数据
let stateArr = ["审批通过", "审批未通过", "审批中"];
Mock.mock("api/personnel", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      name: "@cname(2,4)",
      JobNumber: "@integer(1000,9999)",
      mechanism: "区域中心",
      region: () => {
        let num = parseInt(Math.random() * regionArr.length);
        return regionArr[num];
      },
      startTime: "@date()",
      endTime: "@date",
      state: () => {
        let num = parseInt(Math.random() * stateArr.length);
        return stateArr[num];
      }
    }
  ]
});
