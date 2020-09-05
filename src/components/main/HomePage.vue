<template>
  <div class="" style="height: 100%;margin-top:0px;margin-left:0px;" >

    <el-row style=" height: 100%;margin-top:0px;margin-left:0px;">
  <el-col :span="18" style=" height: 100%;margin-top:0px;margin-left:0px;">
      <div id="imgbox" class="imgbox" :style="{'background-image': 'url(' + phtgrps[activePhtGrp].mainimg + ')'}">

            <table height=100% width=100%><tr>
              <td align=center width=5%>
                <div style="{height:380px}"  @mouseover="showIndex = 1" @mouseout="showIndex = 0" @click="showIndex = 1" :class="{'div-b':showIndex == 1}">
                  <span class="span-b" @click="movePhotoGrp( 0 )">&lt;&lt;</span>
               </div>
              </td>
              <td align=center width=90%>

              </td>
              <td align=center width=5%>
                <div style="{height:380px}"  @mouseover="showIndex = 2" @mouseout="showIndex = 0" @click="showIndex = 2" :class="{'div-b':showIndex == 2}">
                  <span class="span-b" @click="movePhotoGrp( 1 )">&gt;&gt;</span>
               </div>
              </td>
            </tr></table>

        <el-tooltip placement="top" v-for="(lbl, key) in phtgrps[activePhtGrp].lbls"  v-bind:key="key">
        <div slot="content" style="text-align: center">{{lbl.name}}<br/>原産地: <br/>価格:</div>
        <div class="goodslbl"  :style="{ top: lbl.topy + 'px', left: lbl.leftx + 'px' }"   @click="open(lbl)">
            <table height=100% width=100%><tr><td align=center>
              <span class="lblfont">{{lbl.name}}</span>
            </td></tr></table>
        </div>
        </el-tooltip>

    </div>
  </el-col>
  <el-col :span="6">
    <div class="infoMian" v-if="isInit">
        <div class="info">
          <div v-for="(item, key) in gdsDetail.items"  v-bind:key="key">
            <center>
            <table width=90%>
              <tr>
                <td colspan=2>
                  <label >{{item.name}}</label>
                  <div v-if="item.desp">
                    <span class="itemdesp" >{{item.desp}}</span>
                  </div>
                </td>
              </tr>
              <tr>
              <td width=50%>
                <img :src="item.src" height="100px" width="100px"/>
              </td>
              <td width=50% align=right class="goodsfont">
                  本体価格<br /> {{item.price}} 円 <br />
                  税込価格<br /> {{item.taxprice}} 円 <br />
                  <el-button type="success" plain >購入</el-button>
              </td>
            </tr>
            </table>
            </center>
          </div>
          <p></p>
          <center>
            <table width=90%><tr><td>
              <label >{{gdsDetail.name}}のお薦めレシビ：</label>
              <div  v-for="(lnk,key) in gdsDetail.links"  v-bind:key="key" >
                <br>
                <a class="rsblnk" @click="dispPop(lnk)">{{lnk.title}}</a><br/>
                <span class="itemdesp" v-if="lnk.text">{{lnk.text}}</span><br/>
                <img :src="lnk.src" height="100px" width="100px"/>
                <br>

                <p>
                </p>
              </div>
          </td></tr></table>
          </center>
        </div>
      </div>
      <div v-else class="infoMian">
          <div >
             <div  v-for="(lbl, key) in phtgrps[activePhtGrp].cmimgs"  v-bind:key="key" >
              <img class="cmimg" :src="lbl.imgsrc" :alt="lbl.cmtitle">
            </div>

          </div>
      </div>
    </el-col>
</el-row>

  <!-- GoodsTip -->


  <!-- レシビPOP -->
  <infoPop :show="show" :title="title" :rspid="rspid" @hidePop="hidePop" @submitPop="submitPop">

  </infoPop>

  </div>
</template>

<script>
import goodsLbl from '@/components/main/goodsLbl.vue'
import infoPop from '@/components/main/infoPop.vue'


