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
                v-model="input1"
              />%</span
            >
            <span
              >区域分红<input
                type="text"
                v-model="input2"
              />%</span
            >
            <span
              >平台剩余<input
                type="text"
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
            <div class="table_title">区域名称</div>
            <div class="data-box">
                <el-tree
                :data="data4"
                :props="defaultProps"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
                </el-tree>
                
            </div>
        </div>
      </div>
    
    </el-card>
  </div>
</template>

<script>
let id = 1000;
import { isvalidPhone } from "../utils/validate.js";
export default {
  //当前组件的私有数据value
  data() {
    return {
      input1: 0,
      input2: 0,
      input3: 0,
      input4: 0,
       data4: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    };
  },

  //Vue生命周期函数
  created() {},

  //事件处理函数
  methods: {

    renderContent(h, { node, data, store }) {
        console.log(1,h)
        console.log(2,node)
        console.log(3,data)
        console.log(4,store)
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>

            <span>
              <span><input type="text" v-model="input2"/>%</span>
              <span><input type="text" v-model="input2"/>%</span>
              <span><input type="text" v-model="input2"/>%</span>
              <span><input type="text" v-model="input2"/>%</span>
              <span>姓名 账号</span>
            </span>
            
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
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
    height: 82vh;
    background: #ddd;
    padding: 20px 10px;
    border-radius: 8px;
    position: relative;
}
.table_title {
    font-size: 16px;
    margin: 16px 20px 8px;
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
.el-tree {
    background: none;
}
</style>