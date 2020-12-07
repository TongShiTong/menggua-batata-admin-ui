<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="handleFilter">
        新增任务
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">
        配额奖励
      </el-button>

    </div>
<!-- v-loading="listLoading" el-table加载属性-->
    <el-table
      :key="tableKey"
      :data="tasksList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="index" label="序号" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <!-- <template slot-scope="{row}">
          <span>{{ row.taskId }}</span>
        </template> -->
      </el-table-column>
	  <el-table-column label="类型" width="150px" align="center">
        <template slot-scope="{row}">
					<span v-if="row.taskType == 0">销售商品</span>
					<span v-else-if="row.taskType == 1">邀请新用户</span>
        </template>
      </el-table-column>
      <el-table-column label="派发方式" width="150px" align="center">
        <template slot-scope="{row}">
					<span v-if="row.distributeType === 0">派发</span>
					<span v-else-if="row.distributeType === 1">自主领取</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{row.taskName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{row.taskBeginTime}}</br>至</br>{{row.taskEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属模式" width="150px" align="center">
        <template slot-scope="{row}">
					<span v-if="row.taskMode == 0">招募海选</span>
					<span v-else-if="row.taskMode == 1">见习考核</span>
					<span v-else-if="row.taskMode == 2">正式考核</span>
					<span v-else-if="row.taskMode == 3">勤工俭学</span>
					<span v-else>无</span>
        </template>
      </el-table-column>

      <el-table-column label="指标条件" width="150px" align="center">
        <template slot-scope="{row}">
					<span v-if="row.target == 0">销售额>={{row.saleQuota}}</span>
					<span v-else-if="row.target == 1">销售排名>={{row.saleRank}}</span>
					<span v-else-if="row.target == 2">邀请用户数>={{row.invitationNumber}}</span>
					<span v-else-if="row.target == 3">邀请排名>={{row.invitationRank}}</span>
        </template>
      </el-table-column>

      <el-table-column label="指标奖励" class-name="status-col" min-width="110">
        <template slot-scope="{row}">
					<!-- <span>{{ row.tasksEquityList }}</span> -->
					<span style="padding-right: 5px;" v-for="(item,index) in row.tasksEquityList" :key="index">
						<span v-if="item.target == 0">销售额>={{item.saleQuota}}&nbsp;&nbsp;{{ item.equityName }}: {{ item.amount }};</br></span>
						<span v-else-if="item.target == 1">销售排名>={{item.saleRank}}&nbsp;&nbsp;{{ item.equityName }}: {{ item.amount }};</br></span>
						<span v-else-if="item.target == 2">邀请用户数>={{item.invitationNumber}}&nbsp;&nbsp;{{ item.equityName }}: {{ item.amount }};</br></span>
						<span v-else-if="item.target == 3">邀请排名>={{item.invitationRank}}&nbsp;&nbsp;{{ item.equityName }}: {{ item.amount }};</br></span>
					</span>
        </template>
      </el-table-column>
      <el-table-column label="最后操作" class-name="status-col" width="250">
        <template slot-scope="{row}">
					<span>{{ row.updateDate }} {{ row.updateAdmin }}</span>
          <!-- <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
					<el-button type="primary" size="small" @click="handleUpdate(row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div align="right" style="margin: 20px;">
    	<el-pagination @current-change="getTaskList" :page-size="10"  :current-page.sync ="page"  layout=" total,prev, pager, next ,jumper" :total="this.total">
    	</el-pagination>
    </div>
		
		
    <el-dialog :title="'新增任务'" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm1" :rules="rules" :model="this.tasks" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item label="类型" prop="taskType">
          <el-select v-model="tasks.taskType" placeholder="请选择任务类型">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
        </el-form-item>
        <el-form-item label="名称" prop="taskName">
         <el-input v-model="tasks.taskName" />
        </el-form-item>
		<el-form-item label="派发方式" prop="paifa">
		      <el-select v-model="tasks.paifa" placeholder="请选择任务类型">
						<el-option
							v-for="item in disPaifa"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
		    </el-form-item>
        <el-form-item label="所属模式" prop="taskMode">
					<el-select v-model="tasks.taskMode" placeholder="请选择任务模式">
						<el-option
							v-for="item in options1"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
          <!-- <el-input v-model="temp.title" /> -->
        </el-form-item>
				<el-form-item label="时间" prop="time">
					<el-date-picker
						v-model="time"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
					<!-- <el-date-picker v-model="tasks.taskBeginTime" type="datetime" placeholder="选择任务开始时间"></el-date-picker>
					</br>至</br>
					<el-date-picker v-model="tasks.taskEndTime" type="datetime" placeholder="选择任务结束时间"></el-date-picker> -->
				</el-form-item>
				<el-form-item label="商品id" v-if="tasks.taskType == 0" prop="goodsId">
				  <el-input v-model="tasks.goodsId" placeholder="请输入商品id" @blur="selectGoods()"/>
				</el-form-item>
				<el-form-item label="指标奖励" prop="target">
					<span>
						<el-select v-model="tasks.target" placeholder="请选择指标类型" style="width: 150px; margin-top: 5px;">
							<el-option
								v-for="item in options2"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-input v-model="value" placeholder="任务完成数" @blur="number($event)" style="width: 110px;" />
					</span>
				  <div ref="select" v-for="(it,index) in task" :key="index">
						<el-select v-model="it.equityId" placeholder="请选择奖励类型" style="width: 150px; margin-top: 5px;">
							<el-option
								v-for="item in it.equityList"
								:key="item.equityId"
								:label="item.equityName"
								:value="item.equityId">
							</el-option>
						</el-select>
						<el-input v-model="it.value1" placeholder="奖励完成数" @blur="number($event)"  min="1" style="width: 110px;" />
						<el-select v-model="it.quotaId" v-if="it.equityId == 4" placeholder="请选择奖励商品配额的配额商品id" style="width: 265px; margin-top: 5px;">
							<el-option
								v-for="item in it.quotaList"
								:key="item.quotaId"
								:label="'商品id：'+item.goodsId+' 剩余配额：' + item.quotaSurplus"
								:value="item.quotaId">
							</el-option>
						</el-select>
						<el-input v-else v-model="it.value2" placeholder="指标完成奖励" @blur="number($event)" style="width: 120px;"/>
						<!-- <div @click='del' v-if="index >= 1">
							<p style="color: deepskyblue;">删除指标奖励</p>
						</div> -->
					</div>
					<div style="margin: 5px;">
						<el-button round icon="el-icon-circle-plus-outline" @click='add' style="color: deepskyblue;">增加指标奖励</el-button>
						<el-button round icon="el-icon-remove-outline" @click='del' style="color: deepskyblue;">删除指标奖励</el-button>
					</div>
					</el-form-item>
				<el-form-item label="任务描述" >
				  <el-input v-model="tasks.taskContent" />
				</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          新增
        </el-button>
      </div>
    </el-dialog>
		
		<el-dialog :title="'任务详情'" :visible.sync="dialogFormVisible1">
		  <el-form ref="dataForm2" :rules="rules" :model="tasks" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
		    <el-form-item label="类型" prop="taskType">
		      <el-select v-model="tasks.taskType" placeholder="请选择任务类型">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
		    </el-form-item>
		    <el-form-item label="名称" prop="taskName">
		     <el-input v-model="tasks.taskName" />
		    </el-form-item>
			<el-form-item label="派发方式" prop="paifa">
		      <el-select v-model="tasks.paifa" placeholder="请选择任务类型">
						<el-option
							v-for="item in disPaifa"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
		    </el-form-item>
		    <el-form-item label="所属模式" prop="taskMode">
					<el-select v-model="tasks.taskMode" @change="tasks.taskMode"  placeholder="请选择任务模式">
						<el-option
							v-for="item in options1"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
		      <!-- <el-input v-model="temp.title" /> -->
		    </el-form-item>
				<el-form-item label="时间" prop="time">
					<el-date-picker
						v-model="time"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
					<!-- <el-date-picker v-model="tasks.taskBeginTime" type="datetime" placeholder="选择任务开始时间"></el-date-picker>
					</br>至</br>
					<el-date-picker v-model="tasks.taskEndTime" type="datetime" placeholder="选择任务结束时间"></el-date-picker> -->
				</el-form-item>
				<el-form-item label="商品id" v-if="tasks.taskType == 0">
				  <el-input v-model="tasks.goodsId" placeholder="请输入商品id" @blur="selectGoods()"/>
				</el-form-item>
				<el-form-item label="指标奖励">
					<span>
						<el-select v-model="tasks.target" placeholder="请选择指标类型" style="width: 150px; margin-top: 5px;">
							<el-option
								v-for="item in options2"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-input v-model="value" placeholder="任务完成数" @blur="number($event)" style="width: 110px;" />
					</span>
				  <div ref="select" v-for="(it,index) in task" :key="index">
						<el-select v-model="it.equityId" placeholder="请选择奖励类型" style="width: 150px; margin-top: 5px;">
							<el-option
								v-for="item in it.equityList"
								:key="item.equityId"
								:label="item.equityName"
								:value="item.equityId">
							</el-option>
						</el-select>
						<el-input v-model="it.value1" placeholder="奖励完成数" @blur="number($event)" style="width: 110px;" />
						<el-select v-model="it.quotaId" v-if="it.equityId == 4" placeholder="请选择奖励商品配额的配额商品id" style="width: 265px; margin-top: 5px;">
							<el-option
								v-for="item in it.quotaList"
								:key="item.quotaId"
								:label="'商品id：'+item.goodsId+' 剩余配额：' + item.quotaSurplus"
								:value="item.quotaId">
							</el-option>
						</el-select>
						<el-input v-else v-model="it.value2" placeholder="指标完成奖励" @blur="number($event)" style="width: 120px;"/>
						<!-- <div @click='del' v-if="index >= 1">
							<p style="color: deepskyblue;">删除指标奖励</p>
						</div> -->
					</div>
					<div style="margin: 5px;">
						<el-button round icon="el-icon-circle-plus-outline" @click='add' style="color: deepskyblue;">增加指标奖励</el-button>
						<el-button round icon="el-icon-remove-outline" @click='del' style="color: deepskyblue;">删除指标奖励</el-button>
					</div>
					</el-form-item>
				<el-form-item label="任务描述" >
				  <el-input v-model="tasks.taskContent" />
				</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible1 = false">
		      取消
		    </el-button>
		    <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
		      保存
		    </el-button>
		  </div>
		</el-dialog>
		
		<!-- 配额奖励 -->
		<el-dialog :title="'配额奖励'" :visible.sync="dialogFormVisible2">
			<el-table :data="this.quotaList1" stripe highlight-current-row style="width: 100%">
			  <el-table-column type="index" prop="date" label="序号" align="center" width="80">
					
			  </el-table-column>
			  <el-table-column  label="商品码" width="300" align="center">
					<template slot-scope="{row,$index}">
						<el-input v-if="$index == 0" @blur="selectQuotaTotal(row)" v-model="row.goodsId" placeholder="商品码" style="width: 280px;" />
						<div v-else>
							<span >{{row.goodsId}}</span>
							<span >{{row.goodsName}}</span>
						</div>
					</template>
			  </el-table-column>
			  <el-table-column  label="商品总配额" width="100" align="center">
					<template slot-scope="{row,$index}">
						<el-input v-if="$index == 0" v-model="stock" placeholder="总配额" style="width: 90px;" />
						<span v-else>{{row.quotaTotal}}</span>
					</template>
			  </el-table-column>
				<el-table-column  label="分配规则" align="center">
					<template slot-scope="{row,$index}">
						<el-select v-if="$index == 0" v-model="row.quotaRules" placeholder="请选择分配规则">
							<el-option
								v-for="item in quotaRules1"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-else v-model="row.quotaRules" placeholder="请选择分配规则" disabled>
							<el-option
								v-for="item in quotaRules1"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column  label="商品剩余配额" width="100" align="center">
					<template slot-scope="{row,$index}">
						<!-- <el-input v-if="$index == 0" v-model="stock" placeholder="剩余配额" style="width: 90px;" /> -->
						<span v-if="$index == 0">{{stock}}</span>
						<span v-else>{{row.quotaSurplus}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="操作" align="center">
					<template slot-scope="{row,$index}">
							<el-button v-if="$index ==0" type="primary" size="small" @click="addQuota(row)">新增</el-button>
							<el-button v-else type="danger" size="small" @click="deleteQuota(row)">删除</el-button>
					  </template>
					</el-table-column>
				</el-table-column>
			</el-table>
		</el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
	
	
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
// import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const defaultTasks = {
	taskId: '',
	taskName: '',
	taskType: '',
	paifa: 0,
	taskMode: '',
	taskBeginTime: '',
	taskEndTime: '',
	goodsId: '',
	target: '',
	saleQuota: '',
	saleRank: '',
	invitationNumber: '',
	invitationRank: '',
	tasksEquityList: [],
	goodsQuota: '',
	goodsQuotaRatio: '',
	taskContent: '',
	quotaId: ''
}

const defaulttasksEquityList = {
	taskId: '',
	taskName: '',
	paifa: 0,
	taskType: '',
	taskMode: '',
	taskBeginTime: '',
	taskEndTime: '',
	goodsId: '',
	target: '',
	saleQuota: '',
	saleRank: '',
	invitationNumber: '',
	invitationRank: '',
	tasksEquityList: [],
	goodsQuota: '',
	goodsQuotaRatio: '',
	taskContent: '',
	quotaId: ''
}

export default {
  name: 'ComplexTable',
  components: { Pagination },
  // directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
			stock: '',
			stock1: 0,
			page: 1,
			total: 0,
			quotaList: [],
			quotaList1: [{
					quotaId:null,
					goodsId: '',
					goodsName:'',
					quotaTotal:'',
					quotaRules:'',
					quotaSurplus: '',
					isDeleted:'',
					createTime:'',
					updateAdmin: '',
					updateDate:''
				}],
			tasks:{
				   taskId: '',
				   paifa: 0,
			   	taskName: '',
			   	taskType: '',
			   	taskMode: '',
			   	taskBeginTime: '',
			   	taskEndTime: '',
			   	goodsId: '',
			   	target: '',
			   	saleQuota: '',
			   	saleRank: '',
			   	invitationNumber: '',
			   	invitationRank: '',
			   	tasksEquityList: [],
			   	goodsQuota: '',
			   	goodsQuotaRatio: '',
			   	taskContent: '',
			   	quotaId: ''
			   },
			tasksEquityList: Object.assign({}, defaulttasksEquityList),
			task:[
				{
					equityList: [],
					quotaList: [],
					equityId:'',
					quotaId:'',
					value1: '',
					value2:''
				}
			],
			time:[],
			tasksList: [],
			equityList: [],
			equityId: '',
      total: 0,
      listLoading: true,
			quotaRules1:[{
          value: 0,
          label: '按数值分配'
        }, {
          value: 1,
          label: '按比例分配'
        }],
			options:[{
          value: 0,
          label: '销售商品'
        }, {
          value: 1,
          label: '邀请新用户'
		}],
		
		disPaifa:[{
          value: 0,
          label: '派发'
        }, {
          value: 1,
          label: '自主领取'
		}],
		
			value: '',
			options1:[{
			    value: 0,
			    label: '招募海选'
			  }, {
			    value: 1,
			    label: '见习考核'
			  },{
			    value: 2,
			    label: '正式考核'
			  },{
			    value: 3,
			    label: '勤工俭学'
			  }],
			options2:[{
			    value: 0,
			    label: '销售额'
			  }, {
			    value: 1,
			    label: '销售排名'
			  },{
			    value: 2,
			    label: '邀请用户数'
			  },{
			    value: 3,
			    label: '邀请排名'
			  }],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '工号降序', key: '+id' }, { label: '工号顺序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
			dialogFormVisible1: false,
			dialogFormVisible2: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        taskType: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
        taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
		taskMode: [{ required: true, message: '请输入任务所属模式', trigger: 'blur' }],
		target: [{ required: true, message: '请选择指标类型', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
		this.getTaskList()
		// this.getPattern()
    // this.getList()
  },
  methods: {
		add() {
			let obj={
				equityList:[],
				quotaList: [],
				equityId:'',
				quotaId:'',
				value1:'',
				value2:''
			}
			obj.equityList = this.equityList;
			obj.quotaList = this.quotaList;
			this.task.push(obj)
			console.log(this.task)
		},
		del() {
			if(this.task.length>1){
				this.task.pop();
			}
		},
		number(e){
			// alert(e.target.value);
			if(e.target.value != ""){
				let boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value);
				if(!boolean){
					alert("请输入正整数！！！")
					e.target.value = "";
				}
			}
		},
		async selectGoods(){
			// alert("商品id："+this.tasks.goodsId)
			if(this.tasks.goodsId != ""){
				let boolean = new RegExp("^[0-9]*$").test(this.tasks.goodsId);
				if(!boolean){
					alert("商品id中只能包含数字，不能有其他字符！！！")
					this.tasks.goodsId = "";
				}else{
					const res = await this.$http.get('/tasks/selectGoodsNameByGoodsId',{params:{goodsId: this.tasks.goodsId}})
					// console.log(res)
					if(res.data.code==801){
						
					}
					if(res.data.code==802){
						alert("没有对应的商品，请重新输入！！！");
						this.tasks.goodsId = "";
					}
				}
			}
		},
		async selectQuotaTotal(row){
			// alert("商品id输入框失去焦点事件！！！")
			this.stock ="";
			this.stock1 =0;
			const res = await this.$http.get('/tasks/selectGoodsStockByItemId',{params:{itemId: row.goodsId}})
			// console.log(res)
			if(res.data.code==801){
				this.stock = res.data.result;
				this.stock1 = res.data.result;
			}
			if(res.data.code==802){
				alert("没有对应的商品或商品库存为零，请重新输入！！！")
				row.goodsId="";
			}
			if(res.data.code==804){
				alert("没有对应的商品或商品库存为零，请重新输入！！！")
				row.goodsId="";
			}
			// if(this.stock == ""){
			// 	row.goodsId="";
			// }
			
		},
		async addQuota(row){
			//新增配额奖励
			if(row.goodsId === ""){
				alert("必须填写商品码！！！！");
				return false;
			}
			if(this.stock === ""){
				alert("商品总配额不能为空！！！！");
				return false;
			}else if(this.stock > this.stock1){
				alert("商品总配额不能大于商品库存(商品库存："+ this.stock1 +")，请重新输入!!!");
				this.stock = "";
				return false;
			}
			if(row.quotaRules === ""){
				alert("必须选择分配规则！！！！");
				return false;
			}
			
			row.quotaTotal = this.stock;
			row.quotaSurplus = this.stock;
			const res = await this.$http.post('/tasks/addQuota', row);
			// console.log(res)
			if(res.data.code==801){
				this.message = res.data.message
				alert(this.message)
				this.dialogFormVisible2 = false
				//初始化新增列
				this.stock="";
				this.quotaList1[0].goodsId ="";
				this.quotaList1[0].quotaTotal ="";
				this.quotaList1[0].quotaRules ="";
				this.quotaList1[0].quotaSurplus ="";
			}
			if(res.data.code==802){
				this.message = res.data.message
				alert(this.message)
			}
			if(res.data.code==803){
				this.message = res.data.message
				alert(this.message)
			}
			if(res.data.code==804){
				this.message = res.data.message
				alert(this.message)
			}
		},
		async deleteQuota(row){
			//删除配额奖励
			alert("删除配额奖励"+row.quotaId)
			this.$confirm('您确定要删除该配额奖励吗？', '提示', {
			  confirmButtonText: '删除',
			  cancelButtonText: '取消',
			  type: 'warning'
			})
			  .then(async() => {
					const res = await this.$http.get('/tasks/deleteQuotaById',{params:{quotaId: row.quotaId}})
					if(res.data.code==801){
						this.message = res.data.message
						alert(this.message)
						this.dialogFormVisible2 = false
					}
					if(res.data.code==802){
						this.message = res.data.message
						alert(this.message)
					}
			  })
			  .catch(err => { console.error(err) })
			
		},
		async getQuotaList(){
			const res = await this.$http.get('/tasks/selectQuotaAll')
			this.quotaList = res.data.result
			this.task[0].quotaList = res.data.result
			// alert(this.quotaList)
			// console.log(this.quotaList)
		},
		async getTaskList(){
			const res = await this.$http.get('/tasks/selectTasksAll',{params:{page: this.page}})
			if(res.data.code==801){
				this.tasksList = res.data.result.records
				this.total = res.data.result.total
			}
			
		},
		// async getPattern(){
		// 	const res = await this.$http.get('/pattern/getPatternAll')
		// 	if(res.data.code==801){
		// 		this.options1 = res.data.result.patternANDlevel
		// 	}
		// 	
		// },
		async getEquityList(){
			const res = await this.$http.get('/equity/getEquitys')
			this.equityList = res.data.result
			this.task[0].equityList = res.data.result
			console.log(res.data.result)
		},
		async resetDateForm1(){
			this.getEquityList()
			this.dialogStatus = 'create'
			this.getQuotaList()
			 
			//初始化数据
			this.value = "";
			this.tasks ={
				taskId: '',
				taskName: '',
				taskType: '',
				taskMode: '',
				taskBeginTime: '',
				taskEndTime: '',
				goodsId: '',
				target: '',
				saleQuota: '',
				saleRank: '',
				invitationNumber: '',
				invitationRank: '',
				tasksEquityList: [],
				goodsQuota: '',
				goodsQuotaRatio: '',
				taskContent: '',
				quotaId: ''
			}
			this.time = [];
			this.task = [
				{
					equityList: [],
					quotaList: [],
					equityId:'',
					quotaId:'',
					value1: '',
					value2:''
				}
			];
			// console.log(this.tasks)
		},
		
//     getList() {
//       this.listLoading = true
//       fetchList(this.listQuery).then(response => {
//         this.list = response.data.items
//         this.total = response.data.total
// 
//         // Just to simulate the time of the request
//         setTimeout(() => {
//           this.listLoading = false
//         }, 1.5 * 1000)
//       })
//     },
    async handleFilter() {
			//新增按钮
			this.dialogFormVisible =true
			this.resetDateForm1();
			this.$nextTick(()=>{
			   this.$refs.dataForm1.resetFields();
			 })
			
		
      // this.listQuery.page = 1
      // this.getList()
    },
    // handleModifyStatus(row, status) {
    //   this.$message({
    //     message: '操作Success',
    //     type: 'success'
    //   })
    //   row.status = status
    // },
    // sortChange(data) {
    //   const { prop, order } = data
    //   if (prop === 'id') {
    //     this.sortByID(order)
    //   }
    // },
    // sortByID(order) {
    //   if (order === 'ascending') {
    //     this.listQuery.sort = '+id'
    //   } else {
    //     this.listQuery.sort = '-id'
    //   }
    //   this.handleFilter()
    // },
    // resetTemp() {
    //   this.temp = {
    //     id: undefined,
    //     importance: 1,
    //     remark: '',
    //     timestamp: new Date(),
    //     title: '',
    //     status: 'published',
    //     type: ''
    //   }
    // },
    handleCreate() {
			// alert("配额奖励！！")
			this.dialogFormVisible2 = true
			this.getQuotaList().then(data=> {
				// console.log(this.quotaList)
				for(let index =0 ; index < this.quotaList.length;index++){
					if(this.quotaList.length + 1 == this.quotaList1.length){
						break;
					}
					let obj={
						quotaId: this.quotaList[index].quotaId,
						goodsId: this.quotaList[index].goodsId,
						goodsName: this.quotaList[index].goodsName,
						quotaTotal: this.quotaList[index].quotaTotal,
						quotaRules: this.quotaList[index].quotaRules,
						quotaSurplus: this.quotaList[index].quotaSurplus,
						isDeleted: this.quotaList[index].isDeleted,
						createTime: this.quotaList[index].createTime,
						updateAdmin: this.quotaList[index].updateAdmin,
						updateDate: this.quotaList[index].updateData
					}
					this.quotaList1.push(obj)
				}
				console.log(this.quotaList1)
			});
			// alert(this.task[0].quotaList)
			// console.log(this.task[0].quotaList)
			// alert(this.quotaList)
			
			// console.log(this.quotaList1)
      // this.resetTemp()
      // this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    createData() {
			 // alert("新增任务方法！")
			this.$refs['dataForm1'].validate((valid) => {
				if(valid){
					if(this.time != "" && this.time != null){
						this.tasks.taskBeginTime = this.time[0];
						this.tasks.taskEndTime = this.time[1];
					}else{
						alert("请选择时间范围！！！");
						return false;
					}
					if(this.tasks.taskType == 0){
						if(this.tasks.goodsId === null || this.tasks.goodsId ===""){
							alert("销售商品任务必须输入商品id！！！")
						}
					}else{
						this.tasks.goodsId = "";
					}
					if(this.value === "" || this.value === null){
						alert("请输入任务完成数！！！");
						return false;
					}
					const tasksData = {
						taskType: this.tasks.taskType,
						taskName: this.tasks.taskName,
						taskMode: this.tasks.taskMode,
						taskBeginTime: this.tasks.taskBeginTime,
						taskEndTime: this.tasks.taskEndTime,
						goodsId: this.tasks.goodsId,
						target: this.tasks.target,
						saleQuota: '',
						saleRank: '',
						invitationNumber: '',
						invitationRank: '',
						tasksEquityList: [],
						goodsQuota: '',
						goodsQuotaRatio: '',
						taskContent: this.tasks.taskContent,
						quotaId: ''
					}
					if(this.tasks.target == 0){
						tasksData.saleQuota = this.value;
					}else if(this.tasks.target == 1){
						tasksData.saleRank = this.value;
					}else if(this.tasks.target == 2){
						tasksData.invitationNumber = this.value;
					}else if(this.tasks.target == 3){
						tasksData.invitationRank = this.value;
					}
					for(let index = 0; index < this.task.length ; index++){
						let equityList1 = {
							equityId: '',
							amount: '',
							goodsQuota: '',
							target: '',
							saleQuota: '',
							saleRank: '',
							invitationNumber: '',
							invitationRank: '',
						}
						if(this.task[index].equityId === null || this.task[index].equityId === ""){
							alert("请选择奖励类型！！！");
							return false;
						}
						if(this.task[index].value1 === null || this.task[index].value1 === ""){
							alert("请输入奖励完成数！！！");
							return false;
						}
						if(this.task[index].value2 === null || this.task[index].value2 === ""){
							alert("请输入指标完成奖励数！！！");
							return false;
						}
						equityList1.equityId = this.task[index].equityId;
						equityList1.target = this.tasks.target;
						if(this.tasks.target == 0){
							equityList1.saleQuota = this.task[index].value1;
						}else if(this.tasks.target == 1){
							equityList1.saleRank = this.task[index].value1;
						}else if(this.tasks.target == 2){
							equityList1.invitationNumber = this.task[index].value1;
						}else if(this.tasks.target == 3){
							equityList1.invitationRank = this.task[index].value1;
						}
						if(equityList1.equityId == 4){
							tasksData.quotaId = this.task[index].quotaId;
						}else{
							equityList1.amount = this.task[index].value2;
						}
						tasksData.tasksEquityList.push(equityList1);
					}
					// console.log(this.task)
					// console.log(tasksData)
					this.$http.post('/tasks/addTasks', tasksData).then(async(data) =>{
						let res = await data
						// console.log(res)
						if(res.data.code==801){
							this.message = res.data.message
							alert(this.message)
							this.dialogFormVisible = false
							this.getTaskList();
						}
						if(res.data.code==802){
							this.message = res.data.message
							alert(this.message)
						}
					});
					
				}else{
					alert("验证未通过,请输入正确的信息！！！！");
					return false;
				}
			})
			
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      //     this.temp.author = 'vue-element-admin'
      //     createArticle(this.temp).then(() => {
      //       this.list.unshift(this.temp)
      //       this.dialogFormVisible = false
      //       this.$notify({
      //         title: 'Success',
      //         message: 'Created Successfully',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
    },

//      upload(){
// 
//               //点击跳转至上次浏览页面
//              // this.$router.go(-1)
// 
//               //指定跳转地址
//                this.$router.push({name: '/Pattern/pTable'})
// 
//             },

    handleUpdate(row) {
			//编辑按钮
			this.dialogFormVisible1 =true
			this.getEquityList()
			this.getQuotaList()
			this.tasks.taskId = row.taskId;
			this.tasks.taskType = row.taskType;
			this.tasks.taskName = row.taskName;
			this.tasks.taskMode = row.taskMode;
			this.tasks.levelType = row.levelType;
			this.tasks.taskBeginTime = row.taskBeginTime
			this.tasks.taskEndTime = row.taskEndTime
			this.tasks.goodsId = row.goodsId;
			this.tasks.target = row.target;
			
			if(this.tasks.target == 0){
				this.value = row.saleQuota;
			}else if(this.tasks.target == 1){
				this.value = row.saleRank;
			}else if(this.tasks.target == 2){
				this.value = row.invitationNumber;
			}else if(this.tasks.target == 3){
				this.value = row.invitationRank;
			}
			
			this.tasks.tasksEquityList = row.tasksEquityList;
			this.tasks.goodsQuota = row.goodsQuota;
			this.tasks.goodsQuotaRatio = row.goodsQuotaRatio;
			this.tasks.taskContent = row.taskContent;
			this.tasks.quotaId = row.quotaId;
			// console.log(this.tasks)
			const start = this.tasks.taskBeginTime
			const end = this.tasks.taskEndTime
			this.time = [start,end]
			
			for(let index = 0; index < this.tasks.tasksEquityList.length ; index++){
				if(this.task.length<this.tasks.tasksEquityList.length){
					this.add();
				}
				this.task[index].equityId = this.tasks.tasksEquityList[index].equityId;
				if(this.tasks.target == 0){
					this.task[index].value1 = this.tasks.tasksEquityList[index].saleQuota;
				}else if(this.tasks.target == 1){
					this.task[index].value1 = this.tasks.tasksEquityList[index].saleRank;
				}else if(this.tasks.target == 2){
					this.task[index].value1 = this.tasks.tasksEquityList[index].invitationNumber;
				}else if(this.tasks.target == 3){
					this.task[index].value1 = this.tasks.tasksEquityList[index].invitationRank;
				}
				if(this.task[index].equityId == 4){
					this.task[index].quotaId = this.tasks.quotaId;
				}else{
					this.task[index].value2 = this.tasks.tasksEquityList[index].amount;
				}
			}
			
			// this.time.push(this.tasks.taskBeginTime)
			// this.time.push(this.tasks.taskEndTime)
			// alert(this.time)
			
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    async updateData() {
			// alert("更新任务！！！")
			// console.log(this.tasks)
			this.$refs['dataForm2'].validate((valid) => {
				if(valid){
					if(this.time != "" && this.time != null){
						this.tasks.taskBeginTime = this.time[0];
						this.tasks.taskEndTime = this.time[1];
					}else{
						alert("请选择时间范围！！！");
						return false;
					}
					if(this.tasks.taskType == 0){
						if(this.tasks.goodsId === null || this.tasks.goodsId ===""){
							alert("销售商品任务必须输入商品id！！！")
						}
					}else{
						this.tasks.goodsId = "";
					}
					if(this.value === "" || this.value === null){
						alert("请输入任务完成数！！！");
						return false;
					}
					const tasksData = {
						taskId: this.tasks.taskId,
						taskType: this.tasks.taskType,
						taskName: this.tasks.taskName,
						taskMode: this.tasks.taskMode,
						taskBeginTime: this.tasks.taskBeginTime,
						taskEndTime: this.tasks.taskEndTime,
						goodsId: this.tasks.goodsId,
						target: this.tasks.target,
						saleQuota: '',
						saleRank: '',
						invitationNumber: '',
						invitationRank: '',
						tasksEquityList: [],
						goodsQuota: '',
						goodsQuotaRatio: '',
						taskContent: this.tasks.taskContent,
						quotaId: ''
					}
					
					if(this.tasks.target == 0){
						tasksData.saleQuota = this.value;
					}else if(this.tasks.target == 1){
						tasksData.saleRank = this.value
					}else if(this.tasks.target == 2){
						tasksData.invitationNumber = this.value
					}else if(this.tasks.target == 3){
						tasksData.invitationRank = this.value
					}
					for(let index = 0; index < this.task.length ; index++){
						let equityList1 = {
							equityId: '',
							amount: '',
							goodsQuota: '',
							target: '',
							saleQuota: '',
							saleRank: '',
							invitationNumber: '',
							invitationRank: '',
						}
						if(this.task[index].equityId === null || this.task[index].equityId === ""){
							alert("请选择奖励类型！！！");
							return false;
						}
						if(this.task[index].value1 === null || this.task[index].value1 === ""){
							alert("请输入奖励完成数！！！");
							return false;
						}
						if(this.task[index].value2 === null || this.task[index].value2 === ""){
							alert("请输入指标完成奖励数！！！");
							return false;
						}
						equityList1.equityId = this.task[index].equityId;
						equityList1.target = this.tasks.target;
						if(this.tasks.target == 0){
							equityList1.saleQuota = this.task[index].value1;
						}else if(this.tasks.target == 1){
							equityList1.saleRank = this.task[index].value1;
						}else if(this.tasks.target == 2){
							equityList1.invitationNumber = this.task[index].value1;
						}else if(this.tasks.target == 3){
							equityList1.invitationRank = this.task[index].value1;
						}
						if(equityList1.equityId == 4){
							tasksData.quotaId = this.task[index].quotaId;
						}else{
							equityList1.amount = this.task[index].value2;
						}
						tasksData.tasksEquityList.push(equityList1);
					}
					// console.log(tasksData)
					this.$http.post('/tasks/updateTasks', tasksData).then(async(data) =>{
						let res = await data
						// console.log(res)
						if(res.data.code==801){
							this.message = res.data.message
							alert(this.message)
							this.dialogFormVisible1 = false
							this.getTaskList();
						}
						if(res.data.code==802){
							this.message = res.data.message
							alert(this.message)
						}
					});
					
				}else{
					alert("验证未通过,请输入正确的信息！！！！");
					return false;
				}
			})
			
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     const tempData = Object.assign({}, this.temp)
      //     tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      //     updateArticle(tempData).then(() => {
      //       const index = this.list.findIndex(v => v.id === this.temp.id)
      //       this.list.splice(index, 1, this.temp)
      //       this.dialogFormVisible = false
      //       this.$notify({
      //         title: 'Success',
      //         message: 'Update Successfully',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
    },
    handleDelete(row, index) {
			// alert(row.taskId)
			this.$confirm('您确定要删除该任务吗？', '提示', {
			  confirmButtonText: '删除',
			  cancelButtonText: '取消',
			  type: 'warning'
			})
			  .then(async() => {
					const res = await this.$http.get('/tasks/deleteTasksById',{params:{taskId: row.taskId}})
					if(res.data.code==801){
						this.message = res.data.message
						alert(this.message)
						this.getTaskList();
					}
					if(res.data.code==802){
						this.message = res.data.message
						alert(this.message)
					}
			  })
			  .catch(err => { console.error(err) })
      // this.$notify({
      //   title: 'Success',
      //   message: 'Delete Successfully',
      //   type: 'success',
      //   duration: 2000
      // })
      // this.list.splice(index, 1)
    },
    // handleFetchPv(pv) {
    //   fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //     this.dialogPvVisible = true
    //   })
    // },
    // handleDownload() {
      // this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: 'table-list'
      //   })
      //   this.downloadLoading = false
      // })
    // },
    // formatJson(filterVal) {
    //   return this.list.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style scoped>
/deep/ .el-dialog {
	width: 650px;
}

</style>
