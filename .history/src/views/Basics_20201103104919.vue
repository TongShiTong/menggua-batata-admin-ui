<template>
  <div class="basics-box">
      <div class="todo-box">
          <div>
              <h4>利润默认分配比例</h4>
              <div>
                  <span>商品佣金<input type="text" placeholder="30">%</span>
                  <span>区域分红<input type="text" placeholder="30">%</span>
                  <span>平台剩余<input type="text" placeholder="30">%</span>
                  
              </div>
              <div>注：区域分红无归属对象时，归平台所有。</div>
          </div>
          <div class="add-btn">
              <el-button type="primary" size="small" round>编辑</el-button>
          </div>
      </div>

  </div>
</template>

<script>
  import {isvalidPhone} from '../utils/validate.js'
  export default {
    //当前组件的私有数据value
    data() {
     
      return {

      }
    },

    //Vue生命周期函数
    created() {

    },

    //事件处理函数
    methods: {
    

    }
  }
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
</style>