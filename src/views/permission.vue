<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增管理员</el-button>

    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column type="index" align="center" label="序号" width="60">
        <!-- <template slot-scope="scope">
          {{ scope.row.userId }}
        </template> -->
      </el-table-column>
      <el-table-column align="center" label="账号" width="150">
        <template slot-scope="scope">
           {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="登录限制">
        <template slot-scope="scope">
					<span v-if="scope.row.ipType == 0">[仅限内网]</br></span>
					<span v-else-if="scope.row.ipType == 1">[指定ip]&nbsp;&nbsp;[{{ scope.row.iplimit }}]</br></span>
					<span v-else-if="scope.row.ipType == 2">[无限制]</br></span>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="权限">
        <template slot-scope="scope">
			<span style="padding-right: 5px; width: 300px;" v-for="(item,index) in scope.row.permission" :key="index">
				{{ item.permName }}
			</span>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="最后操作">
        <template slot-scope="scope">
					{{ scope.row.lastOperationTime }}
          {{ scope.row.lastOperationAccount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作"  width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

		<!-- 编辑显示窗 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'新增管理员'">
      <el-form :model="user" :rules="rules" ref="userForm" label-width="80px" label-position="left">
        <el-form-item label="账号" prop="account">
          <el-input v-model="user.account" disabled placeholder="管理员账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
        </el-form-item>
        <!-- <el-form-item label="登陆限制">
          <el-select v-model="value" placeholder="选择登录限制方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item> -->
				<el-form-item label="登录限制" prop="ipType">
				  <el-select v-model="user.ipType" placeholder="请选择登录限制类型">
				  	<el-option
				  		v-for="item in options"
				  		:key="item.value"
				  		:label="item.label"
				  		:value="item.value">
				  	</el-option>
				  </el-select>
				</el-form-item>
        <el-form-item label="指定IP" v-if="user.ipType == 1" prop="iplimit">
          <el-input v-model="user.iplimit" placeholder="请指定登录限制IP,多个IP用逗号分隔" />
        </el-form-item>

        <el-form-item v-model="permissionList" label="权限设置">
			<el-transfer  :titles="['可选权限', '已选权限']" v-model="value" :data="permissionData"></el-transfer>
			<!-- <el-checkbox v-for="(item,index) in permissionList" v-model="user.permission[index]" true-label="true" false-label="false"  border>{{item.permName}}</el-checkbox> -->
					
        </el-form-item>

      <!--  <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">提交</el-button>
      </div>
    </el-dialog>
		
		<!-- 新增显示窗 -->
		<el-dialog :visible.sync="dialogVisible1" :title="dialogType==='edit'?'编辑用户':'新增管理员'">
		  <el-form :model="this.user" :rules="rules" ref="userForm"  label-width="80px" label-position="left">
		    <el-form-item label="账号" prop="account">
		      <el-input v-model="user.account" placeholder="管理员账号" />
		    </el-form-item>
		    <el-form-item label="密码" prop="password">
		      <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
		    </el-form-item>
		    <!-- <el-form-item label="登陆限制">
		      <el-select v-model="value" placeholder="选择登录限制方式">
		          <el-option
		            v-for="item in options"
		            :key="item.value"
		            :label="item.label"
		            :value="item.value">
		          </el-option>
		        </el-select>
		    </el-form-item> -->
		    <el-form-item label="登录限制" prop="ipType">
		      <el-select v-model="user.ipType" placeholder="请选择登录限制类型">
		      	<el-option
		      		v-for="item in options"
		      		:key="item.value"
		      		:label="item.label"
		      		:value="item.value">
		      	</el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="指定IP" v-if="user.ipType == 1" prop="iplimit">
		      <el-input v-model="user.iplimit" placeholder="请指定登录限制IP,多个IP用逗号分隔" />
		    </el-form-item>
		
		    <el-form-item v-model="permissionList" label="权限设置">
					<el-transfer :titles="['可选权限', '已选权限']" v-model="value" :data="permissionData"></el-transfer>
					<!-- <el-checkbox v-for="(item,index) in permissionList" v-model="user.permission[index]" true-label="true" false-label="false"  border>{{item.permName}}</el-checkbox> -->
					
		    </el-form-item>
		
		  <!--  <el-form-item label="Menus">
		      <el-tree
		        ref="tree"
		        :check-strictly="checkStrictly"
		        :data="routesData"
		        :props="defaultProps"
		        show-checkbox
		        node-key="path"
		        class="permission-tree"
		      />
		    </el-form-item> -->
		  </el-form>
		  <div style="text-align:right;">
		    <el-button type="danger" @click="dialogVisible1=false">取消</el-button>
		    <el-button type="primary" @click="confirmRole">提交</el-button>
		  </div>
		</el-dialog>
		
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
// import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

const defaultUser = {
  userId: '',
  account: '',
	password: '',
	ipType: '',
	iplimit: '',
	permission: [],
	createTime: '',
	lastOperationTime: '',
	lastOperationAccount: '',
  routes: []
}

export default {
  data() {
    return {
      // role: Object.assign({}, defaultRole),
      // routes: [],
      // rolesList: [],
			user: Object.assign({}, defaultUser),
			userList: [],
			value:[],
			permissionList:[],
			permissionData:[],
			permissionList1:[],
			options:[{
			    value: 0,
			    label: '仅限内网'
			  }, {
			    value: 1,
			    label: '指定IP'
			  },{
			    value: 2,
			    label: '无限制'
			  }],
			rules: {
				account: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6,  message: '密码最少6个字符', trigger: 'blur' }	
				],
				iplimit: [{ required: true, message: '请输入ip限制', trigger: 'blur' }],
				ipType: [{ required: true, message: '请选择登录限制类型', trigger: 'change' }]
			},
			message: [],
      dialogVisible: false,
			dialogVisible1: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
		this.getUsers()
    // this.getRoutes()
    // this.getRoles()
  },
  methods: {
    // async getRoutes() {
    //   const res = await getRoutes()
    //   this.serviceRoutes = res.data
    //   this.routes = this.generateRoutes(res.data)
    // },
    // async getRoles() {
    //   const res = await getRoles()
    //   this.rolesList = res.data
    // },
		async getUsers() {
			const res = await this.$http.get('/Permission/selectUserAll')
			this.userList = res.data.result
			// console.log(res.data.result)
		},
		async getPermissions() {
			this.value = [];
			const res = await this.$http.get('/Permission/selectAllPermission')
			if(res.data.code == 801){
				this.user =Object.assign({}, defaultUser)
				this.value = [];
				this.permissionData = [];
				this.permissionList = res.data.result
				for(let index = 0 ; index < this.permissionList.length ; index++){
					this.permissionData.push({
						key: this.permissionList[index].permId,
						label: this.permissionList[index].permId +" "+ this.permissionList[index].permName,
						disabled: false
						
					});
				}
			}
		},
		async getPermissions1(perm) {
			// alert("权限长度"+ perm.length);
			//初始化
			// this.value = [];
			// alert(this.value);
			const res = await this.$http.get('/Permission/selectAllPermission')
			if(res.data.code == 801){
				this.value = [];
				this.permissionData = [];
				this.permissionList = res.data.result
				for(let index = 0 ; index < this.permissionList.length ; index++){
					this.permissionData.push({
						key: this.permissionList[index].permId,
						label: this.permissionList[index].permId +" "+ this.permissionList[index].permName,
						disabled: false
						
					});
					for(let i=0 ; i<perm.length; i++){
						if(this.permissionList[index].permId == perm[i].permId){
							this.value.push(this.permissionList[index].permId);
						}
					}
				}
			}
		},

    // Reshape the routes structure so that it looks the same as the sidebar
//     generateRoutes(routes, basePath = '/') {
//       const res = []
// 
//       for (let route of routes) {
//         // skip some route
//         if (route.hidden) { continue }
// 
//         const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
// 
//         if (route.children && onlyOneShowingChild && !route.alwaysShow) {
//           route = onlyOneShowingChild
//         }
// 
//         const data = {
//           path: path.resolve(basePath, route.path),
//           title: route.meta && route.meta.title
// 
//         }
// 
//         // recursive child routes
//         if (route.children) {
//           data.children = this.generateRoutes(route.children, data.path)
//         }
//         res.push(data)
//       }
//       return res
//     },
    // generateArr(routes) {
    //   let data = []
    //   routes.forEach(route => {
    //     data.push(route)
    //     if (route.children) {
    //       const temp = this.generateArr(route.children)
    //       if (temp.length > 0) {
    //         data = [...data, ...temp]
    //       }
    //     }
    //   })
    //   return data
    // },
	async resetUser(){
		//重置user
		this.user.ipType = '';
		this.user.userId= '';
		this.user.account= '';
		this.user.password= '';
		this.user.ipType= '';
		this.user.iplimit= '';
		this.user.permission= [];
		this.user.createTime= '';
		this.user.lastOperationTime= '';
		this.user.lastOperationAccount= '';
		this.user.routes= [];
	},
    handleAddRole() {
      // this.role = Object.assign({}, defaultRole)
		this.resetUser();
		this.getPermissions();
		this.$nextTick(()=>{
			this.$refs.userForm.resetFields();
       })
      this.dialogType = 'new'
      this.dialogVisible1 = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.user = deepClone(scope.row)
			this.user.permission=[]
      this.$nextTick(() => {
				this.getPermissions1(scope.row.permission);
        this.checkStrictly = false
				this.value = []
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('您确定要抛弃该用户吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
					const res = await this.$http.get('/Permission/deleteAdmin',{params:{userId: row.userId}})
					if(res.data.code==801){
						this.message = res.data.message
						alert(this.message)
						this.getUsers();
					}
					if(res.data.code==802){
						this.message = res.data.message
						alert(this.message)
					}
        })
        .catch(err => { console.error(err) })
    },
//     generateTree(routes, basePath = '/', checkedKeys) {
//       const res = []
// 
//       for (const route of routes) {
//         const routePath = path.resolve(basePath, route.path)
// 
//         // recursive child routes
//         if (route.children) {
//           route.children = this.generateTree(route.children, routePath, checkedKeys)
//         }
// 
//         if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
//           res.push(route)
//         }
//       }
//       return res
//     },
    async confirmRole() {
			this.$refs['userForm'].validate((valid) => {
				if(valid){
					
					//用户名字母开头，允许5-16字节，允许字母数字下划线
					let reg1 = /^[a-zA-Z]+$/
					let reg2 = /^[a-zA-Z0-9_]+$/
					if(!reg1.test(this.user.account.substr(0,1)) || !reg2.test(this.user.account)){
						alert("用户名必须由字母开头，不允许输入字母数字下划线以外的字符!")
						return false;
					}
					
					//密码只能包含字母数字
					let reg = /^[0-9a-zA-Z]+$/
					if(!reg.test(this.user.password)){
						alert("密码只能由字母和数字组成！")
						return false;
					}
					
					const isEdit = this.dialogType === 'edit'
					this.permissionList1 =[];
					// console.log(this.user.permission.length)
					for(let i=0 ; i <this.value.length ; i++){
						for(let j=0 ; j <this.permissionList.length ; j++){
							if(this.value[i] == this.permissionList[j].permId){
								this.permissionList1.push(this.permissionList[j])
							}
						}
					}
					if (isEdit) {
						const userData = {
							userId: this.user.userId,
							account: this.user.account,
							password: this.user.password,
							ipType: this.user.ipType,
							iplimit: this.user.iplimit,
							permission: this.permissionList1
						}
						// console.log(this.value)
						// console.log(this.user)
						// console.log(userData)
						this.$http.post('/Permission/updateAdmin', userData).then(async(data) =>{
							let res = await data
							// console.log(res)
							if(res.data.code==801){
								this.message = res.data.message
								alert(this.message)
								this.dialogVisible = false
								this.value = []
								this.getUsers();
							}
							if(res.data.code==802){
								this.message = res.data.message
								alert(this.message)
							}
						});
						
					} else {
					
						// alert("这里是新增！！！"+this.value.length)
						const userData = {
							account: this.user.account,
							password: this.user.password,
							ipType: this.user.ipType,
							iplimit: this.user.iplimit,
							permission: this.permissionList1
						}
						// console.log(userData)
						this.$http.post('/Permission/addAdmin', userData).then(async(data) =>{
							let res = await data
							// console.log(res)
							if(res.data.code==801){
								this.message = res.data.message
								alert(this.message)
								this.dialogVisible1 = false
								this.value = []
								this.getUsers();
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
						});
					}
				}else{
					alert("验证未通过,请输入正确的信息！！！！");
					return false;
				}
			})
      
    }//,
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
//     onlyOneShowingChild(children = [], parent) {
//       let onlyOneChild = null
//       const showingChildren = children.filter(item => !item.hidden)
// 
//       // When there is only one child route, the child route is displayed by default
//       if (showingChildren.length === 1) {
//         onlyOneChild = showingChildren[0]
//         onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
//         return onlyOneChild
//       }
// 
//       // Show parent if there are no child route to display
//       if (showingChildren.length === 0) {
//         onlyOneChild = { ... parent, path: '', noShowingChildren: true }
//         return onlyOneChild
//       }
// 
//       return false
//     }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>

