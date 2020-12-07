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
  

          <div class="save-btn">
            <el-button type="primary" size="small" round>发布</el-button>
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
}

.home-box {
  width: 375px;
  min-height: 80vh;
  background: #eee;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  margin-right: 10px;
}
.save-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

</style>