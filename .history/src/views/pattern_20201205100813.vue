<template>
  <div class="app-container">

    <!-- 搜索控件-->
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline"
        @click="PatternCreate">
        添加持码人
      </el-button>
    </div>

    <!-- 数据显示表格区域  -->
    <el-table :data="patternList" fit highlight-current-row style="width: 200%;">
      <el-table-column label="姓名" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行卡号" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.endTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="支付宝号" align="center" min-width="300px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{row.endTime}}</span>
        </template>
      </el-table-column>

    </el-table>

    

    <!-- 添加模式对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="addPatternlogVisible" width="50%">
      <el-form ref="addPatternForm" :model="Pattern" :rules="addPatterRules" status-icon label-position="left" label-width="80px" style="width: 300px; margin-left:30px;">
        <el-form-item label="姓名" prop="designation">
          <el-input v-model="Pattern.designation" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="手机号" prop="pattType">
          <el-input v-model="Pattern.pattType" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="身份证号" prop="pattType">
          <el-input v-model="Pattern.pattType" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="银行卡号" prop="cycle">
          <el-input v-model="Pattern.cycle" placeholder="请输入银行卡号"/>
        </el-form-item>
        <el-form-item label="支付宝号" prop="cycle">
          <el-input v-model="Pattern.cycle" placeholder="请输入支付宝号"/>
        </el-form-item>
        <!-- <el-form-item label="模式周期" prop="timeRange">
          <el-date-picker
                @change="findPatternCycle"
                v-model="timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addPatternlogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addPattern():updatePattern(Pattern.pattId)">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import { parseTime } from '@/utils/ruoyi.js'


  export default {
    data() {
      return {
        patternList: [],
        levelList: [],
        total: 0,
        upWayDate: [
          {
            value: 0,
            label: '手动'
          },
          {
            value: 1,
            label: '自动'
          }
        ],
        patternTypeDate: [
          {
            value: 1,
            label: '备选模式'
          },
          {
            value: 2,
            label: '普通模式'
          },
          {
            value: 3,
            label: '区域模式'
          }
       ],
       upConditionsDate:[
         {
           value: 0,
           label: '无升级条件'
         },
         {
           value: 1,
           label: '成长值'
         },
         {
           value: 2,
           label: '任务'
         },
         {
           value: 3,
           label: '成长值+任务'
         }
       ],
       sepFlag: [
         {
           value: 1,
           label: '销售总额'
         },
         {
           value: 2,
           label: '销售额排名'
         }
       ],

        levlelogVisible: false,
        addPatternlogVisible: false,
        addLevellogVisible: false,
        dialogEquityVisible: false,
        dialogUpConstionVisible: false,
        Pattern: {
          pattType:'',
          designation:'',
          cycle: '',
          startTime: '',
          endTime: '',
          state:'',
          pattId:''
        },
        listItemId:'',
        Level: {
          levelId:'',
          level:'',
          levelName:'',
          upConditions:'',
          experience:'',
          upWay:'',
          equityId:'',
          equityDesc:''
        },
        timeRange:[],
        patte:'',
        levelPase:{},
        value1: '',
        textMap: {
          update: '编辑模式',
          create: '新增模式'
        },
        dialogStatus: '',
        textMap1: {
          update: '编辑等级',
          create: '新增等级'
        },
        dialogStatus1: '',
        patternVo: {
          state:'',
          pattId:''
        },
        equtiyList: [],
        LevelSepList: [],
        levelEquity: {
          equityId:'',
          levelId:'',
          equityId:''
        },
        LevelSep: {
          id:'',
          flag:'',
          levelId:'',
          sales:'',
          salesRank:'',
          taskId:'',
          taskName:''
        },
        /*添加模式表单验证*/
        addPatterRules: {
          designation: [{
            required: true,
            message: '请输入模式名称！',
            trigger: 'blur'
          }, {
            min: 2,
            max: 50,
            message: '用户名长度在 2 到 50 个字符',
            trigger: 'blur'
          }],
          cycle:[{
            required: true,
            message: '周期数度在为大于1的正整数!',
            trigger: 'blur'
          }],

          pattType: [{
            required: true,
            message: '请选择模式类别！',
            trigger: 'change'
          }],
          timeRange: [{
            required: false,
            message: '选择周期！',
            trigger: 'change'
          }]
        },
        /*添加等级表单验证*/
        addLevelRules: {
          level: [{
            required: true,
            message: '请输入等级！',
            trigger: 'blur'
          }],
          levelName: [{
            required: true,
            message: '请输入等级名称！',
            trigger: 'blur'
          }, {
            min: 2,
            max: 30,
            message: '等级名称长度在 2 到 30 个字符',
            trigger: 'blur'
          }],
          upWay: [{
            required: true,
            message: '选择升级方式！',
            trigger: 'change'
          }],
          upConditions: [{
            required: true,
            message: '请选择升级条件！',
            trigger: 'change'
          }],
          equityDesc: [{
            required: true,
            message: '权益描述！',
            trigger: 'blur'
          }, {
            min: 2,
            max: 150,
            message: '权益描述长度在 2 到 150 个字符',
            trigger: 'blur'
          }]
        },
        //添加表单验证的规则对象
        addEquityRules: {
          equityId: [{
            required: true,
            message: '选择选权益类型！',
            trigger: 'blur'
          }],
          amount: [{
            required: true,
            message: '请输入益值,只能是数值！',
            trigger: 'blur'
          }]
        },
        addLevelSepRules:{
          taskId: [{
            required: true,
            message: '选择升级任务！',
            trigger: 'blur'
          }],
          flag: [{
            required: true,
            message: '选择任务指标！',
            trigger: 'blur'
          }],
          sales: [{
            required: true,
            message: '选择输入销售额！',
            trigger: 'blur'
          }],
          salesRank: [{
            required: true,
            message: '选择输入销售额排名！',
            trigger: 'blur'
          }],
        }
      }
    },

    //Vue生命周期函数
    created() {
      this.getPatternList()
    },

    //事件处理函数
    methods: {
      /* 查询消息*/
      async getPatternList() {
        const { data: res } = await this.$http.get('/pattern/getPatternAll')
        if (res.code == "801") {
          this.patternList = res.result.patternANDlevel
          this.total = res.result.patternANDlevel.length
        }
        if (res.code !== "801") {
          return this.$message.error('模式数据拉取失败！！')
        }
      },

      /* 查询等级 */
      async getLevelList(pattId) {
        this.listItemId = pattId
        const {
          data: res
        } = await this.$http.get('/level/getLevelByPattId', {params: {pattId}})
         this.levlelogVisible = true
        //  console.log(res)
        if (res.code == "801") {
          this.patte = res.result[0].pattId
          this.levelList = res.result
          this.getLevelSep()
         
        }
        if (res.code !== "801") {
          this.levelList = []
          // return this.$message.error('模式数据拉取失败！！')
        }
      },

      /* 获取升级条件*/
      async getLevelSep() {
        const {
          data: res
        } = await this.$http.get('/upgrade/getUpgrade',  {params: {pattId:this.patte}})

        if (res.code == "801") {
          this.levelPase = res.result
        }
        if (res.code !== "801") {
          return this.$message.error('参数拉取失败！！')
        }
      },

      /* 新增模式操作*/
      async addPattern(){
          for (let i = 0; i < this.timeRange.length; i++) {
            if(i == 0){
              this.Pattern.startTime=parseTime( this.timeRange[i])
              console.log('开始'+this.Pattern.startTime)
            }
            if(i == 1){
              this.Pattern.endTime=parseTime( this.timeRange[i])
              console.log('结束'+ this.Pattern.endTime)
            }
          }
          this.$refs.addPatternForm.validate(async valid => {
            if (!valid) return
            const {
              data: res
            } = await this.$http.post('/pattern/addPattern', this.Pattern)

            if (res.code == "801") {
              this.getPatternList()
              this.addPatternlogVisible = false
              this.$message.success(res.message)
            }
            if (res.code == "802") {
              this.$message.error(res.message)
            }
          })
      },

      /* 新增等级操作*/
      async addLevel(){
        // console.log(111222,this.listItemId)
          this.Level.pattId =this.listItemId
          
          this.$refs.addLevelRef.validate(async valid => {
            if (!valid) return
            const {
              data: res
            } = await this.$http.post('/level/addLevel', this.Level)
            if (res.code == "801") {
              this.getLevelList(this.Level.pattId)
              this.addLevellogVisible = false
              this.levlelogVisible = true
              this.$message.success('等级创建成功，您需要为该等级设置权益以及升级条件！')
              return
            }
            if (res.code !== "801") {
              return this.$message.error('等级创建失败！')
            }
          })
      },

      /* 更新模式*/
      async updateLevel(leveld){
         this.Level.pattId =this.levelList[0].pattId
        this.$refs.addLevelRef.validate(async valid => {
          if (!valid) return
          this.Level.levelId = leveld
          const {
            data: res
          } = await this.$http.post('/level/updateLevelById',this.Level)
          if (res.code == "801") {
            this.getLevelList(this.Level.pattId)
            this.addLevellogVisible = false
            this.levlelogVisible = true
            return
          }
          if (res.code !== "801") {
            return this.$message.error('模式更新失败！')
          }
        })
      },


      resetPattern(){
        this.Pattern={
          pattType:'',
          designation:'',
          cycle:'',
          startTime: '',
          endTime: '',
          state:'',
          pattId:''
        }
        this.timeRange=[]
      },
      /* 创建模式选择对话框*/
      PatternCreate() {
        this.resetPattern()
        this.resetForm('addPatternForm')
        this.dialogStatus = 'create'
        this.addPatternlogVisible = true
      },

       /* 修改模式选择对话框*/
      async PatternUpdate(pattid) {
        this.dialogStatus = 'update'

        const {
          data: res
        } = await this.$http.get('/pattern/getPatternByPattId', {params: {pattId:pattid}})

        // console.log(444555,res)

        this.Pattern = res.result
        this.timeRange[0] = res.result.startTime
        this.timeRange[1] = res.result.endTime
        if (res.code !== "801") {
          return this.$message.error('模式数据拉取失败！！')
        }
        this.addPatternlogVisible = true
      },

      /* 根据ID删除相应的等级*/
      async removeLevel(levelId){
         this.Level.pattId =this.levelList[0].pattId
        const confirmResult = await this.$confirm('是否确定删除该模式下的该等级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除！')
        }
        const {
          data: res
        } = await this.$http.get('/level/deleteLevelById', {
          params: {
            levelId
          }
        })
        if (res.code !== "802") {
          this.$message.error('删除用户失败！')
        }
        this.$message.success('删除用户成功！')
       this.getLevelList(this.Level.pattId)
       this.levlelogVisible = true
      },

      /* 根据ID删除相应的等级*/
      async removeLevelSep(levelId){
         this.Level.pattId =this.levelList[0].pattId
        const confirmResult = await this.$confirm('是否确定删除该升级条件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除！')
        }
        const {
          data: res
        } = await this.$http.get('/upgrade/removeLevelSep', {params: {levelSepId:levelId}})

        if (res.code !== "801") {
          this.$message.error('删除条件失败！')
        }
        if (res.code == "801") {
          this.$message.success('删除条件成功！')
        }

       this.getLevelList(this.Level.pattId)
       this.levlelogVisible = true
       this.dialogUpConstionVisible = false
      },

      /* 更新模式*/
      async updatePattern(pattid){
        for (let i = 0; i < this.timeRange.length; i++) {
          if(i == 0){
            this.Pattern.startTime=parseTime( this.timeRange[i])
            console.log('开始'+this.Pattern.startTime)
          }
          if(i == 1){
            this.Pattern.endTime=parseTime( this.timeRange[i])
            console.log('结束'+ this.Pattern.endTime)
          }
        }
        this.$refs.addPatternForm.validate(async valid => {
          if (!valid) return
          this.Pattern.pattId = pattid
          const {
            data: res
          } = await this.$http.post('/pattern/updatePatternById',this.Pattern)
          if (res.code == "801") {
            this.getPatternList()
            this.addPatternlogVisible = false
            return
          }
          if (res.code !== "801") {
            return this.$message.error('模式更新失败！')
          }
        })
      },


      /* 重置权益值*/
      resetEquity(){
        this.levelEquity={
          equityId:'',
          levelId:'',
          equityId:''
        }
      },
      /* 获取当前等级的所有权益*/
      async getequityBylevelId(levelId){
        this.resetEquity()
        // this.$nextTick(()=>{
        //   this.$refs.levelEquitylRef.resetFields();
        // })
        this.levelEquity.levelId = levelId
        const {
          data: res
        } = await this.$http.get('/level/getEquity', {params:{levelId:levelId}})

        if (res.code == "801") {
          this.equtiyList = res.result
          this.dialogEquityVisible = true
        }
        if (res.code !== "801") {
          this.equtiyList = []
          this.dialogEquityVisible = true
          return
        }
      },

      /*重置添加条件对话框*/
      resetLevelSep(){
        this.LevelSep={
          id:'',
          flag:'',
          levelId:'',
          sales:'',
          salesRank:'',
          taskId:'',
          taskName:''
        }
      },
       /*获取当前等级升级条件 */
      async getWhereBylevelId(levelId){
        this.resetLevelSep()
        // this.$nextTick(()=>{
        //   this.$refs.LevelSepRef.resetFields();
        // })

        this.LevelSep.levelId = levelId

        const {
          data: res
        } = await this.$http.get('/upgrade/getLevelSep', {params:{levelId:levelId}})
          this. dialogUpConstionVisible = true
          if(res.code == "801"){
            this.LevelSepList = res.result
          }else {
          // return this.$message.warning('升级条件信息获取失败，获取该等级下还未添加权益！！')
        }
      },

      async changeState(pattId){
           this.patternVo.pattId = pattId
           this.patternVo.state = 0
           const confirmResult = await this.$confirm('进行中模式下架可能引起数据错误, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).catch(err => err)
           if (confirmResult !== 'confirm') {
             return this.$message.info('已取消下架！')
           }
           const {
             data: res
           } = await this.$http.post('/pattern/updateStateById',this.patternVo)

           if (res.code == "801") {
             this.getPatternList()
             return
           }
           if (res.code !== "801") {
             return this.$message.error('模式状态修改失败！')
           }
         },


      async changeState1(pattId){
              this.patternVo.pattId = pattId
              this.patternVo.state = 1
              const {
                data: res
              } = await this.$http.post('/pattern/updateStateById',this.patternVo)

              if (res.code == "801") {
                this.getPatternList()
                return
              }
              if (res.code !== "801") {
                return this.$message.error('模式状态修改失败！')
              }
      },

      /* 自动升级*/
       async upGrade(){
       const { data: res } = await this.$http.get('/level/upGrade')
       if (res.code == "801") {
         return this.$message.success(res.message)
       }
       if (res.code !== "801") {
         return this.$message.error(res.message)
       }
      },

      /*弹出新增等级对话框前*/
      resetLevel(){
        this.Level={
            levelId:'',
            level:'',
            levelName:'',
            upConditions:'',
            experience:'',
            upWay:'',
            equityId:'',
            equityDesc:''
        }
      },
      /* 创建模式选择对话框*/
      LevelCreate() {
        this.resetLevel()
        this.dialogStatus1 = 'create'
        this.addLevellogVisible = true
        this.$nextTick(()=>{
          this.$refs.addLevelRef.resetFields();
        })
      },

       /* 修改模式选择对话框*/
      async LevelUpdate(levelid) {

        this.dialogStatus1 = 'update'
        const { data: res} = await this.$http.get('/level/getLevelByLevelId',{params: {levelId:levelid}})

        if (res.code !== "801") {
          this.$message.error('查询用户失败！')
        }
        this.Level = res.result
        this.addLevellogVisible = true
      },

      async removeEquity(leId){
         const confirmResult = await this.$confirm('是否确定删除该模式下的该等级, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).catch(err => err)
         if (confirmResult !== 'confirm') {
           return this.$message.info('已取消删除！')
         }
         const {
           data: res
         } = await this.$http.get('/equity/removeLevelEquityById', {params: {leId:leId}})
         if (res.code == "802") {
          return this.$message.error('删除权益失败！')
         }
         this.$message.success('删除权益成功！')
         this.dialogEquityVisible = false
      },

      /* */
      async addEquity(levelId){

        this.levelEquity.levelId = levelId
        this.Level.pattId =this.levelList[0].pattId
    
          this.$refs.levelEquitylRef.validate(async valid => {
            if (!valid) return
            const {
              data: res
            } = await this.$http.post('/equity/addLevelEquityById',this.levelEquity)
            if (res.code == "801") {
              this.$message.success('添加权益成功！')
              this.getLevelList(this.Level.pattId)
              this.getequityBylevelId(this.levelEquity.levelId)
              return
            }
            if (res.code !== "801") {
              return this.$message.error('添加权益失败！')
            }
          })
      },
      /*重置添加升级条件对话框*/
      /*添加升级条件*/
      async addLevelSep(levelId){
        this.Level.pattId =this.levelList[0].pattId

          this.$refs.LevelSepRef.validate(async valid => {
            if (!valid) return

            const {
              data: res
            } = await this.$http.post('/upgrade/addLevelSep',this.LevelSep)
            if (res.code == "801") {
              this.$message.success('添加权益成功！')
              this.getLevelList(this.Level.pattId)
              this.getWhereBylevelId(levelId)
              return
            }
            if (res.code !== "801") {
              return this.$message.error('添加权益失败！')
            }
          })
      },
      resetForm(formName) {
        if (this.$refs[formName]!==undefined) {
          this.$refs[formName].resetFields();
        }
      },
      /*添加模式时校验周期*/
       async findPatternCycle(){

        for (let i = 0; i < this.timeRange.length; i++) {
          if(i == 0){
            this.Pattern.startTime=parseTime( this.timeRange[i])
            console.log('开始'+this.Pattern.startTime)
          }
          if(i == 1){
            this.Pattern.endTime=parseTime( this.timeRange[i])
            console.log('结束'+ this.Pattern.endTime)
          }
        }

        const {
          data: res
        } = await this.$http.get('/pattern/getPatternCycle', {params: {userType:this.Pattern.pattType,startTime:this.Pattern.startTime,endTime:this.Pattern.endTime}})
        if (res.code !== "801") {
          return this.$message.error('当前时间已存在同类模式！')
        }
      }


    }
  }
</script>
