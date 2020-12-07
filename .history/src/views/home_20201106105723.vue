<template>
  <div class="app-containers-box">
    <div class="home-box">
      <div class="title-item">首页banner(718*200)</div>

      <div v-for="(item, index) in bannerList" :key="index" class="item-banner">
        <div class="img-box">
          <div class="img-upload" @click="getImgIndex(index)">
            <el-upload
              :data="{ index: index }"
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/firstPage/uploadImg'"
              :headers="headerObj"
              class="avatar-uploader"
            >
              <!-- <el-button type="info" size="mini" plain>设置背景图</el-button> -->
              <div
                v-if="item.bg_img"
                :style="{ backgroundImage: 'url(' + item.bg_img + ')' }"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
          <div class="btns-box">
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-up"
              @click="upImg(index)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-down"
              @click="downImg(index)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-close"
              @click="deleteBanner(index)"
            ></div>
          </div>
        </div>
        <div class="input-box">
          <el-input
            class="input"
            v-model="item.link"
            placeholder="请输入链接"
          ></el-input>
        </div>
      </div>
      <div class="add-btn">
        <el-button type="primary" size="small" round @click="addBanner"
          >添加</el-button
        >
      </div>
      <div class="save-btn">
        <el-button type="primary" size="small" round>发布</el-button>
      </div>
    </div>
    <div class="home-box">
      <div class="title-item">每周主推</div>
      <div>
        <div style="margin-bottom: 10px">标题(500*50)</div>
        <div class="img-box-btn" v-if="!weekly.title_img">
          <div class="add-btn">
            <el-upload
              :show-file-list="false"
              :on-success="weeklyAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/firstPage/uploadImg'"
            >
              <el-button type="primary" size="small" round>添加</el-button>
            </el-upload>
          </div>
        </div>
        <div class="img-box" v-else>
          <div class="img-upload">
            <div class="title-img-info">
              <img :src="weekly.title_img" alt="" />
            </div>
          </div>
          <div class="btns-box">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
              class="avatar-uploader1"
            >
              <i class="el-icon-sort" />
            </el-upload>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-close"
              @click="deleteTitle"
            ></div>
          </div>
        </div>
      </div>

      <div class="item-banner">
        <div style="margin-bottom: 10px">横幅(678*114)</div>
        <div class="img-box-btn1" v-if="!weekly.banner_info.img_url">
          <div class="add-btn">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
            >
              <el-button type="primary" size="small" round>添加</el-button>
            </el-upload>
          </div>
        </div>
        <div v-else>
          <div class="img-box">
            <div class="img-upload">
              <div class="title-img-info1">
                <img :src="weekly.banner_info.img_url" alt="" />
              </div>
            </div>
            <div class="btns-box">
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccessBg"
                :before-upload="beforeAvatarUpload"
                :action="base_api + '/weiXinUser/importUser'"
                class="avatar-uploader1"
              >
                <i class="el-icon-sort" />
              </el-upload>
              <div
                style="line-height: 20px"
                class="btn-item el-icon-close"
                @click="deleteHengfu"
              ></div>
            </div>
          </div>
          <div class="input-box">
            <el-input
              class="input"
              v-model="weekly.banner_info.link"
              placeholder="请输入链接"
            ></el-input>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 10px">商品(必须添加4个)</div>
      <div
        v-for="(item, index) in weekly.goodList"
        :key="index"
        class="item-banner"
      >
        <div class="img-box">
          <div class="img-upload">
            <div class="good-detail">
              <div class="good-img-box"><img src="" alt="" /></div>
              <div class="good-info">
                <div class="good-title">{{ item.title }}</div>
                <div class="good-id">{{ item.id }}</div>
                <div class="good-parce">
                  <span style="font-size: 12px">￥</span>{{ item.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="btns-box">
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-up"
              @click="upGood(index,1)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-down"
              @click="downGood(index,1)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-close"
              @click="deleteGood(index,1)"
            ></div>
          </div>
        </div>
      </div>

      <div class="add-btn">
        <el-button type="primary" size="small" round @click="addGood(1)"
          >添加</el-button
        >
      </div>
      <div class="save-btn">
        <el-button type="primary" size="small" round>发布</el-button>
      </div>
    </div>
    <div class="home-box">
      <div class="title-item">区域特返</div>
      <div>
        <div style="margin-bottom: 10px">标题(500*50)</div>
        <div class="img-box-btn" v-if="!region.title_img">
          <div class="add-btn">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
            >
              <el-button type="primary" size="small" round>添加</el-button>
            </el-upload>
          </div>
        </div>
        <div class="img-box" v-else>
          <div class="img-upload">
            <div class="title-img-info">
              <img :src="region.title_img" alt="" />
            </div>
          </div>
          <div class="btns-box">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
              class="avatar-uploader1"
            >
              <i class="el-icon-sort" />
            </el-upload>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-close"
              @click="deleteTitle"
            ></div>
          </div>
        </div>
      </div>

      <div class="item-banner">
        <div style="margin-bottom: 10px">横幅(678*114)</div>
        <div class="img-box-btn1" v-if="!region.banner_info.img_url">
          <div class="add-btn">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
            >
              <el-button type="primary" size="small" round>添加</el-button>
            </el-upload>
          </div>
        </div>
        <div v-else>
          <div class="img-box">
            <div class="img-upload">
              <div class="title-img-info1">
                <img :src="region.banner_info.img_url" alt="" />
              </div>
            </div>
            <div class="btns-box">
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccessBg"
                :before-upload="beforeAvatarUpload"
                :action="base_api + '/weiXinUser/importUser'"
                class="avatar-uploader1"
              >
                <i class="el-icon-sort" />
              </el-upload>
              <div
                style="line-height: 20px"
                class="btn-item el-icon-close"
                @click="deleteHengfu"
              ></div>
            </div>
          </div>
          <div class="input-box">
            <el-input
              class="input"
              v-model="region.banner_info.link"
              placeholder="请输入链接"
            ></el-input>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 10px">商品(必须添加4个)</div>
      <div
        v-for="(item, index) in region.goodList"
        :key="index"
        class="item-banner"
      >
        <div class="img-box">
          <div class="img-upload">
            <div class="good-detail">
              <div class="good-img-box"><img src="" alt="" /></div>
              <div class="good-info">
                <div class="good-title">{{ item.title }}</div>
                <div class="good-id">{{ item.id }}</div>
                <div class="good-parce">
                  <span style="font-size: 12px">￥</span>{{ item.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="btns-box">
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-up"
              @click="upGood(index,2)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-down"
              @click="downGood(index,2)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-close"
              @click="deleteGood(index,2)"
            ></div>
          </div>
        </div>
      </div>

      <div class="add-btn">
        <el-button type="primary" size="small" round @click="addGood(2)"
          >添加</el-button
        >
      </div>
      <div class="save-btn">
        <el-button type="primary" size="small" round>发布</el-button>
      </div>
    </div>
    <div class="home-box">
      <div class="title-item">云超直供</div>
      <div>
        <div style="margin-bottom: 10px">标题(500*50)</div>
        <div class="img-box-btn" v-if="!cloud.title_img">
          <div class="add-btn">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
            >
              <el-button type="primary" size="small" round>添加</el-button>
            </el-upload>
          </div>
        </div>
        <div class="img-box" v-else>
          <div class="img-upload">
            <div class="title-img-info">
              <img :src="cloud.title_img" alt="" />
            </div>
          </div>
          <div class="btns-box">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
              class="avatar-uploader1"
            >
              <i class="el-icon-sort" />
            </el-upload>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-close"
              @click="deleteTitle"
            ></div>
          </div>
        </div>
      </div>

      <div class="item-banner">
        <div style="margin-bottom: 10px">横幅(678*114)</div>
        <div class="img-box-btn1" v-if="!cloud.banner_info.img_url">
          <div class="add-btn">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/weiXinUser/importUser'"
            >
              <el-button type="primary" size="small" round>添加</el-button>
            </el-upload>
          </div>
        </div>
        <div v-else>
          <div class="img-box">
            <div class="img-upload">
              <div class="title-img-info1">
                <img :src="cloud.banner_info.img_url" alt="" />
              </div>
            </div>
            <div class="btns-box">
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccessBg"
                :before-upload="beforeAvatarUpload"
                :action="base_api + '/weiXinUser/importUser'"
                class="avatar-uploader1"
              >
                <i class="el-icon-sort" />
              </el-upload>
              <div
                style="line-height: 20px"
                class="btn-item el-icon-close"
                @click="deleteHengfu"
              ></div>
            </div>
          </div>
          <div class="input-box">
            <el-input
              class="input"
              v-model="cloud.banner_info.link"
              placeholder="请输入链接"
            ></el-input>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 10px">商品(必须添加4个)</div>
      <div
        v-for="(item, index) in cloud.goodList"
        :key="index"
        class="item-banner"
      >
        <div class="img-box">
          <div class="img-upload">
            <div class="good-detail">
              <div class="good-img-box"><img src="" alt="" /></div>
              <div class="good-info">
                <div class="good-title">{{ item.title }}</div>
                <div class="good-id">{{ item.id }}</div>
                <div class="good-parce">
                  <span style="font-size: 12px">￥</span>{{ item.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="btns-box">
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-up"
              @click="upGood(index,3)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-arrow-down"
              @click="downGood(index,3)"
            ></div>
            <div
              style="line-height: 20px"
              class="btn-item el-icon-close"
              @click="deleteGood(index,3)"
            ></div>
          </div>
        </div>
      </div>

      <div class="add-btn">
        <el-button type="primary" size="small" round @click="addGood(3)"
          >添加</el-button
        >
      </div>
      <div class="save-btn">
        <el-button type="primary" size="small" round>发布</el-button>
      </div>
    </div>

    <el-dialog :width="'700px'" :visible.sync="dialogTableVisible4" title="选择商品">
      <div style="display:flex;margin:10px 0;">
        <div style="width:150px">
          <el-input
            v-model="inpItemId"
            placeholder="请输入商品id"/>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div style="width:150px">
          <el-input
            v-model="all_keyWord"
            placeholder="请输入商品名称"/>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div style="width:150px">
          <el-select v-model="inpclass1" placeholder="一级分类" @change="allSelectOne">
            <el-option
              v-for="item in class1"
              :key="item.mcid"
              :label="item.name"
              :value="item.mcid"/>
          </el-select>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div style="width:150px">
          <el-select v-model="all_mcid" placeholder="二级级分类" @change="allSelectTwo">
            <el-option
              v-for="item in Allclass2"
              :key="item.mcid"
              :label="item.name"
              :value="item.mcid"/>
          </el-select>
        </div>
        &nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="primary"
          @click="AllResat()"
        >复位</el-button>
        &nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="primary"
          @click="AllSearch()"
        >搜索</el-button>

      </div>
      <el-table
        :data="all_showList"
        style="width: 100%">
        <el-table-column
          label="商品id"
          width="70"
          prop="item_id"/>
        <el-table-column
          label="首图"
          align="left"
          width="100"
        >
          <template slot-scope="scope">
            <img :src="scope.row.img_url" width="60" height="60">
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          prop="title"/>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.select!=1"
              size="mini"
              type="primary"
              @click="AllsureSelect(scope.row)">选择</el-button>
            <el-button
              v-if="scope.row.select==1"
              size="mini"
              type="success"
              @click="AllsureDelete(scope.row)">已选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin:10px 0;display:flex;justifyContent:space-between;padding:0 10px;">
        <el-pagination
          :page-size="5"
          :total="all_total"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange4"/>
        <el-button
          size="mini"
          type="warning"
          @click="SaveAllGoods()"
        >保存</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { isvalidPhone } from "../utils/validate.js";
export default {
  //当前组件的私有数据value
  data() {
    return {
      base_api: this.base_url,
      headerObj: {
        Authorization:'Bearer ' + window.sessionStorage.getItem('token')
      },
      bannerList: [
        {
          bg_img: "",
          link: "",
        },
        {
          bg_img: "",
          link: "",
        },
      ],
      bannerIndex:'',//上传图片下标
      weekly: {
        title_img: "",
        banner_info: {
          img_url: "",
          link: "",
        },
        goodList: [
          {
            id: 1,
            img: "",
            title: "jkhdkf第三方公司的框架讲的是符合",
            price: "55.9",
          },
          {
            id: 2,
            img: "",
            title: "讲的是开放不打算看到师傅",
            price: "55.9",
          },
        ],
        goodIds: [],
      },

      region: {
        title_img: "111",
        banner_info: {
          img_url: "222",
          link: "",
        },
        goodList: [
          {
            id: 1,
            img: "",
            title: "jkhdkf第三方公司的框架讲的是符合",
            price: "55.9",
          },
          {
            id: 2,
            img: "",
            title: "讲的是开放不打算看到师傅",
            price: "55.9",
          },
        ],
        goodIds: [],
      },

      cloud: {
        title_img: "111",
        banner_info: {
          img_url: "222",
          link: "",
        },
        goodList: [
          {
            id: 1,
            img: "",
            title: "jkhdkf第三方公司的框架讲的是符合",
            price: "55.9",
          },
          {
            id: 2,
            img: "",
            title: "讲的是开放不打算看到师傅",
            price: "55.9",
          },
        ],
        goodIds: [],
      },
      dialogTableVisible4: false,
      all_showList: [], // 展示用列表
      all_dataList: [], // 选中的数据列表
      all_idList: [], // 选中的id列表

      inpclass1: '',
      Allclass2: [], // 选中一级分类后二级分类数据
      inpItemId: '',
      all_total: null, // 全部页面
      all_mcid: '', // 品类id
      all_keyWord: '', // 搜索关键字
      class1: [],


    };
  },

  //Vue生命周期函数
  created() {
    // this.getUserList();
    // this.switchStatus();
  },

  //事件处理函数
  methods: {
    // 获取上传图片所属数组下标
    getImgIndex(index) {
      this.bannerIndex = index
    },
    // 背景图上传
    handleAvatarSuccessBg(res, file) {
      const self = this;
      // self.content.bg_img = res.data.url;
      self.bannerList[this.bannerIndex].bg_img = res.result
    },
    // 标题图片上传
    weeklyAvatarSuccessBg() {
      console.log(111, res);
      console.log(222, file);
      this.weekly.title_img = res.result
    },
    beforeAvatarUpload(file) {
      console.log(333, file);

      const isLt3M = file.size / 1024 / 1024 < 3;
      const isWEBP = file.type === "image/webp";
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
      }
      if (isWEBP) {
        this.$message.error("上传图片不能是webp格式!");
      }
      return isLt3M && !isWEBP;
    },
    // 添加banner图
    addBanner() {
      let content = {
        bg_img: "",
        link: "",
      };

      this.bannerList.push(content);
    },
    // 添加商品
    addGood(type) {
        this.dialogTableVisible4 = true
        if(type===1) {



            let content = {
            id: 3,
                img: "",
                title: "jkhdkf第三方公司的框架讲的是符合",
                price: "55.9",
            };
            let id = 22;
            this.weekly.goodList.push(content);
            this.weekly.goodIds.push(id);
        }else if(type===2) {
            let content = {
            id: 3,
                img: "",
                title: "jkhdkf第三方公司的框架讲的是符合",
                price: "55.9",
            };
            let id = 22;
            this.region.goodList.push(content);
            this.region.goodIds.push(id)
        }else if(type===3) {
            let content = {
            id: 3,
                img: "",
                title: "jkhdkf第三方公司的框架讲的是符合",
                price: "55.9",
            };
            let id = 22;
            this.cloud.goodList.push(content);
            this.cloud.goodIds.push(id)
        }
     
    },

    // 获取全部商品

    

    // 删除banner图
    deleteBanner(index) {
      console.log(index);
      this.bannerList.splice(index, 1);
      console.log(this.bannerList);
    },
    // 删除商品
    deleteGood(index,type) {
        if(type===1) {
            this.weekly.goodList.splice(index, 1);
            this.weekly.goodIds.splice(index, 1);
        }else if(type===2) {
            this.region.goodList.splice(index, 1);
            this.region.goodIds.splice(index, 1);
        }else if(type===3) {
            this.cloud.goodList.splice(index, 1);
            this.cloud.goodIds.splice(index, 1);
        }
      
    },
    // 删除标题图片
    deleteTitle() {
      this.weekly.title_img = "";
    },

    // 删除横幅
    deleteHengfu() {
      this.weekly.banner_info.img_url = "";
    },
    // 向上移动
    upImg(index) {
      if (index === 0) {
        return;
      }
      const self = this;
      const obj = self.bannerList[index];
      const obj1 = self.bannerList[index - 1];
      self.$set(self.bannerList, index, obj1);
      self.$set(self.bannerList, index - 1, obj);
    },
    // 向下移动
    downImg(index) {
      const self = this;
      if (index === self.bannerList.length - 1) {
        return;
      }
      const obj = self.bannerList[index];
      const obj1 = self.bannerList[index + 1];
      self.$set(self.bannerList, index, obj1);
      self.$set(self.bannerList, index + 1, obj);
    },
    upGood(index,type) {
      if (index === 0) {
        return;
      }
      if(type===1) {
        const self = this;
        const obj = self.weekly.goodList[index];
        const obj1 = self.weekly.goodList[index - 1];
        self.$set(self.weekly.goodList, index, obj1);
        self.$set(self.weekly.goodList, index - 1, obj);
        // 还有ids要处理
      }else if(type===2) {
        const self = this;
        const obj = self.region.goodList[index];
        const obj1 = self.region.goodList[index - 1];
        self.$set(self.region.goodList, index, obj1);
        self.$set(self.region.goodList, index - 1, obj);
        // 还有ids要处理
      }else if(type===3) {
        const self = this;
        const obj = self.cloud.goodList[index];
        const obj1 = self.cloud.goodList[index - 1];
        self.$set(self.cloud.goodList, index, obj1);
        self.$set(self.cloud.goodList, index - 1, obj);
        // 还有ids要处理
      }
      
      
    },
    downGood(index,type ) {
      const self = this;
      if(type===1) {
        if (index === self.weekly.goodList.length - 1) {
            return;
        }
        const obj = self.weekly.goodList[index];
        const obj1 = self.weekly.goodList[index + 1];
        self.$set(self.weekly.goodList, index, obj1);
        self.$set(self.weekly.goodList, index + 1, obj);
      }else if(type===2) {
          if (index === self.region.goodList.length - 1) {
            return;
        }
        const obj = self.region.goodList[index];
        const obj1 = self.region.goodList[index + 1];
        self.$set(self.region.goodList, index, obj1);
        self.$set(self.region.goodList, index + 1, obj);
      }else if(type===3) {
          if (index === self.cloud.goodList.length - 1) {
            return;
        }
        const obj = self.cloud.goodList[index];
        const obj1 = self.cloud.goodList[index + 1];
        self.$set(self.cloud.goodList, index, obj1);
        self.$set(self.cloud.goodList, index + 1, obj);
      }

    },

     // 获取全部商品列表
    async getAllGoods() {
      const self = this
      const { data: res } = await this.$http.post("/item/me-item-api/index",
        {
          params: { 
            start_page: self.all_start,
            pages: 5,
            shop_id: self.tplInfo.shop_id == 0 ? '' : self.tplInfo.shop_id,
            key_word: self.all_keyWord,
            mcid: self.all_mcid,
            item_ids: (self.inpItemId * 1) ? [self.inpItemId] : ''
          },
        }
      );

       // console.log(111,res)
        self.all_total = parseInt(res.data.data.total_pages)
        self.all_showList = res.data.data.list
        setTimeout(function() {
          self.markItem()
        }, 150)
    },

    // 获取商品分类
    getClass1() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-category-api/index',
        data: {
          shop_id: 0
        }
      }).then(function(res) {
        self.class1 = res.data.data.list
        self.classList = res.data.data.list
        if (res.data.data.list.length > 0) {
          self.class1_act = res.data.data.list[0].mcid
        }
        self.class2 = []
        self.getClass2()
      }).catch(function(error) {
        console.log(error)
      })
    },
    allSelectOne(d) { // 一级分类选择
      console.log(d) // Allclass2
      this.Allclass2 = []
      this.inpclass2 = ''
      this.all_mcid = ''
      const self = this
      request({
        method: 'post',
        url: '/item/me-category-api/get-category-list',
        data: {
          shop_id: self.tplInfo.shop_id,
          pid: d
        }
      }).then(function(res) {
        self.Allclass2 = res.data.data
      }).catch(function(error) {
        console.log(error)
      })
    },

    allSelectTwo(d) { // 二级分类选择
      console.log(d)
      this.inpMcid = d
    },

     handleCurrentChange4(val) {
      const self = this
      self.all_start = (val - 1)
      self.getAllGoods()
    },

    AllsureSelect(item) {
      // console.log(item)
      this.all_dataList.push(item)
      this.all_idList.push(item.item_id)
      this.markItem()
      // console.log('已经选中的数据', this.all_dataList)
    },

    markItem() { // 根据all_idList给被选好的数据进行标记  还要根据已经被选好存在的 丧心病狂
      const self = this
      // 根据我选好的
      this.all_idList.forEach(function(val, item, arr) {
        self.all_showList.forEach(function(v, i, a) {
          if (val == v.item_id) { // 被展示的该商品是被选中的
            self.$set(self.all_showList[i], 'select', 1)
          }
        })
      })
      // 根据已经存在的
      // console.log('已经存在的自定义商品', self.content.list[self.theIndex].floor_data)
      // console.log(111,self.theIndex1)
      if(self.theIndex1==="") {
        self.content.list[self.theIndex].floor_data.forEach(function(val, item, index) {
          self.all_showList.forEach(function(v, i, a) {
            if (val.param == v.item_id) { // 被展示的该商品是被选中的
              self.$set(self.all_showList[i], 'select', 1)
            }
          })
        })
      }else {
        self.content.list[self.theIndex].moduleList[self.theIndex1].floor_data.forEach(function(val, item, index) {
          self.all_showList.forEach(function(v, i, a) {
            if (val.param == v.item_id) { // 被展示的该商品是被选中的
              self.$set(self.all_showList[i], 'select', 1)
            }
          })
        })
      }
      
    },

    AllsureDelete(item) {
      // console.log(item)
      const self = this
      // 从我创建的目前选中的临时data中删除
      this.all_showList.forEach(function(v, i, a) {
        if (item.item_id == v.item_id) {
          self.$set(self.all_showList[i], 'select', 0)
        }
      })
      const newArr1 = []
      const newArr2 = []
      this.all_idList.forEach(function(v, i, a) {
        if (v != item.item_id) {
          newArr1.push(v)
        }
      })
      this.all_dataList.forEach(function(v, i, a) {
        if (v.item_id != item.item_id) {
          newArr2.push(v)
        }
      })
      this.all_idList = newArr1
      this.all_dataList = newArr2
      // console.log('已经选中的数据', this.all_dataList)

      // 从已经被保存好的以前的data中删除  因为不存在连续数据，用splice没事
      if(self.theIndex1==="") {
        self.content.list[self.theIndex].floor_data.forEach(function(v, i, a) {
          if (v.param == item.item_id) {
            self.content.list[self.theIndex].floor_data.splice(i, 1)
          }
        })
      }else {
        self.content.list[self.theIndex].moduleList[self.theIndex1].floor_data.forEach(function(v, i, a) {
          if (v.param == item.item_id) {
            self.content.list[self.theIndex].moduleList[self.theIndex1].floor_data.splice(i, 1)
          }
        })
      }
      
      this.markItem() // 完美
    },


   


    //根据身份发查询展示用户信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get(
        "/inscription/auditInscription",
        {
          params: { id, accountStatus: 0 },
        }
      );

      if (res.code !== "801") {
        this.$message.error("查询用户失败！");
      }
      this.wxUser = res.result;
      this.detailFormVisible = true;
    },

    //根据身份发查询展示用户信息审核
    async showCheckDialog(userIdentity) {
      const { data: res } = await this.$http.get(
        "/weiXinUser/getUserByIdentity",
        {
          params: { userIdentity },
        }
      );

      if (res.code !== "801") {
        this.$message.error("查询用户失败！");
      }
      this.wxUser = res.result;
      this.checkFormVisible = true;
    },

  },
};
</script>
<style scoped>
.app-containers-box {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: flex-start;
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
.home-box:last-child {
    margin-right: 0;
}


.title-item {
  font-weight: bold;
  margin-bottom: 20px;
}
.item-banner {
  margin-bottom: 20px;
}
.img-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.img-box-btn {
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  margin-bottom: 14px;
}
.img-box-btn1 {
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
  margin-bottom: 14px;
}
.img-upload {
  width: 88%;
  flex-shrink: 0;
}
.title-img-info img {
  width: 100%;
  height: 50px;
  /* background: #fff; */
  border-radius: 12px;
}
.title-img-info1 img {
  width: 100%;
  height: 100px;
  /* background: #fff; */
  border-radius: 12px;
}
/deep/ .avatar-uploader .el-upload {
  width: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 100%;
  height: 100px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
/deep/ .avatar-uploader1 .el-upload {
  width: 24px;
  height: 24px;
  border: 1px solid #999999;
  border-radius: 50%;
  line-height: 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/* /deep/ .avatar-uploader1 .el-upload:hover {
  border-color: #409eff;
} */
.avatar-uploader1 .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar-uploader1 .avatar {
  width: 100%;
  height: 50px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.btns-box {
  display: flex;
  flex-direction: column;
}
.btn-item {
  width: 24px;
  height: 24px;
  border: 1px solid #999999;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  margin-bottom: 10px;
}
.btn-item:last-child {
  margin: 0;
}
.input-box {
  width: 88%;
}
/deep/ .input input {
  background: none;
}
.add-btn {
  text-align: center;
}
.el-button--small.is-round {
  padding: 9px 30px;
}
.save-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.good-detail {
  display: flex;
  background: #ffffff;
  width: 100%;
  border-radius: 12px;
  padding: 10px;
}
.good-img-box img {
  width: 80px;
  height: 80px;
  background: #eeeeee;
  margin-right: 10px;
}
.good-info {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.good-id {
  font-size: 14px;
}
.good-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.good-parce {
  font-size: 16px;
}
</style>
