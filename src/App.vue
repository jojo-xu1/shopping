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
        <router-view/>
      </keep-alive>
        <!--<FooterGuide  />-->
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
      </router-view>

    </el-main>

  </el-container>
  <Footer/>
  <div class="gotop" v-show="gotop" @click="toTop">Top</div>
  </div>

</template>

<script>
import Footer from '@/components/footer/Footer.vue'
export default {
  name: 'App',
  components:{Footer},
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

    }
  },
   mounted() {
     window.addEventListener("scroll", this.handleScroll, true);
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
