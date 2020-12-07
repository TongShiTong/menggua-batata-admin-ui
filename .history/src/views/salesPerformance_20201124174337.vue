<template>
  <div class="app-container">
    <!-- 搜索控件-->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-upload2" style="float:right" @click="downloadExcel">
        导出数据用户
      </el-button>

      <el-select v-model="queryInfo.userType" placeholder="选择模式" class="filter-item" clearable style="width: 120px;">
        <el-option v-for="item in wxUserTypeDate" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-input v-model="queryInfo.jobId" placeholder="搜索工号" style="width: 120px;" class="filter-item" clearable />
      <el-input v-model="queryInfo.userName" placeholder="搜索姓名" style="width: 120px;" class="filter-item" clearable />

      <el-select v-model="queryInfo.condition" placeholder="排序条件" style="width: 130px" class="filter-item" clearable>
        <el-option v-for="item in rankWhereDate" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-select v-model="queryInfo.rank" placeholder="排序方式" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in rangkDesc" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getSalesList">
        搜索
      </el-button>
    </div>

    <!-- 数据显示表格区域change-->
    <el-table :data="salesList" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="工号" prop="id" sortable align="center" min-width="80">
        <template slot-scope="{row}">
          <span>{{ row.jobId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前等级" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.level}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总排名" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.rank}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总销售额" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.sales}}</span>
        </template>
      </el-table-column>
      <el-table-column label="总订单数" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderQuantity }}</span>
        </template>
      </el-table-column>

      <el-table-column label="销售分润" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{row.salesFnrun}}</span>
        </template>
      </el-table-column>
      <el-table-column label="活跃客户数" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{row.activeCust}}</span>
        </template></el-table-column>
      <el-table-column label="活跃客户数占比" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{(Math.floor(row.activeAcct * 100) / 100) * 100}}%</span>
        </template></el-table-column>
      <el-table-column label="邀请新用户" min-width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{row.inviteUser}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后操作用户/时间" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.updateAdmin}}</span>/
          <span>{{row.updateTime}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" min-width="80px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="small" type="success" @click="getSales(row.id)">
            详情
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

    <!-- 用户详情对话弹框 -->
    <el-dialog title="模式名称+业绩详情" :model="sales" :visible.sync="yjiVisible" width="60%">
      <!-- 详情页头部-->
      <div class="filter-container" style="display: flex;align-items: center;">
        <!-- <el-image style="width: 50px; height: 50px"></el-image> -->
        <img :src="sales.avatarUrl" style="width: 50px; height: 50px;margin-right:10px;object-fit: cover;">
        <span style="font-size: medium; margin-right:10px">{{sales.userName}}</span>
        <span style="margin-right:10px">{{sales.jobId}}</span>
        <span>{{sales.level}}</span>
        <!-- <el-button class="filter-item" type="primary" icon="el-icon-upload2" style="float:right;margin-right: 20px;"
          @click="downloadExcel">
          导出数据
        </el-button> -->
      </div>

      <el-table :data="salesDate" style="width: 100%;">
        <el-table-column label="业绩名称" min-width="100px" align="center">
          <template>
            <span>用户运营业绩</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="邀请新用户" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.inviteUser}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="新用户数量" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.inviteUser}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="新客户数量" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.inviteUser}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="活跃客户数量" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.activeCust}}</span>
          </template>
        </el-table-column>
        <el-table-column label="活跃客户数量占比" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{(Math.floor(row.activeAcct * 100) / 100) * 100}}%</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="活跃客户数量占比" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.inviteUser}}</span>
          </template>
        </el-table-column> -->
      </el-table>
      <br />
      <el-table :data="salesDate[0].salesItemVOS" style="width: 100%;">
        <el-table-column label="业绩名称" min-width="100px" align="center">
          <template>
            <span>商品销售业绩</span>
          </template>
        </el-table-column>
        <el-table-column label="商品ID" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.itemId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.valueNames}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售额" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.sales}}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单数" min-width="60px" align="center">
          <template slot-scope="{row}">
            <span>{{row.orderNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售分润" min-width="90px" align="center">
          <template slot-scope="{row}">
            <span>{{row.saleProfit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售排名" min-width="80px" align="center">
          <template slot-scope="{row}">
            <span>{{row.saleRank}}</span>
          </template>
        </el-table-column>
      </el-table>


      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="yjiVisible = false">
          退出
        </el-button>
      </div> -->
    </el-dialog>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  export default {

    //当前组件的私有数据value
    data() {
      return {
        rankWhereDate: [{
            value: 0,
            label: '按照默认排序'
          },
          {
            value: 1,
            label: '总排名'
          },
          {
            value: 2,
            label: '销售额'
          },
          {
            value: 3,
            label: '订单数'
          },
          {
            value: 4,
            label: '销售分润'
          },
          {
            value: 5,
            label: '活跃客户'
          },
          {
            value: 6,
            label: '活跃客户占比'
          },
          {
            value: 7,
            label: '新用户数'
          }
        ],

        wxUserTypeDate: [
          // {
          //   value: 0,
          //   label: '招募海选'
          // },
          {
            value: 1,
            label: '见习考核'
          },
          {
            value: 2,
            label: '正式考核'
          },
          {
            value: 3,
            label: '勤工俭学'
          }
        ],
        rangkDesc: [{
            value: 2,
            label: '升序'
          },
          {
            value: 1,
            label: '降序'
          }
        ],

        //获取用户列表的参数对象
        queryInfo: {
          rank: '',
          condition: '',
          size: '',
          current: 1,
          jobId: '',
          userName: '',
          userType: ''
        },
        salesList: [],
        total: 0,
        yjiVisible: false,
        sales: {
          jobId: '',
          userName: '',
          userType: '',
          level: '',
          sales: '',
          orderQuantity: '',
          salesFnrun: '',
          activeCust: '',
          activeAcct: '',
          InviteUser: ''
        },
        salesDate: [{}]



      }
    },
    //Vue生命周期函数
    created() {
      this.addSalesPreFormance()
      // this.autoGrade()
      this.getSalesList()
    },

    //事件处理函数
    methods: {
      /* 查询大团长用户信息*/
      async getSalesList() {
        const {
          data: res
        } = await this.$http.get('/sales/searchSales', {
          params: this.queryInfo
        })
        if (res.code == "802") {
          return this.$message.warning('没有匹配的用户信息！')
        }
        if (res.code !== "801") {
          return this.$message.error('获取大团长用户信息失败！')
        }

        this.salesList = res.result.sales.records
        this.total = res.result.sales.total
      },

      async getSales(userId) {
        // console.log(userId)
        // const {
        //   data: res
        // } = await this.$http.get('/sales/getSalesByUserId', {
        //   params: {
        //     userId
        //   }
        // })
        const {
          data: res
        } = await this.$http.get('/sales/getSalesById', {
          params: {
            id: userId
          }
        })

        if (res.code !== "801") {
          return this.$message.error('获取大团长业绩详情失败！')
        }
        this.sales = res.result
        for (const i in this.sales) {
          this.$set(this.salesDate[0], i, this.sales[i])
        }
        this.yjiVisible = true

      },


      /* 更新业绩表数据*/
      async addSalesPreFormance() {
        const {
          data: res
        } = await this.$http.get('/sales/addSalesPreFormance')
        if (res.code == "8001") {
          this.getSalesList()
          return this.$message.success('当前业绩信息为最新，请放心使用！')
        }
        if (res.code !== "8001") {
          return this.$message.error('业绩信息更新异常，请重试！')
        }
      },

      /* 自动升级*/
      async autoGrade() {
        const {
          data: res
        } = await this.$http.get('/level/autoGrade')
        if (res.code == "801") {
          this.getSalesList()
          return this.$message.success('自动升级成功！')
        }
        if (res.code !== "801") {
          return this.$message.error('自动升级失败,请重试！')
        }
      },
      /* 监听排序方式条件变化*/
      chooseWhere(e) {
        console.log(e)
        for (let i = 0; i < this.rangkDesc.length; i++) {
          if (this.rangkDesc[i] == e) {
            this.rangkDescIndex = i;
          }
        }
      },

      //监听排序条件
      rankWhere(e) {
        console.log(e)
        for (let i = 0; i < this.rankWhereDate.length; i++) {
          if (this.rankWhereDate[i] == e) {
            this.rankWhereDateIndex = i;
            console.log(this.rankWhereDateIndex)
          }
        }
      },

      //监听Pagesize改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.size = newSize
        this.getSalesList()
      },
      //监听当前页面的改变
      handleCurrentChange(newPage) {
        this.queryInfo.current = newPage
        this.getSalesList()
      },


      //列表下载
      downloadExcel() {
        this.$confirm('确定导下列大团长业绩数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.excelData = this.salesList //你要导出的数据list。
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
          let tHeader = ['工号', '姓名', '当前等级', '总排名', '总销售额', '总订单数', '销售分润', '活跃用户数', '活跃用户数占比', '邀请新用户'];
          //表头对应字段名，要和下面数据key对应
          let filterVal = ['jobId', 'userName', 'level', 'rank', 'sales', 'orderQuantity', 'salesFnrun',
            'activeAcct', 'activeCust', 'inviteUser'
          ];
          // 数据来源
          let list = this.excelData;

          let data = this.formatJson(filterVal, list); //数据格式化
          var index1 = '大团长业绩详情'; //导出时文件名
          exportJsonToExcel(tHeader, data, index1); //导出文件
        })
      },
      // 数据格式化
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }

    }
  }
</script>
<style scoped>
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
</style>
