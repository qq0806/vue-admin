const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const mongoose = require("mongoose");
const session = require("koa-session");
const jwtKoa = require("koa-jwt");
const secret = "lpwq 1225";
const verToken = require("./middleeware/token");

const index = require("./routes/index");
const users = require("./routes/users");

app.keys = ["lpwq 1225"];

const CONFIG = {
  key: "koa:sess",
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());

// app.use(async(ctx, next)=> {
//   let token = ctx.headers.authorization
//   if(token === undefined){
//     await next()
//   }else{
//     verToken.verToken(token).then((data)=> {
//       //这一步是为了把解析出来的用户信息存入全局state中，这样在其他任一中间价都可以获取到state中的值
//       console.log('数据:' + JSON.stringify(data))
//       ctx.state = {
//         data:data
//       }
//     })
//     await next()
//   }
// })
//
//
// // token设置
// app.use(async(ctx, next)=>{
//   return next().catch((err) => {
//     if (err.status === 401) {
//       ctx.status = 401
//       ctx.body = {
//         status:401,
//         msg:'登录过期，请重新登录'
//       }
//     } else {
//       throw err
//     }
//   })
// })
//
// app.use(jwtKoa({secret}).unless({
//       path: ['/users/login', '/users/register', '/users/captcha'] //数组中的路径不需要通过jwt验证
//     }))

app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/pages", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

mongoose.connect(
  "mongodb://localhost:27017/koa-demo",
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("数据库连接成功");
    }
  }
);

module.exports = app;
