<template>
  <div id="app" >

    <el-container>
    <el-aside width="250px" style="overflow: hidden;">

      <el-menu
      default-active="1"
      router
      class="el-menu-vertical-demo">
      <div class="kago_s">
        <div class="line_s"></div><span>カードにある品物： <el-link type="info" @click="handleSelect">10点</el-link></span>
      </div>
      <div class="kago_s">
      <div class="line_s"></div><span>合計金額（税込）：8800円</span>
    </div>
      <div class="serch">
        <el-input  v-model="input" placeholder="検索してみよう"></el-input>
        <div class="serchBut">
          <el-button style="width: 240px;" type="info" icon="el-icon-search">スピーディー検索</el-button>
        </div>

      </div>

      <el-tree
        :props="defaultProps"
        :load="loadNode"
        lazy
        @node-click="handleNodeClick"
      />

    </el-menu>
    </el-aside>
    <el-main style="background-color: blanchedalmond;margin-top:0px;margin-left:0px;padding:0;overflow:hidden;">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view @refreshTable="refreshTable" />
      </keep-alive>
        <!--<FooterGuide  />-->
      <router-view v-if="!$route.meta.keepAlive" @refreshTable="refreshTable">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
      </router-view>

    </el-main>

  </el-container>
  <Footer ref='footer'/>
  <div class="gotop" v-show="gotop" @click="toTop">Top</div>
  <div class="goCart" v-show="searchBarFixed" @click="handleSelect">
    <li>カードへ<i class="iconfont icon-jiantouxia"></i></li>
  </div>
  <div class="goLogin" v-show="finishLogin == false" @click="loginSubmit">
    ログイン<i class="iconfont icon-jiantouxia"></i>
  </div>
  <div class="goLogin" v-show="finishLogin" @click="logoutSubmit">
    ログアウト<i class="iconfont icon-jiantouxia"></i>
  </div>
  <loginIndex :show="visibleComponent" @hidePop="hidePop" @submitPop="submitPop" @showSignup="showSignup">
  </loginIndex>
   <signupIndex :show="visibleSignup" @hidePop="hidePop" @submitPop="submitPop">
  </signupIndex>
  </div>
</template>

<script>
import Footer from '@/components/footer/Footer.vue'
import loginIndex from '@/components/login/login.vue'
import signupIndex from '@/components/login/signup.vue'

export default {
  name: 'App',
  components:{Footer,loginIndex,signupIndex},
  data(){
    return {
      input: '',
      gotop: false,
      defaultProps: {
        label: 'cat_name',
        isLeaf: 'leaf'
      },
      listall: [
        { cat_id: 1, cat_name: 'xxx', parent_id: 0 }
      ],
      searchBarFixed:true,
      visibleComponent:false,
      visibleSignup:false,
      finishLogin:false
    }
  },
   mounted() {
     window.addEventListener("scroll", this.handleScroll, true);
     var token = localStorage.getItem('tttocken');
     if (token) {
       console.log("has logined")
       this.finishLogin = true
     }else {
       console.log("not yet logined")
       this.finishLogin = false
     }
   },
   methods: {
    async loadNode(node, resolve) {
      console.log('loadNode start')
      if (node.level === 0) {
        var req = {
          "mode":"select",
          "selectsql":"select cat_id, cat_name, parent_id from ns_cat where delflg is null or delflg <> '1'"
        }
        await this.axios.post(this.$baseUrl + '/web.do',req).then((response)=>{
          console.log(response.data)
          this.listall = response.data.data
        }).catch((response)=>{
          console.log(response);
        })
        return resolve(this.getnode(0))
      }
          this.$router.push({
              path:"/main/" + node.cat_id,//这个path就是你在router/index.js里边配置的路径
              query:{
                    cat_id:node.cat_id
              }
          })
          console.log("node is selected")
      return resolve(this.getnode(node.data.cat_id))
    },
    getnode(parentid) {
      console.log("enter getnode"+parentid)
      var nlist = []
      for (var prop in this.listall) {
        if (parentid === this.listall[prop].parent_id) { nlist.push(this.listall[prop]) }
      }
      return nlist
    },
    handleNodeClick(node,data,value) {
      //if(node.parent_id !== 0 ){
          //console.log("node.cat_id111:" + node.cat_id)
          //this.$router.push({name:'main',params:{cat_id:node.cat_id}})
          this.$router.push({
              path:"/main/" + node.cat_id,//这个path就是你在router/index.js里边配置的路径
              query:{
                    cat_id:node.cat_id
              }
          })
          console.log("node is selected")
      //}
    },
    handleScroll() {
      //注意不同浏览器之间的兼容性
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
      toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
      },
      handleSelect() {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        var aside=document.getElementsByClassName("el-aside")[0];
        const timeBot = setInterval(() => {
        if (top+windowHeight >= windowHeight+aside.clientHeight+10) {
          clearInterval(timeBot);
        }
        if (top+windowHeight < windowHeight+aside.clientHeight+10) {
        document.body.scrollTop = document.documentElement.scrollTop = top +=10;
        }
        }, 1);
      },
      loginSubmit(){
        this.visibleComponent = true
      },
      showSignup(){
        console.log('signup')
        this.visibleComponent = false
          this.visibleSignup = true
      },
      logoutSubmit(){
        console.log("router")
        console.log(this.$router)
        localStorage.removeItem('tttocken')
        localStorage.removeItem("cartList")
        this.finishLogin = false
        this.$refs.footer.shoppingcardShow = true
        this.$refs.footer.deliveryHistoryShow = false
        this.$refs.footer.orderHistoryShow = false
        this.$refs.footer.activeIndex = 1
        this.$message({
            type: 'success',
            message: 'ログアウトしました。'
            })
      },
      hidePop(popName) {
        // 取消弹窗回调
        if(popName == 'login') {
          this.visibleComponent = false
        } else if(popName == 'signup') {
          this.visibleSignup = false
        } else {
          this.visibleComponent = false
          this.visibleSignup = false
        }
      },
      submitPop() {
          // 确认弹窗回调
          this.visibleComponent = false
          console.log("has logined")
          this.finishLogin = true
      },
      refreshTable(){
        console.log("i am in")
        this.$refs.footer.init()
      }
   }
}
</script>

<style>
#app{
width: 100%;
  height: 100%;
}
.serchBut {
  width: 250px;
  margin-top: 10px;
  margin-bottom: 10px;

}

.serch{
  width: 240px;

}

.el-menu{
  height: 100%;
}
.el-container{
  height: 92vh;
}
  .el-main {
    padding: 0;
    overflow: hidden;
  }
  .gotop {
  text-align: center;
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  background: white;
  color: #000000;
  border: 1px solid #000000;
}
.goCart{
  text-align: center;
  position: fixed;
  right: 30px;
  top: 10px;
  cursor: pointer;
  padding: 10px;
  background: #67C23A;
  color: #000000;
  border: 1px solid #000000;
}
.goLogin{
  text-align: center;
  position: fixed;
  right: 150px;
  top: 10px;
  cursor: pointer;
  padding: 10px;
  background: white;
  color: #000000;
  border: 1px solid #000000;
}
.kago_s{
  height: 20px;
  width: 100%;
  line-height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 0.8rem;
  display:flex;

}
.line_s{
  height: 20px;
  width: 2px;
  background:rgb(255, 0, 0);
  margin-right: 0.6rem;

}
.el-menu-item-group__title{
  display: none;
}
</style>
