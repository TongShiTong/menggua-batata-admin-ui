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
      <div>
        <div class="home-box">
            <div class="title-item">平台补贴配置<span>单独配置补贴商品以单独设置比例结算</span></div>
            <div class="pt-bt">
                <div>全平台补贴</div>
                <div><input type="text" v-model="input4">%</div>
            </div>
          <!-- <div class="save-btn">
            <el-button type="primary" size="small" round>发布</el-button>
          </div> -->
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

.home-box {
  width: 375px;
  min-height: 80vh;
  background: #ddd;
  padding: 20px 10px;
  border-radius: 8px;
  position: relative;
  margin-right: 10px;
}
/* .save-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
} */
.title-item {
    font-size: 16px;
    font-weight: bold;
    padding: 0 10px;
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

</style>