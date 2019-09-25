const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  //用户名
  username: {
    type: String,
    required: true //是否是必填项
  },
  //密码
  password: {
    type: String,
    required: true
  },
  //电话
  phone: {
    type: Number,
    required: true
  },
  //邮箱
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  //头像
  imageUrl: {
    type: String,
    default: null
  }
});

module.exports = User = mongoose.model("User", UserSchema);