export default {
  name: 'HomePage',
  data () {
    return {

      isInit:false,
      imgheight:'',
      imgwidth:'',
      x:'',
      y:'',
      gdsDetail:{
        'name':'',
        'sanchi':'',
        'price':''
      },
      gdsTips:{
        'name':'',
        'sanchi':'',
        'price':''
      },

      title: 'レシピ紹介',
      show: false,
      rspid:'',
      showIndex:0,
      phtgrps:[
      ],
      activePhtGrp:0,
    }
  },
  components: {
        infoPop
  },
  beforeRouteUpdate(to,from,next){
    //alert("router changed:" + to.params.grpid );
    this.setInit( to.params.grpid );
    next();
  },
  created:function () {
    // 手动发起的post请求，默认没有表单格式
    //通过post的第三个参数：emulateJSON: true，设置提交的内容类型为普通表单数据格式
    //alert("post start:" );
    var url = 'http://101.200.49.149/negdev/shop/goodsgrp.jsp';
    this.setInit( 1 );


　},
  mounted:function(){
    var imgbox=document.getElementById("imgbox");

    this.imgheight=imgbox.clientHeight;
    this.imgwidth=imgbox.clientWidth;

    this.x=(this.imgwidth/632);
    this.y=(this.imgheight/508);

  },

  methods: {
    open(lbl){
      this.gdsDetail = lbl;
      this.isInit=true;
    },
    // レシピ紹介POPの表示
    dispPop(lnk){
      this.rspid = lnk.rid;
      this.title = lnk.title;
      this.show = true;
    },

    hidePop() {
        // 取消弹窗回调
        this.show = false
    },

    submitPop() {
        // 确认弹窗回调
        this.show = false
    },

    movePhotoGrp( p ){
      if( p>0 ) this.activePhtGrp += 1;
      else this.activePhtGrp -= 1;

      if( this.activePhtGrp < 0 ) this.activePhtGrp = this.phtgrps.length-1;
      if( this.activePhtGrp > this.phtgrps.length-1 ) this.activePhtGrp = 0;
      // 显示CM
      this.isInit=false;

    },
    setInit( grpid ){
      if( grpid < 10 ){
        this.phtgrps = [

          {
          mainimg:'http://netengine.co.jp/static/upimg/shop/ys-03.jpg',
          cmimgs:[
            {
              cmid:'1',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm2.png',
              cmtitle:'',
            },
            {
              cmid:'2',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm3.png',
              cmtitle:'',
            },
            {
              cmid:'3',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm1.png',
              cmtitle:'',
            },
          ],
          lbls: [
                  {
                    'id':'3','name':'胡瓜',
                    'topy':'230','leftx':'445',
                    'items':[
                      {
                      'id':'3-1','name':'福島・山梨県などの国内産 きゅうり 1本',
                      'desp':'',
                      'src':'http://netengine.co.jp/static/upimg/goods/kyuri1.jpg',
                      'sanchi':'茨城県',
                      'price':'68',
                      'taxprice':'73',
                      },
                      {
                      'id':'3-2','name':'国内産 きゅうり 3本入 1袋',
                      'desp':'山梨県などの国内産きゅうり、お買い得の3本入り',
                      'src':'http://netengine.co.jp/static/upimg/goods/kyuri3.jpg',
                      'sanchi':'茨城県',
                      'price':'204',
                      'taxprice':'220',
                      },
                    ],
                    'links':[
                      {'rid':'20',
                      'title':'きゅうりとちくわのラー油炒め',
                      'link':'/info/1/page/2',
                      'src':'http://netengine.co.jp/static/upimg/rsp/rspkyuri01.jpg',
                      'text':'きゅうりを炒めておつまみやお弁当にぴったりのおかずにしました。簡単なので1品追加したい時にもおすすめです。'
                      },
                      {'rid':'21',
                      'title':'簡単！蛇腹キュウリとタコの酢の物',
                      'link':'/info/1/page/1',
                      'src':'http://netengine.co.jp/static/upimg/rsp/rspkyuri02.jpg',
                      'text':'お好みでワカメを入れても美味しいと思います。'
                      }
                      ],
                  },

            ],
          },
          {
          mainimg:'http://netengine.co.jp/static/upimg/shop/ys-04.jpg',
          cmimgs:[
            {
              cmid:'1',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm2.png',
              cmtitle:'',
            },
            {
              cmid:'2',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm3.png',
              cmtitle:'',
            },
            {
              cmid:'3',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm1.png',
              cmtitle:'',
            },
          ],
          lbls: [

                ],
          },
          {
          mainimg:'http://netengine.co.jp/static/upimg/shop/ys-05.jpg',
          cmimgs:[
            {
              cmid:'1',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm2.png',
              cmtitle:'',
            },
            {
              cmid:'2',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm3.png',
              cmtitle:'',
            },
            {
              cmid:'3',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm1.png',
              cmtitle:'',
            },
          ],
          lbls: [

                ],
          },
          {
          mainimg:'http://netengine.co.jp/static/upimg/shop/ys-06.jpg',
          cmimgs:[
            {
              cmid:'1',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm2.png',
              cmtitle:'',
            },
            {
              cmid:'2',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm3.png',
              cmtitle:'',
            },
            {
              cmid:'3',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm1.png',
              cmtitle:'',
            },
          ],
          lbls: [
                ],
          },


        ];
      }else{
        this.phtgrps = [
          {
          mainimg:'http://netengine.co.jp/static/upimg/shop/cml01.jpg',
          cmimgs:[
            {
              cmid:'1',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm3.png',
              cmtitle:'',
            },
            {
              cmid:'2',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm2.png',
              cmtitle:'',
            },
            {
              cmid:'3',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm3.png',
              cmtitle:'',
            },
            {
              cmid:'4',
              imgsrc:'../../assets/cm1.png',
              cmtitle:'',
            },
          ],
          lbls: [

                ],
          },

          {
          mainimg:'http://netengine.co.jp/static/upimg/shop/cml02.jpg',
          cmimgs:[
            {
              cmid:'1',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm2.png',
              cmtitle:'',
            },
            {
              cmid:'2',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm3.png',
              cmtitle:'',
            },
            {
              cmid:'3',
              imgsrc:'http://101.200.49.149/negdev/img/upimg/cm/cm1.png',
              cmtitle:'',
            },
          ],
          lbls: [

                ],
          },
        ];
      }

      this.activePhtGrp=0;
      // 显示CM
      this.isInit=false;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodslbl{
    background-image: url(http://101.200.49.149/negdev/img/static/timg.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position:absolute;
    width:50px;
    height:40px;
    opacity:0.9;
    display:table-cell;
}
.lblfont{
  font-size: 9px;
}
.goodsfont{
  font-size: 10px;
}
.infoMian{
  display: flex;
  justify-content: center;
  background: white;
  height: 92vh;
  overflow-y:auto;
}
.cmimg{
  width: 100%;
}
.info{
  margin-top: 20px;
}
.imgbox{
  height: 100%;
  width: 100%;
  position:relative;
  margin:0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.tips{
  height: 70px;
  width: 150px;
  background-color: black;
  position:fixed;
  color: #fff;
   box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
   text-align: center;
}
.rsblnk{
  color: rgb(201, 48, 27);
  text-decoration:underline
}
.itemdesp{
  color: rgb(151, 54, 130);
  font-size: 12px;
}
.div-b{
  height: 380px;
  text-align: center;
  line-height: 380px;
  background:rgb(0, 255, 157);padding:5px;color:#FFF;
  filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.6
}
.span-b{
  background:rgb(0, 255, 157);padding:5px;color:#000;
  filter:alpha(Opacity=30);-moz-opacity:0.3;opacity: 0.3
}
.infoMian::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}
.infoMian::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
}
.infoMian::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
</style>
