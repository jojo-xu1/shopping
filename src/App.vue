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
      <el-submenu index="1">
        <template slot="title">
          <span style="font-weight: bold;">調味料、ビン類</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/main/12">醤油類</el-menu-item>
          <el-menu-item index="/main/13">油</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span style="font-weight: bold;">野菜・くだもの</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/main/1">根菜、芋類</el-menu-item>
          <el-menu-item index="/main/2">葉物</el-menu-item>
          <el-menu-item index="/main/3">サラダ菜</el-menu-item>
          <el-menu-item index="/main/4">香味野菜、きのこ</el-menu-item>
          <el-menu-item index="/main/5">カット野菜</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

    </el-menu>
    </el-aside>
    <el-main style="background-color: blanchedalmond;margin-top:0px;margin-left:0px;padding:0;overflow:hidden;">
      <router-view />

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
    }
  },
   mounted() {
     window.addEventListener("scroll", this.handleScroll, true);
   },
   methods: {
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
