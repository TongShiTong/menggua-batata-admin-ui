<template>
  <div class="basics-box">
    <el-card class="box-card">
      <div class="todo-box">
        <div>
          <div class="title-desc">利润默认分配比例</div>
          <div class="draw">
            <span
              >商品佣金<input
                type="text"
                placeholder="30"
                v-model="input1"
              />%</span
            >
            <span
              >区域分红<input
                type="text"
                placeholder="30"
                v-model="input2"
              />%</span
            >
            <span
              >平台剩余<input
                type="text"
                placeholder="30"
                v-model="input3"
              />%</span
            >
          </div>
          <div class="notes">注：区域分红无归属对象时，归平台所有。</div>
        </div>
        <div class="add-btn">
          <el-button type="primary" size="mini" round>编辑</el-button>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div class="fenhong-info">
        <div class="home-box">
            <div class="title-item">平台补贴配置<span>单独配置补贴商品以单独设置比例结算</span></div>
            <div class="pt-bt">
                <div>全平台补贴</div>
                <div><input type="text" v-model="input4">%</div>
            </div>
            <div class="data-box">
                <div class="pt-bt">
                    <div>商品ID与名称</div>
                    <div class="add-btn">
                        <el-button type="primary" size="mini" round>添加</el-button>
                    </div>
                </div>
                <div class="data">
                    <div class="data_info">
                        <div>24155</div>
                        <div class="good_title">商品名称商品名称商品名称商品名称</div>
                        <div><input type="text" v-model="input4">%</div>
                    </div> 
                    <div class="data_info">
                    <div>24155</div>
                    <div class="good_title">商品名称商品名称商品名称商品名称</div>
                    <div><input type="text" v-model="input4">%</div>
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
                    <div class="province-box">{{item.province}}</div>
                    <div v-for="(item1, index1) in item.city" :key="index1">
                      <div class="province-box">{{item1.city}}</div>
                      <div v-for="(item2, index2) in item1.area" :key="index2" class="area-box">
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
    
    </el-card>
  </div>
</template>

<script>
import { isvalidPhone } from "../utils/validate.js";
export default {
  //当前组件的私有数据value
  data() {
    return {
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
  created() {},

  //事件处理函数
  methods: {},
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
}
.title-desc {
  font-size: 14px;
  font-weight: bold;
}
.notes {
  font-size: 12px;
}
.draw {
  padding: 10px 0 6px;
}
.draw input {
  border: none;
  outline: none;
  background: #f5f5f5;
  width: 40px;
  text-align: center;
  padding: 2px 6px;
  margin: 0 10px;
  border-radius: 6px;
}
.fenhong-info {
    display: flex;
}
.home-box {
  width: 375px;
  height: 82vh;
  background: #ddd;
  padding: 20px 10px;
  border-radius: 8px;
  position: relative;
  margin-right: 10px;
  flex-shrink: 0;
}
.right-box {
    width: 100%;
    min-height: 82vh;
    background: #fff;
    padding: 22px 14px 27px;
    border-radius: 8px;
    position: relative;
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
.pt-bt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    background: #eee;
    padding: 0 10px;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 10px;

}
.pt-bt input {
    border: none;
    outline: none;
    background: #fff;
    width: 40px;
    text-align: center;
    padding: 2px 6px;
    margin: 0 10px;
    border-radius: 6px;
}
.data-box {
    background: #eee;
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
    margin-bottom: 5px;
    font-size: 14px;
}
.data input {
    border: none;
    outline: none;
    background: #fff;
    width: 32px;
    text-align: center;
    /* padding: 2px 6px; */
    margin: 0 10px;
    border-radius: 6px;
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
</style>