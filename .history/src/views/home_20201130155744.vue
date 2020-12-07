<template>
  <div class="app-containers-box">
    <div class="home-box">
      <div class="title-item">首页banner(718*200)</div>

      <div v-for="(item, index) in bannerList" :key="index" class="item-banner">
        <div class="img-box">
          <div class="img-upload" @click="getImgIndex(index)">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :action="base_api + '/firstPage/uploadImg'"
              :headers="headerObj"
              class="avatar-uploader"
            >
              <!-- <el-button type="info" size="mini" plain>设置背景图</el-button> -->
              <div
                v-if="item.banner"
                :style="{ backgroundImage: 'url(' + item.banner + ')' }"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
          <div class="btns-box">
            <div
              class="upupup"
              @click="upImg(index)"
            ><img src="../assets/imgs/up.png" alt=""> </div>
            <div
              class="upupup"
              @click="downImg(index)"
            ><img src="../assets/imgs/down.png" alt=""></div>
            <div
              class="upupup"
              @click="deleteBanner(index)"
            ><img src="../assets/imgs/delete.png" alt=""></div>
          </div>
        </div>
        <div class="input-box">
          <el-input
            class="input"
            v-model="item.bannerUrl"
            placeholder="请输入链接"
          ></el-input>
        </div>
      </div>
      <div class="add-banner" @click="addBanner">
        添加
      </div>
      <div class="save-btn">
        <el-button type="primary" style="background:#FF5704;border:none" @click="saveItem(1)">发布</el-button>
      </div>
      <div style="height:50px"> </div>
    </div>
    <div class="home-box">
      <div class="title-item">每周主推</div>
      <div>
        <div style="margin-bottom: 10px">标题(500*50)</div>
        <div class="img-box-btn" v-if="!weekly.title">
          
          <el-upload
            style="width: 100%;height: 100%;line-height: 50px;"
            :show-file-list="false"
            :on-success="weeklyAvatarSuccessBg"
            :before-upload="beforeAvatarUpload"
            :headers="headerObj"
            :action="base_api + '/firstPage/uploadImg'"
          >
            <div style="color:#262626;">添加</div>
          </el-upload>
          
        </div>
        <div class="img-box" v-else>
          <div class="img-upload">
            <div class="title-img-info">
              <img :src="weekly.title" alt="" />
            </div>
          </div>
          <div class="btns-box">
            <el-upload
              :show-file-list="false"
              :on-success="weeklyAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :headers="headerObj"
              :action="base_api + '/firstPage/uploadImg'"
              class="avatar-uploader1"
            >
              <div class="upupup">
                <img src="../assets/imgs/shuaxin.png" alt="">
              </div>
            </el-upload>
            <div
              class="upupup"
              @click="deleteTitle(1)"
            ><img src="../assets/imgs/delete.png" alt=""> </div>
          </div>
        </div>
      </div>

      <div class="item-banner">
        <div style="margin-bottom: 10px">横幅(678*114)</div>
        <div class="img-box-btn" v-if="!weekly.str.banner">
         
          <el-upload
            style="width: 100%;height: 100%;line-height: 50px;"
            :show-file-list="false"
            :on-success="weeklyHengfSuccessBg"
            :before-upload="beforeAvatarUpload"
            :headers="headerObj"
            :action="base_api + '/firstPage/uploadImg'"
          >
            <div style="color:#262626;">添加</div>
          </el-upload>
        
        </div>
        <div v-else>
          <div class="img-box">
            <div class="img-upload">
              <div class="title-img-info1">
                <img :src="weekly.str.banner" alt="" />
              </div>
            </div>
            <div class="btns-box">
              <el-upload
                :show-file-list="false"
                :on-success="weeklyHengfSuccessBg"
                :before-upload="beforeAvatarUpload"
                :headers="headerObj"
                :action="base_api + '/firstPage/uploadImg'"
                class="avatar-uploader1"
              >
                <div class="upupup">
                  <img src="../assets/imgs/shuaxin.png" alt="">
                </div>
              </el-upload>
              <div
                class="upupup"
                @click="deleteHengfu(1)"
              ><img src="../assets/imgs/delete.png" alt=""></div>
            </div>
          </div>
          <div class="input-box">
            <el-input
              class="input"
              v-model="weekly.str.bannerUrl"
              placeholder="请输入链接"
            ></el-input>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 10px">商品(必须添加4个)</div>
      <div
        v-for="(item, index) in weekly.list"
        :key="index"
        class="item-banner"
      >
        <div class="img-box">
          <div class="img-upload">
            <div class="good-detail">
              <div class="good-img-box"><img :src="item.imgUrl" alt="" /></div>
              <div class="good-info">
                <div class="good-title">{{ item.title }}</div>
                <div class="good-id">{{ item.itemId }}</div>
                <div class="good-parce">
                  <span style="font-size: 12px">￥</span>{{ item.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="btns-box">
            <div
              class="upupup"
              @click="upGood(index,1)"
            ><img src="../assets/imgs/up.png" alt=""></div>
            <div
              class="upupup"
              @click="downGood(index,1)"
            ><img src="../assets/imgs/down.png" alt=""></div>
            <div
              class="upupup"
              @click="deleteGood(index,1)"
            ><img src="../assets/imgs/delete.png" alt=""></div>
          </div>
        </div>
      </div>

      <div class="add-banner1" @click="addGood(1)">
        添加
      </div>
      <div class="save-btn">
        <el-button type="primary" style="background:#FF5704;border:none" @click="saveItem(2)">发布</el-button>
      </div>
      <div style="height:50px"> </div>
    </div>
    <div class="home-box">
      <div class="title-item">区域特返</div>
      <div>
        <div style="margin-bottom: 10px">标题(500*50)</div>
        <div class="img-box-btn" v-if="!region.title">
     
            <el-upload
              style="width: 100%;height: 100%;line-height: 50px;"
              :show-file-list="false"
              :on-success="regionAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :headers="headerObj"
              :action="base_api + '/firstPage/uploadImg'"
            >
              <div style="color:#262626;">添加</div>
            </el-upload>
     
        </div>
        <div class="img-box" v-else>
          <div class="img-upload">
            <div class="title-img-info">
              <img :src="region.title" alt="" />
            </div>
          </div>
          <div class="btns-box">
            <el-upload
              :show-file-list="false"
              :on-success="regionAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :headers="headerObj"
              :action="base_api + '/firstPage/uploadImg'"
              class="avatar-uploader1"
            >
              <div class="upupup">
                  <img src="../assets/imgs/shuaxin.png" alt="">
              </div>
            </el-upload>
            <div
              class="upupup"
              @click="deleteTitle(2) "
            ><img src="../assets/imgs/delete.png" alt=""></div>
          </div>
        </div>
      </div>

      <div class="item-banner">
        <div style="margin-bottom: 10px">横幅(678*114)</div>
        <div class="img-box-btn" v-if="!region.str.banner">
       
            <el-upload
              style="width: 100%;height: 100%;line-height: 50px;"
              :show-file-list="false"
              :on-success="regionHengfSuccessBg"
              :before-upload="beforeAvatarUpload"
              :headers="headerObj"
              :action="base_api + '/firstPage/uploadImg'"
            >
              <div style="color:#262626;">添加</div>
            </el-upload>
        
        </div>
        <div v-else>
          <div class="img-box">
            <div class="img-upload">
              <div class="title-img-info1">
                <img :src="region.str.banner" alt="" />
              </div>
            </div>
            <div class="btns-box">
              <el-upload
                :show-file-list="false"
                :on-success="regionHengfSuccessBg"
                :before-upload="beforeAvatarUpload"
                :headers="headerObj"
                :action="base_api + '/firstPage/uploadImg'"
                class="avatar-uploader1"
              >
                <div class="upupup">
                  <img src="../assets/imgs/shuaxin.png" alt="">
                </div>
              </el-upload>
              <div
                class="upupup"
                @click="deleteHengfu(2)"
              ><img src="../assets/imgs/delete.png" alt=""></div>
            </div>
          </div>
          <div class="input-box">
            <el-input
              class="input"
              v-model="region.str.bannerUrl"
              placeholder="请输入链接"
            ></el-input>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 10px">商品(必须添加4个)</div>
      <div
        v-for="(item, index) in region.list"
        :key="index"
        class="item-banner"
      >
        <div class="img-box">
          <div class="img-upload">
            <div class="good-detail">
              <div class="good-img-box"><img :src="item.imgUrl" alt="" /></div>
              <div class="good-info">
                <div class="good-title">{{ item.title }}</div>
                <div class="good-id">{{ item.itemId }}</div>
                <div class="good-parce">
                  <span style="font-size: 12px">￥</span>{{ item.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="btns-box">
            <div
              class="upupup"
              @click="upGood(index,2)"
            ><img src="../assets/imgs/up.png" alt=""></div>
            <div
              class="upupup"
              @click="downGood(index,2)"
            ><img src="../assets/imgs/down.png" alt=""></div>
            <div
              class="upupup"
              @click="deleteGood(index,2)"
            ><img src="../assets/imgs/delete.png" alt=""></div>
          </div>
        </div>
      </div>

      <div class="add-banner1" @click="addGood(2)">
        添加
      </div>
      <div class="save-btn">
        <el-button type="primary" style="background:#FF5704;border:none" @click="saveItem(3)">发布</el-button>
      </div>
      <div style="height:50px"> </div>
    </div>
    <div class="home-box">
      <div class="title-item">云超直供</div>
      <div>
        <div style="margin-bottom: 10px">标题(500*50)</div>
        <div class="img-box-btn" v-if="!cloud.title">
          
            <el-upload
              style="width: 100%;height: 100%;line-height: 50px;"
              :show-file-list="false"
              :on-success="cloudAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :headers="headerObj"
              :action="base_api + '/firstPage/uploadImg'"
            >
               <div style="color:#262626;">添加</div>
            </el-upload>
          
        </div>
        <div class="img-box" v-else>
          <div class="img-upload">
            <div class="title-img-info">
              <img :src="cloud.title" alt="" />
            </div>
          </div>
          <div class="btns-box">
            <el-upload
              :show-file-list="false"
              :on-success="cloudAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :headers="headerObj"
              :action="base_api + '/firstPage/uploadImg'"
              class="avatar-uploader1"
            >
               <div class="upupup">
                  <img src="../assets/imgs/shuaxin.png" alt="">
                </div>
            </el-upload>
            <div
              class="upupup"
              @click="deleteTitle(3)"
            ><img src="../assets/imgs/delete.png" alt=""></div>
          </div>
        </div>
      </div>

      <div class="item-banner">
        <div style="margin-bottom: 10px">横幅(678*114)</div>
        <div class="img-box-btn" v-if="!cloud.str.banner">
          
            <el-upload
              style="width: 100%;height: 100%;line-height: 50px;"
              :show-file-list="false"
              :on-success="cloudHengfSuccessBg"
              :before-upload="beforeAvatarUpload"
              :headers="headerObj"
              :action="base_api + '/firstPage/uploadImg'"
            >
              <div style="color:#262626;">添加</div>
            </el-upload>
         
        </div>
        <div v-else>
          <div class="img-box">
            <div class="img-upload">
              <div class="title-img-info1">
                <img :src="cloud.str.banner" alt="" />
              </div>
            </div>
            <div class="btns-box">
              <el-upload
                :show-file-list="false"
                :on-success="cloudHengfSuccessBg"
                :before-upload="beforeAvatarUpload"
                :headers="headerObj"
                :action="base_api + '/firstPage/uploadImg'"
                class="avatar-uploader1"
              >
                <div class="upupup">
                  <img src="../assets/imgs/shuaxin.png" alt="">
                </div>
              </el-upload>
              <div
                class="upupup"
                @click="deleteHengfu(3)"
              ><img src="../assets/imgs/delete.png" alt=""></div>
            </div>
          </div>
          <div class="input-box">
            <el-input
              class="input"
              v-model="cloud.str.bannerUrl"
              placeholder="请输入链接"
            ></el-input>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 10px">商品(必须添加4个)</div>
      <div
        v-for="(item, index) in cloud.list"
        :key="index"
        class="item-banner"
      >
        <div class="img-box">
          <div class="img-upload">
            <div class="good-detail">
              <div class="good-img-box"><img :src="item.imgUrl" alt="" /></div>
              <div class="good-info">
                <div class="good-title">{{ item.title }}</div>
                <div class="good-id">{{ item.itemId }}</div>
                <div class="good-parce">
                  <span style="font-size: 12px">￥</span>{{ item.price }}
                </div>
              </div>
            </div>
          </div>
          <div class="btns-box">
            <div
              class="upupup"
              @click="upGood(index,3)"
            ><img src="../assets/imgs/up.png" alt=""></div>
            <div
              class="upupup"
              @click="downGood(index,3)"
            ><img src="../assets/imgs/down.png" alt=""></div>
            <div
              class="upupup"
              @click="deleteGood(index,3)"
            ><img src="../assets/imgs/delete.png" alt=""></div>
          </div>
        </div>
      </div>

      <div class="add-banner1" @click="addGood(3)">
        添加
      </div>
      <div class="save-btn">
        <el-button type="primary" style="background:#FF5704;border:none" @click="saveItem(4)">发布</el-button>
      </div>
      <div style="height:50px"> </div>
    </div>

    <el-dialog :width="'700px'" :visible.sync="dialogTableVisible4" title="选择商品">
      <!-- <div style="display:flex;margin:10px 0;">
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

      </div> -->
      <el-table
        :data="all_showList"
        style="width: 100%">
        <el-table-column
          label="商品id"
          width="70"
          prop="itemId"/>
        <el-table-column
          label="首图"
          align="left"
          width="100"
        >
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" width="60" height="60">
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
          :current-page.sync="currentPage"
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
      
      bannerIndex:'',//上传图片下标
      bannerList: [
        {
          banner:'',
          bannerUrl:''
        }
      ],
      weekly: {
        title:'',
        list:[],
        str:{
          banner:'',
          bannerUrl:''
        }
      },
      region: {
        title:'',
        list:[],
        str:{
          banner:'',
          bannerUrl:''
        }
      },
      cloud: {
        title:'',
        list:[],
        str:{
          banner:'',
          bannerUrl:''
        }
      },

      dialogTableVisible4: false,
      currentPage:1, // 当前页
      all_start: 1, // 起始页
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
      typeIndex:'',


    };
  },

  //Vue生命周期函数
  created() {
    // this.getUserList();
    // this.switchStatus();
    this.getHomeData()
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
      self.bannerList[this.bannerIndex].banner = res.result
    },
    // 标题图片上传
    weeklyAvatarSuccessBg(res, file) {
      this.weekly.title = res.result
    },
    regionAvatarSuccessBg(res, file) {
      this.region.title = res.result
    },
    cloudAvatarSuccessBg(res, file) {
      this.cloud.title = res.result
    },
    // 横幅上传
    weeklyHengfSuccessBg(res, file) {
      this.weekly.str.banner = res.result
    },
    regionHengfSuccessBg(res, file) {
      this.region.str.banner = res.result
    },
    cloudHengfSuccessBg(res, file) {
      this.cloud.str.banner = res.result
    },
    beforeAvatarUpload(file) {
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
        banner: "",
        bannerUrl: "",
      };

      this.bannerList.push(content);
    },
    // 添加商品
    addGood(type) {
        this.dialogTableVisible4 = true
        this.typeIndex = type
        this.currentPage = 1
        this.all_start = 1
        if(type===1) {
          this.getAllGoods()
        }else if(type===2) {
          this.getAllGoods()
        }else if(type===3) {
          this.getAllGoods()
        }
    },
    

    // 删除banner图
    deleteBanner(index) {
      console.log(index);
      this.bannerList.splice(index, 1);
      console.log(this.bannerList);
    },
    // 删除商品
    deleteGood(index,type) {
        if(type===1) {
            this.weekly.list.splice(index, 1);
        }else if(type===2) {
            this.region.list.splice(index, 1);
        }else if(type===3) {
            this.cloud.list.splice(index, 1);
        }
      
    },
    // 删除标题图片
    deleteTitle(type) {
      if(type===1) {
        this.weekly.title = "";
      }else if(type===2) {
        this.region.title = "";
      }else if(type===3) {
        this.cloud.title = "";
      }
    },

    // 删除横幅
    deleteHengfu(type) {
      if(type===1) {
        this.weekly.str.banner = "";
      }else if(type===2) {
        this.region.str.banner = "";
      }else if(type===3) {
        this.cloud.str.banner = "";
      }
    },

    async getHomeData() {
      const { data: res } = await this.$http.post("/firstPage/getfirstPageConfiguration",{});
      if(res.code=="801") {
        this.bannerList=res.result.classification_1.str
        this.weekly = res.result.classification_2
        this.region = res.result.classification_3
        this.cloud = res.result.classification_4
      }else {
        this.$message.error('获取信息失败')
      }
    },
    // 发布每一屏数据
    async saveItem(type) {
      let data = {}
      let ids = []
      if(type===1) {
       data.classification = type
       data.str = this.bannerList
      }else if(type===2) {
        this.weekly.list.forEach((val,i)=>{
          ids.push(val.itemId)
        })
        if(ids.length!==4) {
          this.$message.warning('必须上传四个商品！')
          return
        }
        data.classification = type
        data.title = this.weekly.title
        data.str=[]
        data.ids = ids.join(',')
        data.str.push(this.weekly.str)
      }else if(type===3) {
        this.region.list.forEach((val,i)=>{
          ids.push(val.itemId)
        })
        if(ids.length!==4) {
          this.$message.warning('必须上传四个商品！')
          return
        }
        data.classification = type
        data.title = this.region.title
        data.str=[]
        data.ids = ids.join(',')
        data.str.push(this.region.str)
      }else if(type===4) {
        this.cloud.list.forEach((val,i)=>{
          ids.push(val.itemId)
        })
        if(ids.length!==4) {
          this.$message.warning('必须上传四个商品！')
          return
        }
        data.classification = type
        data.title = this.cloud.title
        data.str=[]
        data.ids = ids.join(',')
        data.str.push(this.cloud.str)
      }
      console.log(111,data)
      
      const { data: res } = await this.$http.post("/firstPage/addfirstPageConfiguration",data);
      if(res.code=="801") {
        
         this.$message.success('发布成功！')

      }else if(res.code=="400") {
        this.$message.error('参数错误，请确认是否上传四个商品！')
      }else {
        this.$message.error('上传失败！')
      }
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
        const obj = self.weekly.list[index];
        const obj1 = self.weekly.list[index - 1];
        self.$set(self.weekly.list, index, obj1);
        self.$set(self.weekly.list, index - 1, obj);
        // 还有ids要处理
      }else if(type===2) {
        const self = this;
        const obj = self.region.list[index];
        const obj1 = self.region.list[index - 1];
        self.$set(self.region.list, index, obj1);
        self.$set(self.region.list, index - 1, obj);
        // 还有ids要处理
      }else if(type===3) {
        const self = this;
        const obj = self.cloud.list[index];
        const obj1 = self.cloud.list[index - 1];
        self.$set(self.cloud.list, index, obj1);
        self.$set(self.cloud.list, index - 1, obj);
        // 还有ids要处理
      }
      
      
    },
    downGood(index,type ) {
      const self = this;
      if(type===1) {
        if (index === self.weekly.list.length - 1) {
            return;
        }
        const obj = self.weekly.list[index];
        const obj1 = self.weekly.list[index + 1];
        self.$set(self.weekly.list, index, obj1);
        self.$set(self.weekly.list, index + 1, obj);
      }else if(type===2) {
          if (index === self.region.list.length - 1) {
            return;
        }
        const obj = self.region.list[index];
        const obj1 = self.region.list[index + 1];
        self.$set(self.region.list, index, obj1);
        self.$set(self.region.list, index + 1, obj);
      }else if(type===3) {
          if (index === self.cloud.list.length - 1) {
            return;
        }
        const obj = self.cloud.list[index];
        const obj1 = self.cloud.list[index + 1];
        self.$set(self.cloud.list, index, obj1);
        self.$set(self.cloud.list, index + 1, obj);
      }

    },

     // 获取全部商品列表
    async getAllGoods() {
      const self = this
      const { data: res } = await this.$http.get("/firstPage/getItems",{
        params:{
        pageNum: this.all_start,
        pageCount:5
        }
      });
      if(res.code=="801") {
        self.all_total = parseInt(res.result.total)
        self.all_showList = res.result.list
        self.markItem()
      }else {
        self.$message.error('获取商品失败！')
      }
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
      self.all_start = val
      self.getAllGoods()
    },

    AllsureSelect(item) {
      this.all_dataList.push(item)
      this.all_idList.push(item.itemId)
      this.markItem()
      // console.log('已经选中的数据', this.all_dataList)
    },

    markItem() { // 根据all_idList给被选好的数据进行标记  还要根据已经被选好存在的 丧心病狂
      const self = this
      // 根据我选好的
      this.all_idList.forEach(function(val, item, arr) {
        self.all_showList.forEach(function(v, i, a) {
          if (val == v.itemId) { // 被展示的该商品是被选中的
            self.$set(self.all_showList[i], 'select', 1)
          }
        })
      })
      // 根据已经存在的
      // console.log('已经存在的自定义商品', self.content.list[self.theIndex].floor_data)
      // console.log(111,self.theIndex1)
      if(this.typeIndex===1) {
        self.weekly.list.forEach(function(val, item, index) {
          self.all_showList.forEach(function(v, i, a) {
            if (val.itemId == v.itemId) { // 被展示的该商品是被选中的
              self.$set(self.all_showList[i], 'select', 1)
            }
          })
        })
      }else if(this.typeIndex===2) {
        self.region.list.forEach(function(val, item, index) {
          self.all_showList.forEach(function(v, i, a) {
            if (val.itemId == v.itemId) { // 被展示的该商品是被选中的
              self.$set(self.all_showList[i], 'select', 1)
            }
          })
        })
      }else if(this.typeIndex===3) {
        self.cloud.list.forEach(function(val, item, index) {
          self.all_showList.forEach(function(v, i, a) {
            if (val.itemId == v.itemId) { // 被展示的该商品是被选中的
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
        if (item.itemId == v.itemId) {
          self.$set(self.all_showList[i], 'select', 0)
        }
      })
      const newArr1 = []
      const newArr2 = []
      this.all_idList.forEach(function(v, i, a) {
        if (v != item.itemId) {
          newArr1.push(v)
        }
      })
      this.all_dataList.forEach(function(v, i, a) {
        if (v.itemId != item.itemId) {
          newArr2.push(v)
        }
      })
      this.all_idList = newArr1
      this.all_dataList = newArr2
      // console.log('已经选中的数据', this.all_dataList)

      // 从已经被保存好的以前的data中删除  因为不存在连续数据，用splice没事
      if(this.typeIndex===1) {
        this.weekly.list.forEach(function(v, i, a) {
          if (v.itemId == item.itemId) {
            this.weekly.list.splice(i, 1)
          }
        })
      }else if(this.typeIndex===2) {
        this.region.list.forEach(function(v, i, a) {
          if (v.itemId == item.itemId) {
            this.region.list.splice(i, 1)
          }
        })
      }else if(this.typeIndex===3) {
        this.cloud.list.forEach(function(v, i, a) {
          if (v.itemId == item.itemId) {
            this.cloud.list.splice(i, 1)
          }
        })
      }
      
      this.markItem() // 完美
    },

  // 保存选择的商品
   SaveAllGoods() {
      const self = this
      const arr1 = []
      const obj = {
       
      }
      self.all_dataList.forEach(function(val, ind, arr) {
        const ddd = JSON.stringify(obj)
        const obj2 = JSON.parse(ddd)
        arr1.push(obj2)
      })
      // console.log('空数据的', arr1)
      self.all_dataList.forEach(function(val, ind, arr) {
        // arr1[ind].param = val.itemId
        arr1[ind] = val
      })
      console.log('有数据的', arr1)
      // console.log('老数组', self.content.list[self.theIndex].floor_data)
      // console.log(222,self.theIndex1)
      if(self.typeIndex===1) {
        arr1.forEach(function(v, i, a) {
          self.weekly.list.push(v)
        })
        console.log(self.weekly)
        // console.log('保存拼接后的', self.content.list[self.theIndex].floor_data)
       
      }else if(self.typeIndex===2) {
        arr1.forEach(function(v, i, a) {
          self.region.list.push(v)
        })
      }else if(self.typeIndex===3) {
        arr1.forEach(function(v, i, a) {
          self.cloud.list.push(v)
        })
      }

      self.all_start = 1
      self.typeIndex = ''
      self.all_total = null
      // self.all_mcid = ''
      // self.all_keyWord = ''
      self.all_showList = []
      self.all_dataList = []
      self.all_idList = []

      self.dialogTableVisible4 = false
    }
  }
};
</script>
<style scoped>
.app-containers-box {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 80px;
  background: #f9f9f9;
  align-items: flex-start;
}
.home-box {
  width: 375px;
  min-height: 80vh;
  background: #fff;
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
  background: #FFFFFF;
  box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.1);
  border-radius: 11px;
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  cursor: pointer;
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
  object-fit: cover;
}
.title-img-info1 img {
  width: 100%;
  height: 100px;
  /* background: #fff; */
  border-radius: 12px;
  object-fit: cover;
}
/deep/ .el-upload {
  width: 100%;
}
/deep/ .avatar-uploader .el-upload {
  width: 100%;
  box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.1);
  border-radius: 11px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/* /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
} */
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
/* /deep/ .avatar-uploader1 .el-upload {
  width: 24px;
  height: 24px;
  border: 1px solid #999999;
  border-radius: 50%;
  line-height: 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
} */
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
.upupup img{
  width: 25px;
  height: 25px;
  cursor: pointer;
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
  height: 30px;
  background: #FFFFFF;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
}
.add-banner {
  width: 88%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #FFFFFF;
  box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.1);
  border-radius: 11px;
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  cursor: pointer;
}
.add-banner1 {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #FFFFFF;
  box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.1);
  border-radius: 11px;
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  cursor: pointer;
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
    
  box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.1);
  border-radius: 11px;
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
  font-size: 15px;
  color: #595959;
}
.good-title {
  font-size: 15px;
  color: #262626;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.good-parce {
  font-size: 16px;
  color: #FF5704;
  font-weight: bold;
}
</style>
