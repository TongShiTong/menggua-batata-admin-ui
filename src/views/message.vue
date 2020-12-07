<template>
  <div class="app-container">
    <!-- 搜索控件-->
    <div class="filter-container">
      <el-select v-model="queryInfo.pushType" placeholder="消息类型" class="filter-item" clearable style="width: 100px;"
        @change="pushTypeChange(queryInfo.pushType)">
        <el-option v-for="item in pushTypeDate" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleaddMessage">
        新增消息
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleaddPush">
        新增推送
      </el-button>
    </div>

    <!-- 数据显示表格区域-->
    <el-table :data="messageList" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="序号" type="index" sortable align="center" min-width="80">
      </el-table-column>
      <el-table-column label="标题" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.msgTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容" min-width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{row.msgContent}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.pushTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送范围" min-width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.pushRange == 0">
            海选团长
          </el-tag>
          <el-tag v-if="row.pushRange == 1">
            见习团长
          </el-tag>
          <el-tag v-if="row.pushRange == 2">
            正式团长
          </el-tag>
          <el-tag v-if="row.pushRange == 3">change
            学生团长
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最后操作用户/时间" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.updateAdmin}}</span>/
          <span>{{row.updateTime}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" min-width="140px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.pushState == 0" type="primary" size="small" @click="">
            发送
          </el-button>
          <el-button v-if="row.pushState == 1" size="small" type="danger" @click="">
            撤回
          </el-button>
          <el-button v-if="row.pushState == 2" size="small" type="success" @click="">
            重新发送
          </el-button>
          <el-button v-if="row.pushState == 0 " type="primary" size="small" @click="">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分按钮页区-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current"
        :page-sizes="[4,10, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加Message对话弹框 -->
    <el-dialog title="新建消息" :visible.sync="addMessagelogVisible">
      <el-form ref="addMessageRef" :model="addMessage" :rules="addMessageRules" status-icon label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题" prop="msgTitle">
          <el-input  v-model="addMessage.msgTitle"/>
        </el-form-item>
        </el-form-item>
        <el-form-item label=" 图片" prop="msgImg">
           <el-upload v-model="addMessage.msgImg"
             class="avatar-uploader"
             action="https://jsonplaceholder.typicode.com/posts/"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="imageUrl" :src="imageUrl" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="msgContent">
         <el-input type="textarea" v-model="addMessage.msgContent" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="发送范围" prop="pushRange">
          <el-select  class="filter-item" placeholder="发送范围" v-model="addMessage.pushRange">
            <el-option v-for="item in pushRangeDate" :key="item.value" :label="item.label" :value="item.value"  />
          </el-select>
        </el-form-item>
        <el-form-item label="发送时间" prop="pushTime">
          <div class="block">
              <el-date-picker
                v-model="addMessage.pushTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMessagelogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addMessagees">
          提交
        </el-button>
      </div>
    </el-dialog>


   <!-- 添加Message对话弹框 -->
   <el-dialog title="新建推送" :visible.sync="addMessagelogVisible1">
     <el-form ref="addPushRef" :model="addMessage" :rules="addMessageRules" status-icon label-position="left"
       label-width="120px" style="width: 400px; margin-left:50px;">
       <el-form-item label="标题" prop="msgTitle">
         <el-input  v-model="addMessage.msgTitle"/>
       </el-form-item>
       </el-form-item>

       <el-form-item label="内容" prop="msgContent">
        <el-input type="textarea" v-model="addMessage.msgContent" style="width: 300px;"></el-input>
       </el-form-item>
       <el-form-item label="发送范围" prop="pushRange">
         <el-select  class="filter-item" placeholder="发送范围" v-model="addMessage.pushRange">
           <el-option v-for="item in pushRangeDate" :key="item.value" :label="item.label" :value="item.value" />
         </el-select>
       </el-form-item>
       <el-form-item label="发送时间" prop="pushTime">
         <div class="block">
             <el-date-picker
               v-model="addMessage.pushTime"
               type="datetime"
               placeholder="选择日期时间">
             </el-date-picker>
           </div>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="addMessagelogVisible1 = false">
         取消
       </el-button>
       <el-button type="primary" @click="addMessageestuisong">
         提交
       </el-button>
     </div>
   </el-dialog>

  </div>
</template>

<script>

import { parseTime } from '@/utils/ruoyi.js'
  export default {
    //当前组件的私有数据value
    data() {
      return {
        imageUrl: '',
        pushTypeDate: [ {
             value: 0,
             label: '普通消息'
           },
           {
             value: 1,
             label: '推送消息'
           }],
        pushRangeDate: [
           {
             value: 0,
             label: '海选团长'
           },
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
        pushTypeDateIndex: '',
        addMessagelogVisible: false,
        addMessagelogVisible1: false,
        //获取用户列表的参数对象
        queryInfo: {
          pushType: 0,
          size: '',
          current: 1
        },
        messageList: [],
        total: 0,
        addMessage:{
          msgTitle: '',
          pushTime: '',
          pushRange: '',
          msgImg: '',
          msgContent: '',
          pushType:''
        },
        addMessageRules: {
          msgTitle: [{
            required: true,
            message: '请输入消息标题！',
            trigger: 'blur'
          }, {
            min: 2,
            max: 30,
            message: '用户名长度在 2 到 30 个字符',
            trigger: 'blur'
          }],
          msgContent: [{
            required: true,
            message: '消息内容！',
            trigger: 'blur'
          }, {
            min: 2,
            max: 300,
            message: '用户名长度在 2 到 300个字符',
            trigger: 'blur'
          }],

          pushRange: [{
            required: true,
            message: '请选择发送范围！',
            trigger: 'change'
          }],
          pushTime: [{
            required: true,
            message: '选择选择发送时间！',
            trigger: 'blur'
          }]
        }

      }
    },

    //Vue生命周期函数
    created() {
      this.getMessageList()
    },

    //事件处理函数
    methods: {
      /* 查询消息*/
      async getMessageList() {
        const {
          data: res
        } = await this.$http.get('/message/searchMessage', {
          params: this.queryInfo
        })
        if (res.code == "802") {
          return this.$message.warning('没有查询到符合条件的数据，请更换条件查询！')
        }
        if (res.code !== "801") {
          return this.$message.error('消息查询失败！！')
        }
        console.log(res)
        this.messageList = res.result.records
        console.log(res.result.records)
        this.total = res.result.total
      },

      /* 添加新消息*/
      addMessagees(){
        this.addMessage.pushType = 0
        console.log(this.addMessage)
        this.addMessage.pushTime = parseTime(this.addMessage.pushTime)
        parseTime(this.addMessage.pushTime)
        this.$refs.addMessageRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post('/message/addMessage', this.addMessage)
          if (res.code !== "801") {
           return this.$message.error('添加消息失败！')
          }
          if (res.code == "801") {
            this.$message.success('消息添加成功！！')
          }
          this.getMessageList()
          this.addMessagelogVisible = false
          this.addMessagelogVisible1 = false
        })
      },

      /* 添加新推送*/
      addMessageestuisong(){
        this.addMessage.pushType = 1
        console.log(this.addMessage)
        this.addMessage.pushTime = parseTime(this.addMessage.pushTime)
        parseTime(this.addMessage.pushTime)
        this.$refs.addPushRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post('/message/addMessage', this.addMessage)

          if (res.code !== "801") {
           return this.$message.error('添加推送失败！')
          }

          if (res.code == "801") {
            this.$message.success('消息推送成功！！')
          }

          this.getMessageList()
          this.addMessagelogVisible = false
            this.addMessagelogVisible1 = false
        })
      },

      /* 监听排序方式条件变化pushrungChange*/
      pushTypeChange(pushType) {
        this.queryInfo.pushType=pushType
        console.log(this.pushType)
        this.getMessageList()
      },

      //监听Pagesize改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.size = newSize
        this.getMessageList()
      },
      //监听当前页面的改变
      handleCurrentChange(newPage) {
        this.queryInfo.current = newPage
        this.getMessageList()
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleaddMessage(){
       this.addMessagelogVisible = true
       this.$nextTick(()=>{
         this.$refs.addMessageRef.resetFields();
       })
      },
      handleaddPush(){
       this.addMessagelogVisible1 = true
       this.$nextTick(()=>{
         this.$refs.addPushRef.resetFields();
       })
      },


    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }
</style>
