<template>
  <div class="basics-box">
    <el-card class="box-card">
      <div class="todo-box">
        <div>
          <!-- <div class="title-desc">利润默认分配比例</div> -->
          <div class="draw">
            <span>利润默认分配比例：</span>
            <span
              >商品佣金<input
                type="text"
                placeholder="0"
                v-model="input1"
                @input="upInput1"
              />%</span
            >
            <span
              >区域分红<input
                type="text"
                placeholder="0"
                v-model="input2"
                @input="upInput2"
              />%</span
            >
            <span
              >平台剩余<input
                type="text"
                placeholder="0"
                v-model="input3"
                @input="upInput3"
              />%</span
            >
          </div>
          <div class="notes">注：区域分红无归属对象时，归平台所有。</div>
        </div>
        <!-- <div class="add-btn">
          <el-button type="primary" v-if="isDisabled" @click="bindEdit">编辑</el-button>
          <el-button type="primary" v-else @click="bindSave">保存</el-button>
        </div> -->
      </div>
    </el-card>

    <el-card class="box-card">
      <div class="fenhong-info">
        <div class="home-box">
            <div class="title-item">平台补贴配置</div>
            <div style="font-size:16px;color:#595959;">单独配置补贴商品以单独设置比例结算</div>
            <div class="pt-bt">
                <div>全平台补贴</div>
                <div><input type="text" v-model="input4">%</div>
            </div>
            <div class="data-box">
                <div class="pt-bt1">
                    <div style="font-size:16px;color:#262626;font-weight: bold;">商品ID与名称</div>
                    <div class="add-btn" style="display:flex;">
                      <el-upload
                        ref="upload"
                        :action="base_url+'/itemSubsidy/excelImportItemSubsidy'"
                        :headers="headerObj"
                        accept=".xlsx"
                        :limit="limit"
                        :before-upload="beforeUpload"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :on-exceed="handleExceed"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        style="margin-right:16px;position:relative;">
                        <el-button size="mini" round>添加</el-button>
                      </el-upload>
                      
                      <!-- <el-button type="danger" size="mini" round @click="handleRemove">删除</el-button> -->
                    </div>
                </div>
                <div class="data">
                    <div class="data_info" v-for="(item,index) in goodList" :key="index">
                        <div>{{item.itemId}}</div>
                        <div class="good_title">{{item.itemName}}</div>
                        <div><input type="text" v-model="item.subsidyRatio" disabled>%</div>
                    </div> 
                </div>
                
            </div>
          <!-- <div class="save-btn">
            <el-button type="primary" size="small" round>发布</el-button>
          </div> -->
        </div>

        <div class="right-box">
            <div class="title-item">区域分红实配比例</div>
            <div class="info-cont">
              <div class="table_title">
                <div class="qu-name">区域名称</div>
                <div class="center-box">实配比例</div>
                <div class="center-box">实得比例</div>
                <div class="center-box">区域补贴</div>
                <div class="center-box">实补比例</div>
                <div class="center-box" style="min-width:200px">区域归属</div>
                <div class="gs-time" style="min-width:200px">归属时间</div>
              </div>
              <div class="zs-line"></div>
              <div class="data-box1">
                  <div v-for="(item, index) in dataList" :key="index">
                    <div class="province-box" @click="bindProv(index)">{{item.province}}</div>

                    <div ref="content" :class="[provIndex===index?'active':'disActive']">
                    <div v-for="(item1, index1) in item.city" :key="index1">
                      <div class="province-box" style="margin-left: 50px;" @click="bindCity(index,index1)">{{item1.city}}</div>
                      <div v-for="(item2, index2) in item1.area" :key="index2" class="area-box" :class="[provIndex===index&&cityIndex===index1?'active1':'disActive1']">
                        <div class="area">{{item2.area}}</div>
                        <div class="input-box">
                          <input type="text" v-model="input3" />%
                        </div>
                        <div class="input-box">
                          <input type="text" v-model="input3" />%
                        </div>
                        <div class="input-box">
                          <input type="text" v-model="input3" />%
                        </div>
                        <div class="input-box">
                          <input type="text" v-model="input3" />%
                        </div>
                        <div class="gs-times">
                          <span>姓名</span> <span>编号</span>
                        </div>
                        <div class="gs-times">
                          20201111-20221203
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  
              </div>
            </div>
            
        </div>
      </div>
    
    </el-card>
  </div>
