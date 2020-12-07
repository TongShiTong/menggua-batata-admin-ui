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
                <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
                <el-table-column v-if="columns.length===0" width="150">
                <template slot-scope="scope">
                    <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                    <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                    </span>
                    {{scope.$index}}
                </template>
                </el-table-column>
                <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
                <template slot-scope="scope">
                    <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
                    <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                    <i v-else class="el-icon-minus"></i>
                    </span>
                    {{scope.row[column.value]}}
                </template>
                </el-table-column>
                <slot></slot>
            </el-table>
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
        columns: [
        {
          text: '事件',
          value: 'event',
          width: 200
        },
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '时间线',
          value: 'timeLine'
        },
        {
          text: '备注',
          value: 'comment'
        }
      ],
      formatData: [
        {
          id: 0,
          event: '事件1',
          timeLine: 50,
          comment: '无'
        },
        {
          id: 1,
          event: '事件1',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: 2,
              event: '事件2',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 3,
              event: '事件3',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '事件4',
                  timeLine: 5,
                  comment: '无'
                },
                {
                  id: 5,
                  event: '事件5',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  event: '事件6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      event: '事件7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          event: '事件71',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          event: '事件72',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          event: '事件73',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: '事件8',
                      timeLine: 25,
                      comment: '无'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
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
              <span style="width: 200px;display: inline-block;">{node.label}</span>
              <span>
                <span><input style="border: none;outline: none;background: #fff;width: 40px;text-align: center;margin: 0 10px;border-radius: 6px;" type="text" />%</span>
                <span><input style="border: none;outline: none;background: #fff;width: 40px;text-align: center;margin: 0 10px;border-radius: 6px;" type="text" />%</span>
                <span><input style="border: none;outline: none;background: #fff;width: 40px;text-align: center;margin: 0 10px;border-radius: 6px;" type="text" />%</span>
                <span><input style="border: none;outline: none;background: #fff;width: 40px;text-align: center;margin: 0 10px;border-radius: 6px;" type="text" />%</span>
                <span>姓名 账号</span>
            </span>
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