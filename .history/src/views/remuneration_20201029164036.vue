<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker class="filter-item" value-format="yyyy-MM" v-model="month" type="month" placeholder="选择月份" @change="chooseData"></el-date-picker>
      <el-input v-model="condition" placeholder="搜索工号/姓名" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">
        搜索
      </el-button>
			<el-button disabled class="filter-item" type="primary" icon="el-icon-upload2">
			  导出收款信息
			</el-button>
      <el-button class="filter-item" disabled style="margin-left: 10px;" type="primary" icon="el-icon-upload2">
        导出薪酬数据
      </el-button>

    </div>
<!-- v-loading="listLoading" el-table加载属性-->
    <el-table
      :key="tableKey"
      :data="remunerationList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="工号" prop="id" sortable="custom" align="center" min-width="80px" :class-name="getSortClass('id')">
        <template slot-scope="scope">
          <span>{{ scope.row.jobId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="150px">
        <template slot-scope="scope">
					<span>{{ scope.row.userName }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="底薪" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.baseSalary }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖金" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bonus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.commission }}</span>
        </template>
      </el-table-column>
		<el-table-column label="合计应发" min-width="100px" align="center">
			<template slot-scope="scope">
			<span>{{ scope.row.totalPay }}</span>
			</template>
		</el-table-column>
		<el-table-column label="实际已发" min-width="100px" align="center">
			<template slot-scope="scope">
			<span>{{ scope.row.actualPay }}</span>
			</template>
		</el-table-column>
		<el-table-column label="备注" min-width="150px" align="center">
			<template slot-scope="scope">
			<span>{{ scope.row.remarks }}</span>
			</template>
		</el-table-column>
		<el-table-column label="最后操作" min-width="260px" align="center">
			<template slot-scope="scope">
			<span>{{ scope.row.updateDate }}</span>
				<span>{{ scope.row.updateAdmin }}</span>
			</template>
		</el-table-column>
      <el-table-column label="操作" align="center" min-width="220px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
					<el-button type="primary" size="small"  @click="getBankInfo(scope.row)">收款信息</el-button>
					<el-button type="success" size="small" @click="examine(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
		
		<div align="right" style="margin: 20px;">
			<el-pagination @current-change="getRemunerationList" :page-size="10"  :current-page.sync ="page"  layout=" total,prev, pager, next ,jumper" :total="this.total">
			</el-pagination>
		</div>
    

    <el-dialog :title="'用户收款信息'" :visible.sync="dialogFormVisible">
        <el-table :key="tableKey" :data="bankInfo" stripe highlight-current-row style="width: 100%">
          <el-table-column  label="姓名" min-width="100" align="center">
        		<template slot-scope="scope">
        			<span >{{scope.row.userName}}</span>
        		</template>
          </el-table-column>
        	<el-table-column  label="手机号" width="200" align="center">
        		<template slot-scope="scope">
        			<span >{{scope.row.phone}}</span>
        		</template>
        	</el-table-column>
					<el-table-column  label="收款账号" width="200" align="center">
						<template slot-scope="scope">
							<span >{{scope.row.bankAccount}}</span>
						</template>
					</el-table-column>
					<el-table-column  label="收款银行" width="200" align="center">
						<template slot-scope="scope">
							<span >{{scope.row.receivingBank}}</span>
						</template>
					</el-table-column>
					<el-table-column  label="开户行" width="200" align="center">
						<template slot-scope="scope">
							<span >{{scope.row.bankName}}</span>
						</template>
					</el-table-column>
        </el-table>
    </el-dialog>
		
		<!-- 薪酬详情 -->
		<el-dialog :title="month+'月薪酬详情'" :visible.sync="dialogFormVisible2">
			<!-- 本月薪酬 -->
			<el-table :show-header="false" :key="tableKey" :data="remuneration"  stripe highlight-current-row style="width: 100%">
			  <el-table-column  label="头像" width="100" >
					<template>
						<span >用户信息：</span>
					</template>
			  </el-table-column>
				<el-table-column  label="姓名" min-width="80px" align="center" >
					<template slot-scope="scope">
						<span >{{scope.row.userName}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="工号" min-width="80px" align="center" >
					<template slot-scope="scope">
						<span >工号:{{scope.row.jobId}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="底薪" min-width="80px" align="center" >
					<template slot-scope="scope">
						<span >底薪:{{scope.row.baseSalary}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="奖金" min-width="80px" align="center" >
					<template slot-scope="scope">
						<span >奖金:{{scope.row.bonus}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="佣金" min-width="80px" align="center" >
					<template slot-scope="scope">
						<span >佣金:{{scope.row.commission}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="操作" min-width="100px" align="center" >
					<template>
							<el-button class="filter-item" disabled style="margin-left: 10px;" type="primary" icon="el-icon-upload2">
							  导出数据
							</el-button>
					  </template>
				</el-table-column>
				
			</el-table>
			<!-- 本月底薪 -->
			<el-table :key="tableKey" :data="remuneration" stripe highlight-current-row style="width: 100%">
			  <el-table-column  label="本月底薪" min-width="100" >
					<template>
						<span >{{month}}月底薪</span>
					</template>
			  </el-table-column>
				<el-table-column  label="金额" width="100" align="center">
					<template slot-scope="scope">
						<span >{{scope.row.baseSalary}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="操作" width="100" align="center">
					<template>
							<el-button  type="success" size="small" disabled>审核</el-button>
					  </template>
				</el-table-column>
				
			</el-table>
			
			<!-- 本月奖金 -->
			<el-table :data="bonusList" stripe highlight-current-row style="width: 100%">
			  <el-table-column   label="本月奖金" min-width="100">
					<template slot-scope="scope">
						<span >{{scope.row.equityName}}</span>
					</template>
			  </el-table-column>
			  <el-table-column  label="规则明细" width="500" align="center">
					<template slot-scope="scope">
						<span >{{scope.row.taskContent}}</span>
					</template>
			  </el-table-column>
				<el-table-column  label="达标情况" width="100" align="center">
					<template>
						<span >已达标</span>
					</template>
				</el-table-column>
				<el-table-column  label="金额" width="100" align="center">
					<template slot-scope="scope">
						<span >{{scope.row.amount}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="操作" width="100" align="center">
					<template>
							<el-button  type="success" size="small" disabled >审核</el-button>
					  </template>
				</el-table-column>
				
			</el-table>
			
			<!-- 本月销售薪酬 -->
			<el-table :data="commissionList" stripe highlight-current-row style="width: 100%">
			  <el-table-column   label="本月商品销售薪酬" min-width="100">
			  	<template slot-scope="scope">
			  		<span >{{scope.row.goodsId}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span >{{scope.row.spuName}}</span>
						<!-- <span >{{row.skuInfo}}</span> -->
			  	</template>
			  </el-table-column>
			  <el-table-column  label="销售额" width="100" align="center">
			  	<template slot-scope="scope">
			  		<span >{{scope.row.skuPrice}}</span>
			  	</template>
			  </el-table-column>
			  <el-table-column  label="分润比例" width="100" align="center">
			  	<template slot-scope="scope">
			  		<span >{{scope.row.proportion}}</span>
			  	</template>
			  </el-table-column>
			  <el-table-column  label="销售分润" width="100" align="center">
			  	<template slot-scope="scope">
			  		<span >{{scope.row.profit}}</span>
			  	</template>
			  </el-table-column>
			  <el-table-column  label="操作" width="100" align="center">
			  	<template >
			  			<el-button  type="success" size="small" disabled>审核</el-button>
			  	  </template>
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
		remuneration:[],
		bankInfo:[],
		remunerationList:[],
		bonusList:[],
		commissionList:[],
      	total: 0,
		condition:'',
		month:'2020-01',
		page: 1,
		pages: 1,
      	listLoading: true,
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
			dialogFormVisible2: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
		this.addRemunerationBatch()
		this.getRemunerationList()
		// 获取当前月
		var myDate = new Date();
		var tYear = myDate.getFullYear();
		var tMonth = myDate.getMonth();
	
		var m = tMonth + 1;
		if (m.toString().length == 1) {
			m = "0" + m;
		}
		this.month = tYear+'-'+m
    // this.getList()
  },
  methods: {
	//   选择时间
	  chooseData(e) {
		  this.month = e
	  },
		async addRemunerationBatch(){
			const res = await this.$http.get('/Remuneration/addRemunerationBatch')
		},
		async getRemunerationList(){
			// alert(this.page)
			// let nowDate = new Date();
			// let date = {
			// 	year: nowDate.getFullYear(),
			// 	month: nowDate.getMonth() + 1,
			// }
			// this.month = date.year + '-' + 0 + date.month;
			const res = await this.$http.get('/Remuneration/selectAllRemuneration',{params:{condition: this.condition,page: this.page,month: this.month}})
			console.log(res)
			if(res.data.code==801){
				this.remunerationList = res.data.result.records;
				// this.pages = res.data.result.pages
				this.total = res.data.result.total
			}
			if(res.data.code==802){
				this.total = 0
			}
		},
		async search(){
			// alert("搜索"+this.month+this.condition)
			if(this.month == null){
				let nowDate = new Date();
				let date = {
				  year: nowDate.getFullYear(),
				  month: nowDate.getMonth() + 1,
				}
				this.month = date.year + '-' + 0 + date.month;
			}
			const res = await this.$http.get('/Remuneration/selectAllRemuneration',{params:{condition: this.condition,page: 1,month: this.month}})
			console.log(res)
			if(res.data.code==801){
				this.remunerationList = res.data.result.records;
				this.total = res.data.result.total
				// this.pages = res.data.result.pages
			}
			if(res.data.code==802){
				this.remunerationList = "";
				this.total = 0
			}
		},
		async getBankInfo(row){
			// alert("这里是收款信息！！"+ row.jobId)
			this.dialogFormVisible = true;
			//查询员工收款信息
			const res = await this.$http.get('/Remuneration/selectBankInfoByJobId',{params:{jobId: row.jobId}})
			console.log(res)
			if(res.data.code==801){
				let bankInfo1 = [{
					bankinfoId:res.data.result.bankinfoId,
					jobId: res.data.result.jobId,
					userName:res.data.result.userName,
					phone:res.data.result.phone,
					identityCode:res.data.result.identityCode,
					bankAccount:res.data.result.bankAccount,
					receivingBank: res.data.result.receivingBank,
					bankName:res.data.result.bankName,
					isDeleted:res.data.result.isDeleted
				}];
				this.bankInfo = bankInfo1;
				
			}
			if(res.data.code==802){
				this.bankInfo = [];
			}
		},
		async examine(row){
			console.log(11122,row)
			console.log(33344,this.remuneration)
			this.remuneration = []
			// alert("这里是审核！！！" + row.jobId)
			this.dialogFormVisible2 = true
			//赋值
			let data = JSON.parse(JSON.stringify(row))
			this.remuneration[0] = data;

			// this.remuneration[0].jobId = row.jobId;
			// this.remuneration[0].userName = row.userName;
			// this.remuneration[0].baseSalary = row.baseSalary;
			// this.remuneration[0].bonus = row.bonus;
			// this.remuneration[0].commission = row.commission;
			// this.remuneration[0].totalPay = row.totalPay;
			// this.remuneration[0].actualPay = row.actualPay;
			// this.remuneration[0].remarks = row.remarks;
			// this.remuneration[0].isDeleted = row.isDeleted;
			// this.remuneration[0].createTime = row.createTime;
			// this.remuneration[0].updateAdmin = row.updateAdmin;
			// this.remuneration[0].updateDate = row.updateDate;
			// this.remuneration[0].month = this.month;
			//根据员工号查询员工奖金明细
			const res = await this.$http.get('/Remuneration/selectBonusDetailsByJobId',{params:{jobId: row.jobId}})
			console.log(res)
			if(res.data.code==801){
				this.bonusList = res.data.result;
			}
			if(res.data.code==802){
				// this.remunerationList = "";
			}
			//根据员工号查询员工销售佣金明细
			const res1 = await this.$http.get('/Remuneration/selectGoodsVOByJobId',{params:{jobId: row.jobId}})
			console.log(res1)
			if(res1.data.code==801){
				this.commissionList = res1.data.result;
			}
			if(res.data.code==802){
				// this.remunerationList = "";
			}
			// console.log(row)
			// console.log(this.)
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
    handleFilter() {
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
    // handleCreate() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    createData() {
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
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    updateData() {
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
    handleDownload() {
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
    },
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