</template>

<script>
import { isvalidPhone } from "../utils/validate.js";
export default {
  //当前组件的私有数据value
  data() {
    return {
      base_url:this.base_url,
      headerObj: {
        Authorization:'Bearer ' + window.sessionStorage.getItem('token')
      },
      limit: 1,//上传最大的文件数
      fileList:[],//excel文件列表
      goodList:[],//获取excel文件商品列表
      provIndex: 0,
      cityIndex: 0,
      input1: 0,
      input2: 0,
      input3: 0,
      input4: 0,
      dataList:[{
        province:"浙江省",
        city:[
          {
            city: '杭州市',
            area: [
              {
                area:'江干区'
              },
               {
                area:'西湖区'
              }
            ]
          },{
            city: '温州市',
            area: [
              {
                area:'江干区'
              }
            ]
          }
        ]
      },{
        province:"江西省",
        city:[
          {
            city: '杭州市',
            area: [
              {
                area:'江干区'
              }
            ]
          }
        ]
      }
      ]
    };
  },

  //Vue生命周期函数
  created() {
    this.allGoodInfo()
    this.subsidyInfo()
  },

  //事件处理函数
  methods: {
      upInput1(e) {
        console.log(this.input1)
        
      },
      upInput2(e) {
        console.log(e)

      },
      upInput3(e) {
        console.log(e)

      },
      // 查询商品默认利润分配信息（商品佣金、区域分红、平台剩余、平台补贴）
      async subsidyInfo() {
        const { data: res } = await this.$http.get("/itemSubsidy/selectAllItemSubsidy",{});
        if(res.code=="801") {
          this.goodList=res.result
        }else {
          this.$message.error('获取信息失败')
        }
      },
      // 查询平台所有补贴商品信息接口
      async allGoodInfo() {
        const { data: res } = await this.$http.get("/itemSubsidy/selectSpecialFields",{});
        if(res.code=="801") {
          // this.goodList=res.result
        }else {
          this.$message.error('获取信息失败')
        }
      },

     // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUpload(file) {
        console.log(1,file)
        let extension = file.name.substring(file.name.lastIndexOf('.')+1)
        let size = file.size / 1024 / 1024
        if(extension !== 'xlsx') {
          this.$message.warning('只能上传后缀是.xlsx的文件')
        }
        if(size > 10) {
          this.$message.warning('文件大小不得超过10M')
        }
      },
      // 文件状态改变
      handleChange(file, fileList) {
        if (file) {
          this.fileList = fileList.slice(-3)
        }
      },

      // 删除文件
      handleRemove(file, fileList) {
        this.fileList = []
      },

      // 文件超出个数限制
      handleExceed(files, fileList) {
        this.$message.warning(`只能选择 ${this.limit} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
      },

      // 文件上传成功
      handleSuccess(res, file, fileList) {
        this.$message.success('文件上传成功')
        this.$refs.upload.clearFiles()
        this.allGoodInfo()
      },

      // 文件上传失败
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败')
      },
    // // 编辑
    // bindEdit() {
    //   this.isDisabled = false
    // },
    // // 保存
    // bindSave() {
    //   this.isDisabled = true
    // },
    // 点击省
    bindProv(index) {
      if(this.provIndex === index) {
        return
      }
      this.provIndex = index
      this.cityIndex = 0
    },
    // 点击市
    bindCity(index,index1) {
      this.provIndex = index
      this.cityIndex = index1
    }
  },
};
</script>
<style scoped>
.basics-box {
  padding: 20px;
}
.box-card {
    margin-bottom: 10px;
}
.todo-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
}
.todo-box .el-button--primary{
  background: #FF5704;
  border: none;
  outline: none;
}
.title-desc {
  font-size: 14px;
  font-weight: bold;
}
.notes {
  font-size: 11px;
  color: #8C8C8C;
}
.draw {
  padding: 10px 0 6px;
  font-size: 16px;
  color: #595959;
  font-weight: bold;
}
.draw input {
  border: none;
  outline: none; 
  background: rgba(255, 87, 4, 0.1);
  width: 40px;
  text-align: center;
  padding: 4px;
  margin: 0 5px;
  border-radius: 3px;
}
.fenhong-info {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
}
.home-box {
  width: 375px;
  min-height: 82vh;
  background: #fff;
  padding: 20px 10px;
  border-radius: 8px;
  position: relative;
  margin-right: 10px;
  flex-shrink: 0;
}
.right-box {
    min-width: 1000px;
    min-height: 82vh;
    background: #fff;
    padding: 22px 14px 27px;
    border-radius: 8px;
    overflow: auto;
 
}
.info-cont {
  background: #FAFAFA;
  border-radius: 11px;
  margin-top: 30px;
  min-height: 70vh;
  overflow: auto;
  
}
.table_title {
    display: flex;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
    font-weight: bold;
    color: #595959;
    padding-left: 25px;
    box-sizing: border-box;
     
}
.zs-line {
  background: #f5f5f5;
  height: 14px;
  width: 100%;
}
.center-box {
  min-width: 114px;
  text-align: center;
}

.qu-name {
  min-width: 200px;
}
.gs-time {
  width: 200px;
  text-align: center;
}
/* .save-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
} */
.title-item {
    font-size: 27px;
    font-weight: bold;
    color: #262626;
}
.title-item span {
    font-size: 12px;
    font-weight: 400;
    margin-left: 10px;
}
.pt-bt1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    /* background: #eee; */
    padding: 0 10px;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 20px;

}
.pt-bt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 66px;
    background: #FF5704;
    padding: 0 10px;
    border-radius: 11px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
}
.pt-bt input {
    border: none;
    outline: none;
    background: #FF5704;
    width: 40px;
    text-align: center;
    padding: 4px;
    margin: 0 5px;
    border-radius: 6px;
    color: #ffffff;
}
/deep/ .el-upload-list {
  position: absolute;
  top: 20px;
  right: 0;
}
.data-box {
    /* background: #eee; */
    border-radius: 8px;
    height: 70vh;
    padding: 10px 0;
}
.data-box1 {
  

}

.data {
    height: 60vh;
    overflow: auto;
    padding: 0 10px;
}
.data_info {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #595959;
}
.data input {
    border: none;
    outline: none;
    background: #FFEEE5;
    width: 32px;
    text-align: center;
    padding: 4px;
    margin: 0 5px;
    border-radius: 3px;
    font-size: 15px;
    font-weight: bold;
    color: #262626;
}
.good_title {
    width: 200px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-left: 6px;
}
.el-card{
  background: #f9f9f9;
}
.province-box {
  width: 114px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
  color: #595959;
  font-weight: bold;
  cursor: pointer;
}
.area-box {
  display:flex;
  margin-left: 114px;
  align-items: center;
  font-size: 16px;
  color: #8C8C8C;
  font-weight: bold;
}
.input-box {
  min-width: 114px;
  height: 48px;
  text-align: center;
  line-height: 48px;
}
.area {
  min-width: 114px;
  height: 48px;
  text-align: center;
  line-height: 48px;
}
.area-box input {
  border: none;
  outline: none;
  background: #FFEEE5;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  margin-right: 3px;
  border-radius: 3px;
}
.gs-times {
  min-width: 200px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
  color: #595959;
  font-weight: bold;
}
.active {
  max-height: 70vh;
  transition: max-height 0.5s;
}
.disActive {
  max-height: 0;
  /* transition: max-height 0.3s; */
  overflow: hidden;
}
.active1 {
  max-height: 70vh;
  transition: max-height 0.5s;
}
.disActive1 {
  max-height: 0;
  /* transition: max-height 0.3s; */
  overflow: hidden;
}
</style>