<template>
  <div class="network-box">
    <div class="network-title">
      网站问卷调查
    </div>
    <div class="content-box">
      <el-table :data="websiteData" style="width: 100%">
        <el-table-column prop="title" label="问卷名称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="content" label="问卷描述" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="creationTime"
          label="创建时间"
          sortable
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="deadline" label="截止时间" sortable width="180" align="center">
        </el-table-column>
        <el-table-column prop="topic" label="问卷主题" width="180" align="center">
          <template slot-scope="scope">
            <el-tag type="primary" disable-transitions>{{
              scope.row.topic
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="websiteName"
          label="网站名称"
          width="180"
          filter-placement="bottom-end"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              type="success"
              disable-transitions
              v-if="scope.row.websiteName === '百度'"
              >{{ scope.row.websiteName }}</el-tag
            >
            <el-tag
              type="info"
              disable-transitions
              v-else-if="scope.row.websiteName === '豆瓣'"
              >{{ scope.row.websiteName }}</el-tag
            >
            <el-tag
              type="danger"
              disable-transitions
              v-else-if="scope.row.websiteName === '掘金'"
              >{{ scope.row.websiteName }}</el-tag
            >
            <el-tag
              type="warning"
              disable-transitions
              v-else-if="scope.row.websiteName === 'Github'"
              >{{ scope.row.websiteName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="seeClick(scope)"
              >查看网站详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="复制地址" :visible.sync="dialogFormVisible" @opened="showQRCode">
        <el-form>
          <el-form-item>
            <div class="content-box1">
              <el-input v-model="website"></el-input>
              <el-button
                type="danger"
                data-clipboard-action="copy"
                :data-clipboard-text="website"
                class="cobyDomObj"
                @click="copyLink"
                >复制</el-button
              >
            </div>
          </el-form-item>
          <el-form-item>
            <div class="Tips-box">
              如无法使用上方按钮复制，请选中内容后，使用Ctrl + C
              复制。也可以扫描下方二维码或右键保存二维码进行访问。
            </div>
          </el-form-item>
          <el-form-item>
            <div class="code-box">
              <div id="qrcode" ref="qrCodeDiv" class="code-box1"></div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!--    手搓表格代码-->
    <!--    <div class="title-loop-box">-->
    <!--      <div-->
    <!--        v-for="(item, index) in titleName"-->
    <!--        :key="index"-->
    <!--        class="titleName-loop-box"-->
    <!--      >-->
    <!--        <div>{{item.name}}</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <div v-for="(item1, index1) in websiteData" :key="index1">-->
    <!--        <div class="title-loop1-box">-->
    <!--          <div class="loop-box">{{ item1.title }}</div>-->
    <!--          <div class="loop-box">{{ item1.content }}</div>-->
    <!--          <div class="loop-box">{{ item1.creationTime }}</div>-->
    <!--          <div class="loop-box">{{ item1.deadline }}</div>-->
    <!--          <div class="loop-box">{{ item1.topic }}</div>-->
    <!--          <div class="loop-box">{{ item1.websiteName }}</div>-->
    <!--                  <el-row class="loop-box">-->
    <!--                    <el-button size="small" type="primary">查看网站详情</el-button>-->
    <!--                  </el-row>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "Network",
  components: {},
  props: {},
  data() {
    return {
      websiteData: [],
      dialogFormVisible: false,
      website: ""
      // 手搓表格代码
      // titleName: [
      //   {
      //     name: "问卷名称"
      //   },
      //   {
      //     name: "问卷描述"
      //   },
      //   {
      //     name: "创建时间"
      //   },
      //   {
      //     name: "截止时间"
      //   },
      //   {
      //     name: "问卷主题"
      //   },
      //   {
      //     name: "网站名称"
      //   },
      //   {
      //     name: "操作"
      //   }
      // ]
    };
  },
  methods: {
    //获取问卷调查数据
    getWebsiteData() {
      this.$axios
        .req("api/website")
        .then(res => {
          this.websiteData = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 查看网站详情
    seeClick(scope) {
      this.dialogFormVisible = true;
      if (scope.row.websiteName === "掘金") {
        this.website = "https://juejin.im";
      } else if (scope.row.websiteName === "百度") {
        this.website = "https://www.baidu.com";
      } else if (scope.row.websiteName === "豆瓣") {
        this.website = "https://www.douban.com";
      } else if (scope.row.websiteName === "Github") {
        this.website = "https://github.com/";
      }
    },
    copyLink() {
      let _this = this;
      let clipboardObj = new this.clipboard(".cobyDomObj");
      clipboardObj.on("success", function() {
        _this.$message({
          message: "复制成功",
          type: "success"
        });
      });
      clipboardObj.on("error", function() {
        _this.$message({
          message: "复制失败",
          type: "error"
        });
      });
    },
    showQRCode() {
      document.getElementById("qrcode").innerHTML = "";
      this.qrcode();
    },
    qrcode() {
      let qrcode = new QRCode(this.$refs.qrCodeDiv, {
        width: 200,
        height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
        text: this.website, // 二维码内容
        // render: "canvas", // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: "#ffffff",
        foreground: "#333333"
      });
      console.log(qrcode);
    }
  },
  mounted() {
    this.getWebsiteData(); //获取问卷调查数据
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.network-box {
  width: 94%;
  background-color: white;
  margin-left: 50px;
  padding-top: 30px;
  margin-top: 20px;
}
/*标题名*/
.network-title {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  border-bottom: #edf0f6 solid 1px;
}
/*调查数据的div*/
.content-box {
  width: 96%;
  margin: auto;
}
/*对话框的input框和复制按钮*/
.content-box1 {
  display: flex;
  justify-content: space-between;
}
.code-box {
  display: flex;
  justify-content: center;
}
/*对话框文字提示*/
.Tips-box {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #eef6ff;
}
/*二维码div*/
.code-box1 {
  margin-top: 20px;
}
/*对话框的input框*/
.el-input {
  width: 88%;
}
/*手搓的表格代码*/
/*调查的标题*/
/*.title-loop-box {*/
/*  width: 95%;*/
/*  margin: auto;*/
/*  padding-top: 40px;*/
/*  display: flex;*/
/*  justify-content: space-evenly;*/
/*  text-align: center;*/
/*}*/
/*标题循环的div*/
/*.titleName-loop-box {*/
/*  width: 100%;*/
/*}*/
/*循环出的每一条信息*/
/*.title-loop1-box {*/
/*  width: 95%;*/
/*  height: 60px;*/
/*  margin: auto;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  border-bottom: #f2f2f2 solid 1px;*/
/*}*/
/*.loop-box {*/
/*  width: 15%;*/
/*  text-align: center;*/
/*}*/
</style>
