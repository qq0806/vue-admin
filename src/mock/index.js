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
      name: "@cname(2, 4)"
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
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
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
//offer数据
let educationArr = ["初中", "高中", "大专", "本科", "硕士", "博士", "博士后"];
let famousRaceArr = [
  "汉族",
  "壮族",
  "回族",
  "满族",
  "维吾尔族",
  "苗族",
  "彝族",
  "土家族",
  "藏族",
  "蒙古族",
  "侗族",
  "布依族",
  "瑶族",
  "白族",
  "朝鲜族",
  "哈尼族",
  "黎族",
  "哈萨克族",
  "傣族",
  "畲族",
  "傈僳族",
  "东乡族",
  "仡佬族",
  "拉祜族",
  "佤族",
  "水族",
  "纳西族",
  "羌族",
  "土族",
  "仫佬族",
  "锡伯族",
  "柯尔克孜族",
  "景颇族",
  "达斡尔族",
  "撒拉族",
  "布朗族",
  "毛南族",
  "塔吉克族",
  "普米族",
  "阿昌族",
  "怒族",
  "鄂温克族",
  "京族",
  "基诺族",
  "德昂族",
  "保安族",
  "俄罗斯族",
  "裕固族",
  "乌孜别克族",
  "门巴族",
  "鄂伦春族",
  "独龙族",
  "赫哲族",
  "高山族",
  "珞巴族",
  "塔塔尔族"
];
Mock.mock("api/offerData", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      _id: "@increment(1)",
      name: "@cname",
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
      QQ: /^[1-9][0-9]{4,10}$/,
      gender: () => {
        let num = parseInt(Math.random() * genderArr.length);
        return genderArr[num];
      }, //性别
      region: () => {
        let num = parseInt(Math.random() * regionArr.length);
        return regionArr[num];
      }, //部门
      position: () => {
        let num = parseInt(Math.random() * positionArr.length);
        return positionArr[num];
      }, //职位
      nativePlace: "@province", //籍贯
      "marriage|1": ["已婚", "未婚"],
      documentType: "@cword(2,4)", //证件类型
      documentNum: "@id", //证件号码
      dateOfBirth: "@date()", //出生日期
      "approval|1": ["代发", "已发", "已接受", "已拒绝", "已入职"], //审批状态
      age: "@natural(20, 50)",
      education: () => {
        let num = parseInt(Math.random() * educationArr.length);
        return educationArr[num];
      }, //学历
      entry: "@date()", //入职日期
      famousRace: () => {
        let num = parseInt(Math.random() * famousRaceArr.length);
        return famousRaceArr[num];
      }, //名族
      city: "@city()"
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

// 薪酬管理数据
Mock.mock("api/pay", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      title: "@cword(3, 5)",
      plan: "@integer(10000,1000000)",
      actual: "@integer(10000,1000000)",
      lastActual: "@integer(10000,1000000)",
      LastPlan: "@integer(10000,1000000)",
      isInput1: false,
      isInput2: false,
      isInput3: false
    }
  ]
});
