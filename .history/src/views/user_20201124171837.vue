<template>
  <div class="app-container">

    <!-- 搜索控件（操作工具）-->
    <div class="filter-container">
      <el-input v-model="queryInfo.condition" placeholder="搜索工号/姓名/手机号" style="width: 200px;" class="filter-item" clearable/>
      <el-select v-model="queryInfo.state" placeholder="筛选条件" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in wxUserStateDate" :key="item.value" :label="item.label" :value="item.value"  />
      </el-select>
      <el-select v-model="queryInfo.userType" placeholder="条件类目" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in wxUserTypeDate" :key="item.value" :label="item.label" :value="item.value"  />
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getUserList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleCread">
        新增
      </el-button>

      <!-- 文件上传-->
      <div style="float: right;">
        <el-upload
          :action="uploadUrl"
          :headers="headerObj">
          <el-button  type="primary" icon="el-icon-upload2">导入用户</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 数据显示表格区域-->
    <el-table :data="userList" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="工号" prop="id" sortable="custom" align="center" min-width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" min-width="150px" align="center">
        <template slot-scope="{row}">
          <!-- <span>{{row.avatarUrl}}</span> -->
          <img :src="row.avatarUrl" style="width: 60px; height: 60px;object-fit: cover;">
        </template>
      </el-table-column>
      
      <el-table-column label="姓名" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span >{{row.userName}}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="微信号" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.weiXinAccount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类别" class-name="status-col" min-width="100">
        <template slot-scope="{row}">
  
          <el-tag v-if="row.userType == 1">
            备选合伙人
          </el-tag>
          <el-tag v-if="row.userType == 2">
            合伙人
          </el-tag>
          <el-tag v-if="row.userType == 3">
            区域合伙人
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" class-name="status-col" min-width="100">
        <template slot-scope="{row}">
          <el-tag v-if="row.state == 0">
            未激活
          </el-tag>
          <el-tag v-if="row.state == 1">
            待审核
          </el-tag>
          <el-tag v-if="row.state == 2">
            未通过
          </el-tag>
          <el-tag v-if="row.state == 3">
            正式用户
          </el-tag>
          <el-tag v-if="row.state == 4">
            本期不可申请
          </el-tag>
          <el-tag v-if="row.state == 5">
            永远不可申请
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="身份码" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{row.userIdentity}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后操作用户/时间" min-width="135px" align="center">
        <template slot-scope="{row}">
          <span>{{row.updateAdmin}}</span><br>
          <span>{{row.updateDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="209px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" @click="showEditDialog(row.userIdentity)">
            详情
          </el-button>
          <el-button size="small" type="danger" @click="removeUserById(row.userIdentity)">
            删除
          </el-button>
          <el-button v-if="row.state == 1" size="small" type="success" @click="showCheckDialog(row.userIdentity)">
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分按钮页区-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.page"
        :page-sizes="[10, 15, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
    <el-dialog title="用户详情" :visible.sync="detailFormVisible" width="560px">
        <el-form ref="wxUserRef" :model="wxUser" :rules="addxaingqingRules" status-icon label-position="left"
          label-width="81px" style="width: 400px; margin-left:50px;">
         <el-form-item label="工号" prop="userId">
           <el-input v-model="wxUser.id" disabled/>
         </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="wxUser.userName" />
          </el-form-item>
          <el-form-item label="身份码" prop="nickName">
            <el-input v-model="wxUser.userIdentity" disabled/>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="wxUser.nickName" disabled/>
          </el-form-item>
          <el-form-item label="头像" prop="userName">
            <span class="demonstration"></span>
            <img :src="wxUser.avatarUrl" style="width: 60px; height: 60px;object-fit: cover;">
          </el-form-item>
          
          <el-form-item label="微信号" prop="weiXinAccount">
            <el-input v-model="wxUser.weiXinAccount" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="wxUser.phone" />
          </el-form-item>
          <el-form-item label="用户状态" prop="state">
            <el-select v-model="wxUser.state" class="filter-item" placeholder="选择用户状态">
              <el-option v-for="item in wxUserStateDate" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户类别" prop="userType">
            <el-select v-model="wxUser.userType" class="filter-item" placeholder="设置用户类别">
              <el-option v-for="item in wxUserTypeDate" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-row v-model="wxUser.gender">
                <el-button type="primary" circle v-if="wxUser.gender == 0"> 女 </el-button>
                <el-button type="primary" circle v-if="wxUser.gender == 1"> 男 </el-button>
            </el-row>
          </el-form-item>
          <el-form-item label="地区" prop="adder">
            <span>{{wxUser.country}}</span>
            <span>{{wxUser.province}}</span>
            <span>{{wxUser.city}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="editwxUser">
            保存更改
          </el-button>
        </div>
    </el-dialog>



    <!-- 用户审核对话弹框 -->
    <el-dialog title="用户审核" :visible.sync="checkFormVisible" width="450px">
        <el-form ref="wxUserRef" :model="wxUser" status-icon label-position="left" label-width="81px" style="width: 300px; margin-left:50px;">
         <el-form-item label="工号" prop="userId">
           <el-input v-model="wxUser.id" disabled/>
         </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="wxUser.userName" disabled />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="wxUser.nickName" disabled/>
          </el-form-item>
          <el-form-item label="头像" prop="userName">
            <span class="demonstration"></span>
            <img :src="wxUser.avatarUrl" style="width: 60px; height: 60px;object-fit: cover;">
          </el-form-item>
         
          <el-form-item label="微信号" prop="weiXinAccount">
            <el-input v-model="wxUser.weiXinAccount" disabled/>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="wxUser.phone" disabled/>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-row v-model="wxUser.gender">
                <el-button type="primary" circle v-if="wxUser.gender == 0"> 女 </el-button>
                <el-button type="primary" circle v-if="wxUser.gender == 1"> 男 </el-button>
            </el-row>
          </el-form-item>
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
             value: 0,
             label: '未激活'
           },
           {
             value: 1,
             label: '待审核'
           },
           {
             value: 2,
             label: '未通过'
           },
           {
             value: 3,
             label: '正式用户'
           }
        ],
        wxUserTypeDate: [
          //  {
          //    value: 0,
          //    label: '海选团长'
          //  },
           {
             value: 1,
             label: '见习团长'
           },
           {
             value: 2,
             label: '正式团长'
           },
           {
             value: 3,
             label: '学生团长'
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
        queryInfo: {
          condition: '',
          state: '',
          userType: '',
          page: 0
        },
        userList: [],
        wxUser:{
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
    },

    //事件处理函数
    methods: {
      /* 查询大团长用户信息*/
      async getUserList() {
        const { data: res} = await this.$http.get('/weiXinUser/searchUser', {params: this.queryInfo})
        if (res.code == "802") {
          return this.$message.warning('没有匹配的用户信息！')
        }
        if (res.code !== "801") {
          return this.$message.error('获取大团长用户信息失败！')
        }
        this.userList = res.result.records
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
        this.queryInfo.page = newPage
        this.getUserList()
      },
      addWeiXinUser() {
        this.$refs.addwxUserRef.validate(async valid => {
          if (!valid) return
          const {
            data: res
          } = await this.$http.post('/weiXinUser/addUser', this.addwxUser)
          console.log(this.addwxUser)

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
      async removeUserById(userIdentity) {
        console.log(userIdentity)
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除！')
        }
        const {
          data: res
        } = await this.$http.get('/weiXinUser/deleteUser', {
          params: {
            userIdentity
          }
        })
        if (res.code !== "0") {
          this.$message.error('删除用户失败！')
        }
        this.$message.success('删除用户成功！')
        this.getUserList()
      },

      //根据身份发查询展示用户信息
      async showEditDialog(userIdentity){
        const { data: res} = await this.$http.get('/weiXinUser/getUserByIdentity',{params: {userIdentity}})
        console.log(res)
        if (res.code !== "801") {
          this.$message.error('查询用户失败！')
        }
        this.wxUser = res.result
        this.detailFormVisible = true
      },

      //根据身份发查询展示用户信息审核
      async showCheckDialog(userIdentity){
        const { data: res} = await this.$http.get('/weiXinUser/getUserByIdentity',{params: {userIdentity}})
        console.log(res)
        if (res.code !== "801") {
          this.$message.error('查询用户失败！')
        }
        this.wxUser = res.result
        this.checkFormVisible = true
      },

      //更改用户信息
      async editwxUser(){
        this.$refs.wxUserRef.validate(async valid => {
           console.log(valid)
           if (!valid) return
           const { data: res} = await this.$http.post('/weiXinUser/updateUser',this.wxUser)
           console.log(this.wxUser)
           console.log(res)
           if (res.code == "801") {
              this.$message.success('用户信息更新成功！')
           }
          if (res.code !== "801") {
             this.$message.error('用户信息更新失败！')
          }
           this.detailFormVisible = false
           this.getUserList()
        })
      },

      //更改用户信息
      async statewxUser(userIdentity){
        this.$refs.wxUserRef.validate(async valid => {
           console.log(userIdentity)
           this.wxUser.userIdentity = userIdentity
           this.wxUser.state = 3
            console.log( this.wxUser.userIdentity)
           if (!valid) return
           const { data: res} = await this.$http.post('/weiXinUser/examineUser',this.wxUser)
           console.log(this.wxUser)
           console.log(res)
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
           console.log(userIdentity)
           this.wxUser.userIdentity = userIdentity
            console.log( this.wxUser.state)
           if (!valid) return
           const { data: res} = await this.$http.post('/weiXinUser/examineUser',this.wxUser)
           console.log(this.wxUser)
           console.log(res)
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
