<template>
  <div class="footer" id="footer">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
    <el-menu-item index="1">カード</el-menu-item>
    <el-menu-item index="2">配送状況</el-menu-item>
    <el-menu-item index="3">注文履歴</el-menu-item>
    <el-menu-item index="4">個人設定</el-menu-item>
    <el-menu-item index="5">問い合わせ</el-menu-item>
  </el-menu>
  <div class="submain">
    <div class="kago">
      <div class="line"></div><span>品物</span>
    </div>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'#F2F6FC'}"
        style="width: 100%">
        <el-table-column
          label="商品名"
          width="550px"
          align="center"
        >
        <template slot-scope="scope">
          <div class="prodName">
              <div style="margin-right: 0.5rem;color:#F500F5">
                  <i class="el-icon-star-off"></i>
              </div>
              <div>
                  <el-image
                    style="width: 80px; height: 80px"
                    :src="scope.row.src"
                    ></el-image>
              </div>
              <div style="margin-left: 0.5rem;font-size:1.2rem;text-align: left;margin-top:25px">
                <span>{{scope.row.prodName}}</span>
              </div>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品価格">
          <template slot-scope="scope">
            <div style="font-size:1.2rem;text-align: right;margin-top:10px;margin-bottom: 10px;">
                {{scope.row.price}}円
            </div>
            <div style="font-size:0.6rem;text-align: right;">
                税込価格
            </div>
            <div style="font-size:1.2rem;text-align: right;margin-bottom: 10px;">
                {{(scope.row.price*(1+scope.row.sui)).toFixed(2)}}円
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="数量">
          <template slot-scope="scope">
              <div style="display:flex;justify-content: center;">
                <el-input-number v-model="scope.row.num" controls-position="right"  :min="1" :max="10"></el-input-number>
              </div>
          </template>
        </el-table-column>
         <el-table-column
          align="center"
          label="合計">
          <template slot-scope="scope">
            <div style="text-align: right;font-size:1.2rem;font-weight: bold;">
                {{scope.row.price*scope.row.num}}円
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="税率">
          <template slot-scope="scope">
            <div style="text-align: right;font-size:1rem;">
               外税
            </div>
            <div style="text-align: right;font-size:1rem;">
                {{scope.row.sui*100+'.0%'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="削除">
          <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"

          circle
          >
          X
        </el-button>
      </template>
        </el-table-column>
      </el-table>
      <span style="text-align: right;float:right;margin-top: 20px;">税率8.0%は軽減税率対象商品です</span>
      <el-button type="success" style="margin-top: 20px;" @click="orderSubmit">注文へ</el-button>
  </div>
<loginIndex :show="visibleComponent" @hidePop="hidePop" @submitPop="submitPop">

  </loginIndex>
  </div>
 
</template>

<script>
import lj from '@/assets/lj.jpg'
import tmt from '@/assets/tmt.jpg'
import rg from '@/assets/rg.jpg'
import dk from '@/assets/dk.jpg'
import loginIndex from '@/components/login/login.vue'
export default {
  name: 'Footer',
  data () {
    return {
      activeIndex: '1',
      tableData:[{'src':lj,'prodName':'オランダなどの外国産 パプリカ（黄）1個','price':128,'num':2,'sui':0.08},
                 {'src':tmt,'prodName':'トップバリグリーンアイ有機野菜 北海道などの国内産 350g 1袋','price':398,'num':1,'sui':0.08},
                 {'src':rg,'prodName':'茨城県などの国内産 レンコン 200g 1袋','price':496,'num':1,'sui':0.08},
                 {'src':dk,'prodName':'青森・千葉県などの国内産 だいこん 1/2カット （葉の部分）','price':99,'num':1,'sui':0.08},
                ],
      visibleComponent: false,
    }
  },
    components: {
        loginIndex
  },
  methods: {
      handleSelect(key, keyPath) {
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
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      orderSubmit(){
        var token = localStorage.getItem('tttocken');
        localStorage.removeItem('tttocken');
        if(!token){
          this.visibleComponent = true
          console.log( 'ordersubmit'+this.visibleComponent)
        }
      },
      onSubmit(){
        console.log('loginSubmit')
      },
         hidePop() {
        // 取消弹窗回调
        this.visibleComponent = false
      },
      submitPop() {
          // 确认弹窗回调
          this.visibleComponent = false
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.submain{
  height: 100vh;

}

.kago{
  height: 50px;
  width: 100%;
  line-height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bolder;
  font-size: 1.2rem;
  display:flex;

}
.line{
  height: 50px;
  width: 5px;
  background:#FF00FF;
  margin-right: 1.2rem;

}
.prodName{
  display:flex;

}
</style>
