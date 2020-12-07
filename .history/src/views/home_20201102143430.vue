<template>
  <div class="app-container">
    <div class="home-box">
      <div class="title-item">首页banner(718*200)</div>

      <div v-for="(item, index) in bannerList" :key="index" class="item-banner">
        <div class="img-box">
          <div class="img-upload">
            <el-upload
              :data="{ index: index }"
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/material/index/upload'"
              class="avatar-uploader"
            >
              <!-- <el-button type="info" size="mini" plain>设置背景图</el-button> -->
              <div
                v-if="item.bg_img"
                :style="{ backgroundImage: 'url(' + item.bg_img + ')' }"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
          <div class="btns-box">
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-up"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-down"
            ></div>
            <div style="line-height: 20px" class="btn-item el-icon-close"></div>
          </div>
        </div>
        <div>
          <el-input
            class="input"
            v-model="item.link"
            placeholder="请输入链接"
          ></el-input>
        </div>
      </div>
      <div class="add-btn">
          <el-button type="primary" size="small" round>添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { isvalidPhone } from "../utils/validate.js";
export default {
  //当前组件的私有数据value
  data() {
    /* 电话号码的校验规则 */
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号！"));
    };
    /* 用户姓名验证*/
    var checkName = (rule, value, cb) => {
      const regName = /^[A-Za-z\.\u4e00-\u9fa5]+$/;
      if (regName.test(value)) {
        return cb();
      }
      cb(new Error("用户姓名输入不规范！"));
    };
    /* 微信号验证*/
    var checkWeiXin = (rule, value, cb) => {
      const regWeiXin = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
      if (regWeiXin.test(value)) {
        return cb();
      }
      cb(new Error("微信号不合法！"));
    };
    return {
      base_api: "http://192.168.5.7:9091",
      bannerList: [
        {
          bg_img: "",
          link: "",
        },
        {
          bg_img: "",
          link: "",
        },
      ],

      wxUserStateDate: [
        {
          value: null,
          label: "全部",
        },
        {
          value: 0,
          label: "已通过",
        },
        {
          value: 1,
          label: "待审核",
        },
        {
          value: 2,
          label: "已拒绝",
        },
      ],
      // 申请类别
      applyType: [
        {
          value: null,
          label: "全部",
        },
        {
          value: 0,
          label: "普通",
        },
        {
          value: 1,
          label: "有资源",
        },
      ],
      wxUserTypeDate: [
        {
          value: 1,
          label: "备选合伙人",
        },
        {
          value: 2,
          label: "合伙人",
        },
        {
          value: 3,
          label: "区域合伙人",
        },
      ],
      CheckDate: [
        {
          value: 1,
          label: "不通过",
        },
        {
          value: 4,
          label: "本期不可申请",
        },
        {
          value: 5,
          label: " 永远不可申请",
        },
      ],
      checkFormVisible: false,
      downloadLoading: false,
      addUserlogVisible: false,
      detailFormVisible: false,
      //获取用户列表的参数对象wxUserRules
      upswitch: false,
      queryInfo: {
        num: "",
        accountStatus: "",
        applicationType: "",
        page: 0,
      },
      userList: [],
      wxUser: {},
      total: 0,
      //添加大团长用户的表单数据
      addwxUser: {
        id: "",
        weiXinAccount: "",
        phone: "",
        state: "",
        userType: "",
        userName: "",
        userIdentity: "",
        createDate: "",
        nickName: "",
        avatarUrl: "",
        gender: "",
        country: "",
        province: "",
        city: "",
      },

      uploadUrl: "http://localhost:9091/weiXinUser/importUser",
      headerObj: {
        Authorization: "Bearer " + window.sessionStorage.getItem("token"),
      },
      //添加表单验证的规则对象
      addwxUserRules: {
        userName: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "blur",
          },
          {
            validator: checkName,
            trigger: "blur",
          },
          {
            min: 2,
            max: 15,
            message: "用户名长度在2到15个字符",
            trigger: "blur",
          },
        ],
        weiXinAccount: [
          {
            required: true,
            message: "请输入微信账号！",
            trigger: "blur",
          },
          {
            validator: checkWeiXin,
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空！",
            trigger: "blur",
          },
          {
            validator: checkPhone,
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择用户状态！",
            trigger: "blur",
          },
        ],
        userType: [
          {
            required: true,
            message: "选择用户类型！",
            trigger: "blur",
          },
        ],
      },
      addxaingqingRules: {
        userName: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "blur",
          },
          {
            validator: checkName,
            trigger: "blur",
          },
          {
            min: 2,
            max: 15,
            message: "用户名长度在2到15个字符",
            trigger: "blur",
          },
        ],
        weiXinAccount: [
          {
            required: true,
            message: "请输入微信账号！",
            trigger: "blur",
          },
          {
            validator: checkWeiXin,
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空！",
            trigger: "blur",
          },
          {
            validator: checkPhone,
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择用户状态！",
            trigger: "blur",
          },
        ],
        userType: [
          {
            required: true,
            message: "选择用户类型！",
            trigger: "blur",
          },
        ],
      },
    };
  },

  //Vue生命周期函数
  created() {
    this.getUserList();
    this.switchStatus();
  },

  //事件处理函数
  methods: {
    // 背景图上传
    handleAvatarSuccessBg(res, file) {
      console.log(111, res);
      console.log(222, file);
      const self = this;
      self.content.bg_img = res.data.url;
    },
    beforeAvatarUpload(file) {
      console.log(333, file);

      const isLt3M = file.size / 1024 / 1024 < 3;
      const isWEBP = file.type === "image/webp";
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
      }
      if (isWEBP) {
        this.$message.error("上传图片不能是webp格式!");
      }
      return isLt3M && !isWEBP;
    },
    // 导出报表
    getExport() {
      // window.location.href = "http://192.168.5.7:9091/inscription/export"
      this.$confirm("确定导报名数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].applicationType === 0) {
              this.userList[i].applicationType1 = "普通";
            } else if (this.userList[i].applicationType === 1) {
              this.userList[i].applicationType1 = "有资源";
            }
            if (this.userList[i].accountStatus === 0) {
              this.userList[i].accountStatus1 = "已通过";
            } else if (this.userList[i].accountStatus === 1) {
              this.userList[i].accountStatus1 = "待审核";
            } else if (this.userList[i].accountStatus === 2) {
              this.userList[i].accountStatus1 = "已拒绝";
            }
            if (this.userList[i].customerType === 1) {
              this.userList[i].customerType1 = "备选合伙人";
            } else if (this.userList[i].customerType === 2) {
              this.userList[i].customerType1 = "合伙人";
            } else if (this.userList[i].customerType === 3) {
              this.userList[i].customerType1 = "区域合伙人";
            }
          }
          this.excelData = this.userList; //你要导出的数据list。
          this.export2Excel();
        })
        .catch(() => {});
    },
    // 导出表格
    export2Excel() {
      require.ensure([], () => {
        let { exportJsonToExcel } = require("../utils/vendor/Export2Excel");
        // 表头
        let tHeader = [
          "姓名",
          "微信号",
          "手机号",
          "其他信息",
          "申请类别",
          "账户状态",
          "用户类别",
          "申请时间",
          "最后操作用户/时间",
        ];
        //表头对应字段名，要和下面数据key对应
        let filterVal = [
          "nom",
          "wxCode",
          "telephone",
          "otherInformation",
          "applicationType1",
          "accountStatus1",
          "customerType1",
          "applicationTime",
          "lastUpdateDate",
        ];
        // 数据来源
        let list = this.excelData;

        let data = this.formatJson(filterVal, list); //数据格式化
        var index1 = "报名数据"; //导出时文件名
        exportJsonToExcel(tHeader, data, index1); //导出文件
      });
    },
    // 数据格式化
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 获取开关状态
    async switchStatus() {
      const { data: res } = await this.$http.get(
        "/inscription/obtainEntrance",
        {}
      );
      if (res.code == "801") {
        if (res.result == 0) {
          this.upswitch = false;
        } else if (res.result == 1) this.upswitch = true;
      }
    },
    // 入口开关
    async signupSwitch(e) {
      const confirmResult = await this.$confirm(
        "此操作将改变报名入口状态, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        this.upswitch = !this.upswitch;
        return this.$message.info("已取消修改！");
      }
      let state;
      if (e) {
        state = 1;
      } else {
        state = 0;
      }
      const { data: res } = await this.$http.get("/inscription/entrance", {
        params: { state },
      });
      if (res.code == "801") {
        this.$message.success("修改成功！");
      }
    },
    /* 查询大团长用户信息*/
    async getUserList() {
      const {
        data: res,
      } = await this.$http.get("/inscription/getInscriptionListByCondition", {
        params: this.queryInfo,
      });

      if (res.code == "802") {
        return this.$message.warning("没有匹配的用户信息！");
      }
      if (res.code !== "801") {
        return this.$message.error("获取大团长用户信息失败！");
      }
      this.userList = res.result.list;
      this.total = res.result.total;
    },
    handleCread() {
      this.addUserlogVisible = true;
      this.$nextTick(() => {
        this.$refs.addwxUserRef.resetFields();
      });
    },

    //监听Pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    //监听当前页面的改变
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getUserList();
    },
    addWeiXinUser() {
      this.$refs.addwxUserRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/weiXinUser/addUser",
          this.addwxUser
        );

        if (res.code == "801") {
          this.$message.success("添加用户成功！");
        }
        if (res.code == "802") {
          this.$message.error("添加用户失败！");
        }
        if (res.code == "803") {
          this.$message.warning("微信号/手机号已存在，不能重复添加！");
        }

        this.getUserList();
        this.addUserlogVisible = false;
      });
    },
    //根据ID删除用户幸喜
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将改变账户状态为不通过, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消修改！");
      }
      const { data: res } = await this.$http.get(
        "/inscription/auditInscription",
        {
          params: {
            id,
            accountStatus: 2,
          },
        }
      );

      if (res.code == "801") {
        for (let j = 0; j < this.userList.length; j++) {
          if (this.userList[j].id == res.result.id) {
            this.$set(this.userList, j, res.result);
          }
        }
        this.$message.success("账户状态修改成功！");
      }
    },

    //根据身份发查询展示用户信息
    async showEditDialog(id) {
      const {
        data: res,
      } = await this.$http.get("/inscription/auditInscription", {
        params: { id, accountStatus: 0 },
      });

      if (res.code !== "801") {
        this.$message.error("查询用户失败！");
      }
      this.wxUser = res.result;
      this.detailFormVisible = true;
    },

    //根据身份发查询展示用户信息审核
    async showCheckDialog(userIdentity) {
      const {
        data: res,
      } = await this.$http.get("/weiXinUser/getUserByIdentity", {
        params: { userIdentity },
      });

      if (res.code !== "801") {
        this.$message.error("查询用户失败！");
      }
      this.wxUser = res.result;
      this.checkFormVisible = true;
    },

    //更改用户信息
    async editwxUser() {
      const { data: res } = await this.$http.post(
        "/inscription/approved",
        this.wxUser
      );

      if (res.code == "801") {
        for (let j = 0; j < this.userList.length; j++) {
          if (this.userList[j].id == res.result.id) {
            this.$set(this.userList, j, res.result);
          }
        }
        this.$message.success(res.message);
      }

      this.detailFormVisible = false;

      // this.$refs.wxUserRef.validate(async valid => {
      //    console.log(valid)
      //    if (!valid) return
      //    const { data: res} = await this.$http.post('/weiXinUser/updateUser',this.wxUser)
      //    console.log(this.wxUser)
      //    console.log(res)
      //    if (res.code == "801") {
      //       this.$message.success('用户信息更新成功！')
      //    }
      //   if (res.code !== "801") {
      //      this.$message.error('用户信息更新失败！')
      //   }
      //    this.detailFormVisible = false
      //    this.getUserList()
      // })
    },

    //更改用户信息
    async statewxUser(userIdentity) {
      this.$refs.wxUserRef.validate(async (valid) => {
        this.wxUser.userIdentity = userIdentity;
        this.wxUser.state = 3;

        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/weiXinUser/examineUser",
          this.wxUser
        );

        if (res.code == "801") {
          this.$message.success(this.wxUser.userName + "用户审核通过！");
        }
        if (res.code !== "801") {
          this.$message.error("用户审核未通过！");
        }
        this.checkFormVisible = false;
        this.getUserList();
      });
    },
    async updateState(userIdentity) {
      this.$refs.wxUserRef.validate(async (valid) => {
        this.wxUser.userIdentity = userIdentity;

        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/weiXinUser/examineUser",
          this.wxUser
        );

        if (res.code == "801") {
          this.$message.success(this.wxUser.userName + "审核成功！");
        }
        if (res.code !== "801") {
          this.$message.error("用户审核未通过！");
        }
        this.checkFormVisible = false;
        this.getUserList();
      });
    },
  },
};
</script>
<style scoped>
.home-box {
  width: 375px;
  min-height: 80vh;
  background: #eee;
  padding: 20px;
  border-radius: 8px;
}
.title-item {
  margin-bottom: 20px;
}
.item-banner {
  margin-bottom: 20px;
}
.img-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.img-upload {
  width: 86%;
  flex-shrink: 0;
}
/deep/ .avatar-uploader .el-upload {
  width: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 120px;
  display: block;
}
.btns-box {
  display: flex;
  flex-direction: column;
}
.btn-item {
  width: 24px;
  height: 24px;
  border: 1px solid #999999;
  border-radius: 50%;
  text-align: center;
  margin-bottom: 10px;
}
.btn-item:last-child {
  margin: 0;
}
/deep/ .input input {
  background: none;
}
.add-btn {
    text-align: center;
}
.el-button--small.is-round {
    padding: 9px 30px;
}
</style>
