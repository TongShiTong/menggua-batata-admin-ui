<template>
  <div class="app-container">

    <!-- 搜索控件（操作工具）-->
    <div class="filter-container">
      <el-input v-model="queryInfo.nom" placeholder="姓名/手机号" style="width: 200px;" class="filter-item" clearable @change="getPhone"/>
      <el-select v-model="queryInfo.accountStatus" placeholder="筛选条件" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in wxUserStateDate" :key="item.value" :label="item.label" :value="item.value"  />
      </el-select>
      <el-select v-model="queryInfo.applicationType" placeholder="条件类目" clearable class="filter-item" style="width: 120px">
        <el-option v-for="item in applyType" :key="item.value" :label="item.label" :value="item.value"  />
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getUserList">
        搜索
      </el-button>
      <span style="margin-left: 40px;margin-right: 10px;color: #333;">报名入口</span>
      <el-switch
        v-model="upswitch" @change="signupSwitch">
       </el-switch>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleCread">
        新增
      </el-button> -->

      <!-- 文件上传-->
      <div style="float: right;">
        <!-- <el-upload
          :action="uploadUrl"
          :headers="headerObj">
          <el-button  type="primary" icon="el-icon-upload2">导出报表</el-button>
        </el-upload> -->
        <el-button  type="primary" icon="el-icon-upload2" @click="getExport" :disabled="!userList.length>0">导出报表</el-button>

      </div>
    </div>

    <!-- 数据显示表格区域-->
    <el-table :data="userList" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="姓名" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span >{{row.nom}}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="微信号" min-width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{row.wxCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{row.telephone}}</span>
        </template>
      </el-table-column>

      <el-table-column label="其他信息" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.otherInformation}}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="申请类别" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.applicationType">有资源</span>
          <span v-else>普通</span>
        </template>
      </el-table-column>

      <el-table-column label="账户状态" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.accountStatus === 1">待审核</span>
          <span v-else-if="row.accountStatus === 2">已拒绝</span>
          <span v-else-if="row.accountStatus === 0">已通过</span>
        </template>
      </el-table-column>

      <el-table-column label="用户类别" class-name="status-col" min-width="100">
        <template slot-scope="{row}">
          <el-tag v-if="row.customerType === 1">
            备选合伙人
          </el-tag>
          <el-tag v-if="row.customerType === 2">
            合伙人
          </el-tag>
          <el-tag v-if="row.customerType === 3">
            区域合伙人
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" min-width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applicationTime }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="最后操作用户/时间" min-width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{row.lastUpdateDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="209px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" @click="showEditDialog(row.id)">
            通过
          </el-button>
          <el-button size="small" type="danger" @click="removeUserById(row.id)">
            不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分按钮页区-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
       :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加用户对话弹框 fit-->
    <el-dialog title="添加大团长用户" :visible.sync="addUserlogVisible">
      <el-form ref="addwxUserRef" :rules="addwxUserRules" :model="addwxUser" status-icon label-position="left"
        label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="addwxUser.userName" />
        </el-form-item>
        
        <el-form-item label="微信号" prop="weiXinAccount">
          <el-input v-model="addwxUser.weiXinAccount" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addwxUser.phone" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="addwxUser.state" class="filter-item" placeholder="选择用户状态" >
            <el-option v-for="item in wxUserStateDate" :key="item.value" :label="item.label" :value="item.value"  />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类别"  v-if="addwxUser.state == 3"  prop="userType">
          <el-select v-model="addwxUser.userType" class="filter-item" placeholder="设置用户类别">
            <el-option v-for="item in wxUserTypeDate" :key="item.value" :label="item.label" :value="item.value"  />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserlogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addWeiXinUser">
          提交
        </el-button>
      </div>
    </el-dialog>

    <!-- 用户详情对话弹框 -->
    <el-dialog title="审核通过角色选择" :visible.sync="detailFormVisible" width="30%">
        <el-form ref="wxUserRef" :model="wxUser" :rules="addxaingqingRules" status-icon label-position="left"
          label-width="81px">
       
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="wxUser.nom" disabled/>
          </el-form-item>
          <el-form-item label="手机号" prop="nickName">
            <el-input v-model="wxUser.telephone" disabled/>
          </el-form-item>
          <el-form-item label="微信号" prop="nickName">
            <el-input v-model="wxUser.wxCode" disabled/>
          </el-form-item>

          <el-form-item label="其他信息" prop="nickName">
            <el-input type="textarea" v-model="wxUser.otherInformation" disabled/>
          </el-form-item>
          
          
          <el-form-item label="用户类别" prop="userType">
            <el-select v-model="wxUser.customerType" class="filter-item" placeholder="设置用户类别">
              <el-option v-for="item in wxUserTypeDate" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="editwxUser">
            确认
          </el-button>
        </div>
    </el-dialog>



    <!-- 用户审核对话弹框 -->
    <el-dialog title="用户审核" :visible.sync="checkFormVisible" width="450px">
        <el-form ref="wxUserRef" :model="wxUser" status-icon label-position="left" label-width="81px" style="width: 300px; margin-left:50px;">
         
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="wxUser.nom" disabled />
          </el-form-item>
         
          <el-form-item label="手机号" prop="weiXinAccount">
            <el-input v-model="wxUser.telephone" disabled/>
          </el-form-item>
          <el-form-item label="微信号" prop="phone">
            <el-input v-model="wxUser.wxCode" disabled/>
          </el-form-item>

          <!-- <el-form-item label="性别" prop="gender">
            <el-row v-model="wxUser.gender">
                <el-button type="primary" circle v-if="wxUser.gender == 0"> 女 </el-button>
                <el-button type="primary" circle v-if="wxUser.gender == 1"> 男 </el-button>
            </el-row>
          </el-form-item> -->
          <el-form-item label="地区" prop="adder">
            <span>{{wxUser.country}}</span>
            <span>{{wxUser.province}}</span>
            <span>{{wxUser.city}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-select v-model="wxUser.state" class="filter-item" placeholder="不通过状态" @change="updateState(wxUser.userIdentity)">
            <el-option v-for="item in CheckDate" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button type="primary" @click="statewxUser(wxUser.userIdentity)">
           通过
          </el-button>
        </div>
    </el-dialog>



  </div>
</template>

<script>
  import {isvalidPhone} from '../utils/validate.js'
  export default {
    //当前组件的私有数据value
    data() {
      /* 电话号码的校验规则 */
      var checkPhone = (rule,value,cb) => {
        const regPhone = /^1[3|4|5|7|8][0-9]{9}$/
        if(regPhone.test(value)){
          return cb()
        }
        cb(new Error('请输入合法的手机号！'))
      }
      /* 用户姓名验证*/
      var checkName = (rule,value,cb) => {
        const regName = /^[A-Za-z\.\u4e00-\u9fa5]+$/
        if(regName.test(value)){
          return cb()
        }
        cb(new Error('用户姓名输入不规范！'))
      }
      /* 微信号验证*/
      var checkWeiXin = (rule,value,cb) => {
        const regWeiXin = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
        if(regWeiXin.test(value)){
          return cb()
        }
        cb(new Error('微信号不合法！'))
      }
      return {
        wxUserStateDate: [
            {
             value: null,
             label: '全部'
           },
           {
             value: 0,
             label: '已通过'
           },
           {
             value: 1,
             label: '待审核'
           },
           {
             value: 2,
             label: '已拒绝'
           }
        ],
        // 申请类别
        applyType:[
            {
             value: null,
             label: '全部'
           },
            {
             value: 0,
             label: '普通'
           },
           {
             value: 1,
             label: '有资源'
           },
        ],
        wxUserTypeDate: [
           {
             value: 1,
             label: '备选合伙人'
           },
           {
             value: 2,
             label: '合伙人'
           },
           {
             value: 3,
             label: '区域合伙人'
           }
        ],
        CheckDate: [
          {
               value: 1,
               label: '不通过'
             },
          {
             value: 4,
             label: '本期不可申请'
           },
           {
             value: 5,
             label: ' 永远不可申请'
           }],
        checkFormVisible: false,
        downloadLoading: false,
        addUserlogVisible: false,
        detailFormVisible: false,
        //获取用户列表的参数对象wxUserRules
        upswitch: false,
        queryInfo: {
          nom: null,
          accountStatus: null,
          applicationType: null,
          pageNum: 0
        },
        userList: [],
        wxUser:{
          
        },
        total: 0,
        //添加大团长用户的表单数据
        addwxUser: {
          id: '',
          weiXinAccount: '',
          phone: '',
          state: '',
          userType: '',
          userName: '',
          userIdentity: '',
          createDate: '',
          nickName: '',
          avatarUrl: '',
          gender: '',
          country: '',
          province: '',
          city: ''
        },

        uploadUrl: 'http://localhost:9091/weiXinUser/importUser',
        headerObj: {
          Authorization:'Bearer ' + window.sessionStorage.getItem('token')
        },
        //添加表单验证的规则对象
        addwxUserRules: {
          userName: [{
            required: true,
            message: '请输入用户名！',
            trigger: 'blur'
          }, {
            validator: checkName,
            trigger: 'blur'
          },{
            min: 2, max: 15, message: '用户名长度在2到15个字符', trigger: 'blur'
          }],
          weiXinAccount: [{
            required: true,
            message: '请输入微信账号！',
            trigger: 'blur'
          } ,{
            validator: checkWeiXin,
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '手机号不能为空！',
            trigger: 'blur'
          }, {
            validator: checkPhone,
            trigger: 'blur'
          }],
          state: [{
            required: true,
            message: '请选择用户状态！',
            trigger: 'blur'
          }],
          userType: [{
            required: true,
            message: '选择用户类型！',
            trigger: 'blur'
          }]
        },
        addxaingqingRules:{
          userName: [{
            required: true,
            message: '请输入用户名！',
            trigger: 'blur'
          }, {
            validator: checkName,
            trigger: 'blur'
          },{
            min: 2, max: 15, message: '用户名长度在2到15个字符', trigger: 'blur'
          }],
          weiXinAccount: [{
            required: true,
            message: '请输入微信账号！',
            trigger: 'blur'
          } ,{
            validator: checkWeiXin,
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '手机号不能为空！',
            trigger: 'blur'
          }, {
            validator: checkPhone,
            trigger: 'blur'
          }],
          state: [{
            required: true,
            message: '请选择用户状态！',
            trigger: 'blur'
          }],
          userType: [{
            required: true,
            message: '选择用户类型！',
            trigger: 'blur'
          }]
        },
      }
    },

    //Vue生命周期函数
    created() {
      this.getUserList()
      this.switchStatus()
    },

    //事件处理函数
    methods: {
        // 导出报表
       getExport() {
            // window.location.href = "http://192.168.5.7:9091/inscription/export"
            this.$confirm('确定导报名数据吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              for(let i=0; i<this.userList.length; i++) {
                if(this.userList[i].applicationType===0){
                  this.userList[i].applicationType1 = "普通"
                }else if(this.userList[i].applicationType===1) {
                  this.userList[i].applicationType1 = "有资源"
                }
                if(this.userList[i].accountStatus===0) {
                  this.userList[i].accountStatus1="已通过"
                }else if(this.userList[i].accountStatus===1) {
                  this.userList[i].accountStatus1="待审核"
                }else if(this.userList[i].accountStatus===2) {
                  this.userList[i].accountStatus1="已拒绝"
                }
                if(this.userList[i].customerType===1) {
                  this.userList[i].customerType1="备选合伙人"
                }else if(this.userList[i].customerType===2) {
                  this.userList[i].customerType1="合伙人"
                }else if(this.userList[i].customerType===3) {
                  this.userList[i].customerType1="区域合伙人"
                }
              }
              this.excelData = this.userList //你要导出的数据list。
              this.export2Excel()
            }).catch(() => {

            });
        },
        // 导出表格
      export2Excel() {
        require.ensure([], () => {
          let {
            exportJsonToExcel
          } = require('../utils/vendor/Export2Excel');
          // 表头
          let tHeader = ['姓名', '微信号', '手机号', '其他信息', '申请类别', '账户状态', '用户类别', '申请时间', '最后操作用户/时间'];
          //表头对应字段名，要和下面数据key对应
          let filterVal = ['nom', 'wxCode', 'telephone', 'otherInformation', 'applicationType1', 'accountStatus1', 'customerType1',
            'applicationTime', 'lastUpdateDate'
          ];
          // 数据来源
          let list = this.excelData;

          let data = this.formatJson(filterVal, list); //数据格式化
          var index1 = '报名数据'; //导出时文件名
          exportJsonToExcel(tHeader, data, index1); //导出文件
        })
      },
      // 数据格式化
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
        // 获取开关状态
        async switchStatus() {
            const { data: res} = await this.$http.get('/inscription/obtainEntrance', {})
            if(res.code=="801") {
                if(res.result==0) {
                    this.upswitch = false
                }else if(res.result==1) (
                    this.upswitch =true
                )
            }

        },
        // 入口开关
        async signupSwitch(e) {

            const confirmResult = await this.$confirm('此操作将改变报名入口状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                this.upswitch = !this.upswitch
                return this.$message.info('已取消修改！')
            }
            let state
            if(e) {
                state = 1
            }else {
                state = 0
            }
            const { data: res} = await this.$http.get('/inscription/entrance', {params: {state}})
            if(res.code=="801") {
                this.$message.success('修改成功！')
            }else {
              this.upswitch = !this.upswitch
              this.$message.error('报名入口修改失败！')
            }
        },
        getPhone(e) {
          if(!e) {
            this.queryInfo.nom = null
          }
        },
      /* 查询大团长用户信息*/
      async getUserList() {
        const { data: res} = await this.$http.get('/inscription/getInscriptionListByCondition', {params: this.queryInfo})

        if (res.code == "802") {
          return this.$message.warning('没有匹配的用户信息！')
        }
        if (res.code !== "801") {
          return this.$message.error('获取大团长用户信息失败！')
        }
        this.userList = res.result.list
        this.total = res.result.total
      },
      handleCread(){
       this.addUserlogVisible = true
       this.$nextTick(()=>{
         this.$refs.addwxUserRef.resetFields();
       })
      },

      //监听Pagesize改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.pageSize = newSize
        this.getUserList()
      },
      //监听当前页面的改变
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage
        this.getUserList()
      },
      addWeiXinUser() {
        this.$refs.addwxUserRef.validate(async valid => {
          if (!valid) return
          const {
            data: res
          } = await this.$http.post('/weiXinUser/addUser', this.addwxUser)
     

          if (res.code == "801") {
            this.$message.success('添加用户成功！')
          }
          if (res.code == "802") {
            this.$message.error('添加用户失败！')
          }
          if (res.code == "803") {
            this.$message.warning('微信号/手机号已存在，不能重复添加！')
          }

          this.getUserList()
          this.addUserlogVisible = false
        })
      },
      //根据ID删除用户幸喜
      async removeUserById(id) {
        const confirmResult = await this.$confirm('此操作将改变账户状态为不通过, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消修改！')
        }
        const {
          data: res
        } = await this.$http.get('/inscription/auditInscription', {
          params: {
            id,
            accountStatus: 2
          }
        })

        if (res.code == "801") {
         
          for(let j=0;j<this.userList.length;j++) {
                if(this.userList[j].id==res.result.id) {
                    
                    this.$set(this.userList,j,res.result);
                }	
            };
            this.$message.success("账户状态修改成功！")
        }
      },

      //根据身份发查询展示用户信息
      async showEditDialog(id){
        const { data: res} = await this.$http.get('/inscription/auditInscription',{params: {id,accountStatus:0}})
      
        if (res.code !== "801") {
          this.$message.error('查询用户失败！')
        }
        this.wxUser = res.result
        this.detailFormVisible = true
      },

      //根据身份发查询展示用户信息审核
      async showCheckDialog(userIdentity){
        const { data: res} = await this.$http.get('/weiXinUser/getUserByIdentity',{params: {userIdentity}})
        
        if (res.code !== "801") {
          this.$message.error('查询用户失败！')
        }
        this.wxUser = res.result
        this.checkFormVisible = true
      },

      //更改用户信息
      async editwxUser(){
        const { data: res} = await this.$http.post('/inscription/approved',this.wxUser)

        if(res.code =="801") {
            for(let j=0;j<this.userList.length;j++) {
                if(this.userList[j].id==res.result.id) {
                    
                    this.$set(this.userList,j,res.result);
                }	
            };
            this.$message.success(res.message)
        }

        this.detailFormVisible = false
       
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
      async statewxUser(userIdentity){
        this.$refs.wxUserRef.validate(async valid => {
          
           this.wxUser.userIdentity = userIdentity
           this.wxUser.state = 3
            
           if (!valid) return
           const { data: res} = await this.$http.post('/weiXinUser/examineUser',this.wxUser)
         
           if (res.code == "801") {
              this.$message.success(this.wxUser.userName +'用户审核通过！')
           }
          if (res.code !== "801") {
             this.$message.error('用户审核未通过！')
          }
           this.checkFormVisible = false
           this.getUserList()
        })
      },
      async updateState(userIdentity){
        this.$refs.wxUserRef.validate(async valid => {
      
           this.wxUser.userIdentity = userIdentity
            
           if (!valid) return
           const { data: res} = await this.$http.post('/weiXinUser/examineUser',this.wxUser)
       
           if (res.code == "801") {
              this.$message.success(this.wxUser.userName+'审核成功！')
           }
          if (res.code !== "801") {
             this.$message.error('用户审核未通过！')
          }
           this.checkFormVisible = false
           this.getUserList()
        })
      }

    }
  }
</script>
