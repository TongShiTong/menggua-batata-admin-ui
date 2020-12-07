<template>
  <div class="app-container">

    <!-- 搜索控件-->
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline"
        @click="PatternCreate">
        新增模式
      </el-button>
    </div>

    <!-- 数据显示表格区域  -->
    <el-table :data="patternList" fit highlight-current-row style="width: 200%;">
      <el-table-column label="模式状态" min-width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.state == 0">
            未上架
          </el-tag>
          <el-tag v-if="row.state == 1">
            已上架未开始
          </el-tag>
          <el-tag v-if="row.state == 2">
            已上架进行中
          </el-tag>
          <el-tag v-if="row.state == 3">
            结束
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="模式类别" min-width="150px" align="center">
        <template slot-scope="{row}">
          
          <el-tag v-if="row.pattType == 1">
            备选模式
          </el-tag>
          <el-tag v-if="row.pattType == 2">
            普通模式
          </el-tag>
          <el-tag v-if="row.pattType == 3">
            区域模式
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="模式名称" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.designation}}</span></br>
          <span>{{row.startTime}}</span>&nbsp;至&nbsp;
          <span>{{row.endTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="300px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.state == 0" type="primary" size="small" @click="PatternUpdate(row.pattId)">
            编辑
          </el-button>
          <el-button v-if="row.state == 0" size="small" type="danger" @click="changeState1(row.pattId)">
            上架
          </el-button>
          <el-button v-if="row.state == 1 || row.state == 2" size="small" type="success" @click="changeState(row.pattId)">
            下架
          </el-button>
          <el-button type="primary" size="small" icon="el-icon-d-arrow-right" @click="getLevelList(row.pattId)">
            跳转等级详情
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 显示等级详情抽屉-->
    <el-drawer
      title="等级详情"
       :with-header="false"
      :visible.sync="levlelogVisible"
      size="60%">
        <br /><div style="margin-left: 12px;">等级详情</div><br />
       <div class="filter-container">
         <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline"
           @click="LevelCreate">
           新增等级
         </el-button>
       </div>

       <el-table :data="levelList" style="width:100%">
         <el-table-column label="等级" min-width="80px" align="center">
           <template slot-scope="{row}">
               <span> {{ row.level }}</span>
           </template>
         </el-table-column>

         <el-table-column label="等级名称" min-width="80px" align="center">
           <template slot-scope="{row}">
               <span> {{ row.levelName }}</span>
           </template>
         </el-table-column>

         <el-table-column label="等级权益" min-width="100px" align="center">
           <template slot-scope="{row}">
              <!-- <span> {{ row.equityId }}</span> -->
                <el-button type="success" size="mini" @click="getequityBylevelId(row.levelId)">权益详情</el-button>
           </template>
         </el-table-column>

         <el-table-column label="升级条件" min-width="100px" align="center">
           <template slot-scope="{row}">
               <span v-if="row.upConditions == 0"> 无升级条件</span>
               <span v-if="row.upConditions == 1"> 成长值 >= {{row.experience}}</span>
               <el-button v-if="row.upConditions == 2 | row.upConditions ==3"  type="success" size="mini" @click="getWhereBylevelId(row.levelId)">设置条件</el-button>
           </template>
         </el-table-column>

         <el-table-column label="升级方式" min-width="80px" align="center">
           <template slot-scope="{row}">
               <span v-if="row.upWay == 0"> 手动</span>
               <span v-if="row.upWay == 1"> 自动</span>
           </template>
         </el-table-column>

         <el-table-column label="最后操作用户" min-width="130px" align="center">
           <template slot-scope="{row}">
               <span>{{row.updateAdmin}}</span>/
               <span>{{row.updateTime}}</span>
           </template>
         </el-table-column>

         <el-table-column label="操作" min-width="220px" align="center">
           <template slot-scope="{row}">
               <el-button v-if="row.upWay == 0" type="success" size="mini" @click="upGrade">升级</el-button>
               <el-button type="primary" size="mini" @click="LevelUpdate(row.levelId)">编辑</el-button>
               <el-button  type="danger" size="mini" @click="removeLevel(row.levelId)">删除</el-button>
           </template>
         </el-table-column> -->
       </el-table>
    </el-drawer>

    <!-- 添加模式对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="addPatternlogVisible" width="50%">
      <el-form ref="addPatternForm" :model="Pattern" :rules="addPatterRules" status-icon label-position="left" label-width="80px" style="width: 300px; margin-left:30px;">
        <el-form-item label="模式名称" prop="designation">
          <el-input v-model="Pattern.designation" placeholder="请填写模式名称"/>
        </el-form-item>
        <el-form-item label="模式类别" prop="pattType">
          <el-select  class="filter-item" placeholder="模式类别" v-model="Pattern.pattType">
            <el-option v-for="item in patternTypeDate" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="周期数" prop="cycle">
          <el-input v-model="Pattern.cycle" placeholder="请填写周期数"/>
        </el-form-item>
        <el-form-item label="模式周期" prop="timeRange">
          <el-date-picker
                @change="findPatternCycle"
                v-model="timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        </el-form-item>
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

    <!-- 添加等级对话框-->
    <el-dialog :title="textMap1[dialogStatus1]" :visible.sync="addLevellogVisible" width="500px">
      <el-form ref="addLevelRef" :model="Level" status-icon label-position="left"  :rules="addLevelRules"  label-width="80px" style="width: 300px; margin-left:30px;">
        <el-form-item label="等级" prop="level">
          <el-input v-model="Level.level"/>
        </el-form-item>
        <el-form-item label="等级名称" prop="levelName">
          <el-input v-model="Level.levelName"/>
        </el-form-item>

        <el-form-item label="升级方式" prop="upWay">
          <el-select  class="filter-item" placeholder="请选择升级方式" v-model="Level.upWay" style="width: 155px;" >
            <el-option v-for="item in upWayDate"  :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="选择条件" prop="upConditions" style="width: 400px;">
          <el-select  class="filter-item" placeholder="请选择任务进度要求" v-model="Level.upConditions" style="width: 155px;">
            <el-option v-for="item in upConditionsDate"  :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
            <el-input v-model="Level.experience" placeholder="请输入成长值" style="width: 120px;"/>
        </el-form-item>

        <el-form-item label="权益描述" prop="equityDesc" placeholder="请输入描述">
         <el-input type="textarea" v-model="Level.equityDesc" style="width: 300px;"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addLevellogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus1==='create'?addLevel():updateLevel(Level.levelId)">
          提交
        </el-button>
      </div>
    </el-dialog>


    <!--权益设置对话框 patteryTypeChange-->
    <el-dialog title="权益设置" :visible.sync="dialogEquityVisible">
      <span>当前等级下所拥有的权益列表</span>
      <el-table :data="equtiyList">
        <el-table-column property="date" label="权益名称" min-width="150">
          <template slot-scope="{row}">
            <span>{{row.equityName}}</span>
          </template>
        </el-table-column>
        <el-table-column property="name" label="权益值" width="200">
          <template slot-scope="{row}">
            <span>{{row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作">
          <template slot-scope="{row}">
            <el-button type="danger" size="mini" @click="removeEquity(row.leId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-form ref="levelEquitylRef" :model="levelEquity" :rules="addEquityRules" status-icon label-position="left">
        <el-form-item label="添加新权益" prop="equityId">
          <el-select  class="filter-item" placeholder="权益" v-model="levelEquity.equityId">
            <el-option v-for="item in levelPase.equity" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="权益数值" prop="amount" style="margin-left:15px ;">
            <el-input  size="mini" style="width:150px;" v-model="levelEquity.amount"  placeholder="请输入权益匹配值"/>
        </el-form-item>
         <el-button type="primary" size="mini" @click="addEquity(levelEquity.levelId)" style="margin-left:90px ;">添加</el-button>
      </el-form>
    </el-dialog>


    <!--升级条件设置对话框  -->
    <el-dialog title="升级条件设置" :visible.sync="dialogUpConstionVisible">
      <span>升级到当前等级下所需要完成的任务列表</span>
      <el-table :data="LevelSepList">
        <el-table-column property="date" label="等级名称" min-width="160">
          <template slot-scope="{row}">
            <span>{{row.taskName}}</span>
          </template>
        </el-table-column>
        <el-table-column property="name" label="任务指标" width="100">
          <template slot-scope="{row}">
            <span v-if="row.flag == 1"> 销售额</span>
            <span v-if="row.flag == 2"> 销售额排名</span>
          </template>
        </el-table-column>
        <el-table-column property="name" label="总销售额" width="100">
          <template slot-scope="{row}">
            <span>{{row.sales}}</span>
          </template>
        </el-table-column>
        <el-table-column property="name" label="总销售额排名" width="100">
          <template slot-scope="{row}">
            <span v-if="row.salesRank == 99999">无要求</span>
            <span v-else>{{row.salesRank}}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button type="danger" size="mini" @click="removeLevelSep(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <el-form ref="LevelSepRef" :model="LevelSep"  :rules="addLevelSepRules" status-icon label-position="left">
        <el-form-item label="条件设置" prop="taskId" >
          <el-select  class="filter-item" placeholder="选择添加升级条件" v-model="LevelSep.taskId">
            <el-option v-for="item in levelPase.upConditions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="指标设置" prop="flag" >
          <el-select  class="filter-item" placeholder="选择添升级参考指标" v-model="LevelSep.flag">
            <el-option v-for="item in sepFlag" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item  prop="sales"  v-if="LevelSep.flag == 1" style="margin-left:77px ;"><el-input  size="mini" style="width:130px;" v-model="LevelSep.sales"  placeholder="请输入销售额"/></el-form-item>
        <el-form-item  prop="salesRank"  v-if="LevelSep.flag == 2" style="margin-left:77px ;"><el-input   size="mini" style="width:130px;" v-model="LevelSep.salesRank"  placeholder="销售额排名值"/></el-form-item>
        <el-button type="primary" size="mini" @click="addLevelSep(LevelSep.levelId)" style="margin-left:77px ;">添加</el-button>
      </el-form>
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
