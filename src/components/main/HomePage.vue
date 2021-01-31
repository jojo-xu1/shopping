<template>
  <div class="" style="height: 100%;margin-top:0px;margin-left:0px;" >

    <el-row style=" height: 100%;margin-top:0px;margin-left:0px;">
  <el-col :span="18" style=" height: 100%;margin-top:0px;margin-left:0px;">
      <div @click="bigImgClick" id="imgbox" class="imgbox" :style="{'background-image': 'url(' + $webUrl + '/shopping/upimg/' + phtall[activePhtGrp].catimg_path + ')'}">

            <table height=100% width=100%>
              <tr >
              <td align=center width=5%>
                <div :style="{height:'380px',display:slideShow}"  @mouseover="showIndex = 1" @mouseout="showIndex = 0" @click="movePhotoGrp( 0 )" :class="{'div-b':showIndex == 1}">
                  <span class="span-b" >&lt;&lt;</span>
               </div>
              </td>
              <td align=center width=90%>

              </td>
              <td align=center width=5%>
                <div :style="{height:'380px',display:slideShow}"  @mouseover="showIndex = 2" @mouseout="showIndex = 0" @click="movePhotoGrp( 1 )" :class="{'div-b':showIndex == 2}">
                  <span class="span-b">&gt;&gt;</span>
               </div>
              </td>
            </tr>
            </table>

        <div class="goodslbl" v-for="(lbl, key) in curLbls"  v-bind:key="key" :style="{ display:lblShow, top: (imgheight * lbl.lbl_pst_y) + 'px', left: (imgwidth*lbl.lbl_pst_x) + 'px', 'background-image': 'url(' + 'http://13.112.112.160/shopping/upimg/' + getLblImg(lbl.sales_type) + ')' }"  @mouseover="showLbl(lbl)" @mouseout="hid"  @click="openLbl(lbl)" >
            <table height=100% width=100%><tr><td align=center>
              <span class="lblfont">{{lbl.goods_name}}</span>
            </td></tr></table>
        </div>

        <!-- Slide -->
        <div class="slidediv" :style="{display:slideShow}">
          <el-slider
            v-model="slideModel"
            :format-tooltip="formatSlideTip"
            :max="slideAmount"
            :show-tooltip="false"
            @change="slideChange">
          </el-slider>
        </div>

        <div class='slideImg' :style="{'background-image': 'url(' + $webUrl + '/shopping/upimg/' + nowSlideImg + ')', top: '38px', left: slideImgLeft + 'px', display:slideImgShow}">

        </div>

    </div>
  </el-col>
  <el-col :span="6">
    <div class="infoMian scoll-1" v-if="isInit">
        <div class="info">
          <div v-for="(item, key) in gdsDetail.items"  v-bind:key="key">
            <center>
            <table width=90%>
              <tr>
                <td colspan=2>
                  <label >{{item.item_name}}</label>
                  <div v-if="item.item_desp">
                    <span class="itemdesp" >{{item.item_desp}}</span>
                  </div>
                </td>
              </tr>
              <tr>
              <td width=50%>
                <img :src="$webUrl + '/shopping/upimg/' +item.itemimg" height="100px" width="100px"/>
              </td>
              <td width=50% align=right class="goodsfont">
                  本体価格<br /> {{item.price}} 円 <br />
                  税込価格<br /> {{item.taxprice}} 円 <br />
                  <el-button type="success" plain @click="addToCart(item)">購入</el-button>
              </td>
            </tr>
            </table>
            </center>
          </div>
          <p></p>
          <center>
            <table width=90%><tr><td>
              <label >{{gdsDetail.goods_name}}のお薦めレシビ：</label>
              <div  v-for="(lnk,key) in gdsDetail.links"  v-bind:key="key" >
                <br>
                <a class="rsblnk" @click="dispPop(lnk)">{{lnk.rsp_name}}</a><br/>
                <span class="itemdesp" v-if="lnk.text">{{lnk.rep_desp}}</span><br/>
                <img :src=" $webUrl + '/shopping/upimg/' + lnk.rsp_img" height="100px" width="100px"/>
                <br>

                <p>
                </p>
              </div>
          </td></tr></table>
          </center>
        </div>
      </div>
      <div v-else class="infoMian scoll-1">
          <div >
             <div  v-for="(cm, key) in cmall"  v-bind:key="key" >
              <img class="cmimg" :src="$webUrl + '/shopping/upimg/' + cm.cm_img" :alt="cm.cm_title">
            </div>

          </div>
      </div>
    </el-col>
</el-row>

  <!-- GoodsTip -->
  <div class="tips" id="tips" hidden="true">
      <label > {{gdsTips.name}}</label>
      <br/>
      <label >原産地：</label> {{gdsTips.sanchi}}
      <br>
       <label >価格：</label>{{gdsTips.price}}
  </div>

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
      imgheight:600,
      imgwidth:800,
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
      lbls:[{lbl_id:0,catimg_id:0,goods_id:0,lbl_pst_x:0,lbl_pst_y:0,cat_id:0,goods_name:''}],
      curLbls:[],
      itemall:[{item_id:0,item_name:'',goods_id:0,item_desp:'',price:0,taxprice:0,itemimg:''}],
      cmall:[{cm_id:0,cat_id:0,cm_title:'',cm_img:''}],
      lbltypelist:[{sales_type:'',lbl_path:'',lbl_name:''}],
      activePhtGrp:0,
      slideModel:0,
      nowSlideImg:'',
      slideAmount:3,
      slideImgLeft:5,
      slideImgShow:'none',
      slideMoved:false,
      slideShow:'block',
      lblShow:'block',
      currentCat:5,
      phtall:[{catimg_id:0, catimg_path:'', catimg_mini:'',cat_id:0}],
      rsps:[],
      cartList:[],
    }
  },
  components: {
        infoPop
  },
  beforeRouteUpdate(to,from,next){
    console.log("router changed:" + to.params.cat_id );
    if(this.currentCat !== to.params.cat_id){
      this.currentCat = to.params.cat_id
      this.setInit( this.currentCat );
    }else{
      this.getCurLbls()
    }
    //activePhtGrp
    this.activePhtGrp = 0
    for(var i in this.phtall){
      if( this.phtall[i].cat_id == to.params.cat_id){
        this.activePhtGrp = i
        break
      }
    }
    console.log("beforeRouteUpdate this.activePhtGrp:" + this.activePhtGrp );
    console.log("beforeRouteUpdate this.currentCat:" + this.currentCat );


    next();
    //this.slideModel = this.activePhtGrp
  },

  created:function () {
    if(this.$route.query) {
      console.log("I am not here")
      var cat_id = ""
      cat_id = this.$route.params.cat_id;
      console.log("Homepage created cat_id:" + cat_id)
      this.currentCat = 5
      this.activePhtGrp = 0
      //this.slideModel = 0
      //this.setInit(this.currentCat);
    }
    //

　},
  mounted:function(){
    var imgbox=document.getElementById("imgbox");
    console.log("imgbox.clientHeight:" + imgbox.clientHeight)
    this.imgheight=imgbox.clientHeight;
    this.imgwidth=imgbox.clientWidth;

    console.log("imgbox.clientHeight:" + this.imgheight)

    this.x=(this.imgwidth/632);
    this.y=(this.imgheight/508);

    //ラベル画像取得
    //lbltypelist:[{sales_type:'',lbl_path:'',lbl_name:''}],
      var sql = "select distinct sales_type, lbl_path, lbl_name"
      sql += " from ns_label_img"
      sql += " where (delflg is null or delflg <> '1') "
      var req = {
        "mode":"select",
        "selectsql":sql
      }
      this.axios.post(this.$baseUrl + '/web.do',req).then((response)=>{
        console.log("lbltypelist get data:" , response.data)
        this.lbltypelist = response.data.data
      }).catch((response)=>{
        console.log("lbltypelist  error!" + response);
      })

    //すべて画像取得
      sql = "select catimg_id, catimg_path, catimg_mini,cat_id from ns_catimg "
      sql += " where (delflg is null or delflg <> '1') "
      req = {
        "mode":"select",
        "selectsql":sql
      }
      this.axios.post(this.$baseUrl + '/web.do',req).then((response)=>{
        console.log("すべて画像取得 get data:" , response.data)
        this.phtall = response.data.data
        this.slideAmount = this.phtall.length-1
      }).catch((response)=>{
        console.log("すべて画像取得  error!" + response);
      })

      //
      this.currentCat = 5
      this.activePhtGrp = 0
      this.setInit(this.currentCat);

  },

  methods: {
    async openLbl(lbl){
      this.gdsDetail = lbl;
      this.gdsDetail.items = this.getGoodsItems( lbl.goods_id )
      console.log("show details info")
      console.log(this.gdsDetail.items)
      this.gdsDetail.links = await this.getGoodsRsp( lbl.goods_id )
      console.log( "openLbl links.length: " +  this.gdsDetail.links.length )
      console.log(this.gdsDetail.links)
      this.isInit=true;
    },
    showLbl(lbl,event){
      var tips=document.getElementById("tips");
      var e = event || window.event;
      var x=e.screenX;
      var y=e.screenY;
      tips.style.left=(x-45)+"px";
      tips.style.top=y-150+"px";
      // 设定显示的值
      //this.gdsDetail.name = lbl.name;
      //this.gdsDetail.sanchi = lbl.sanchi;
      this.gdsTips = lbl;
      //tips.hidden=false;
      console.log();
    },
    hid(){
      var tips=document.getElementById("tips");
      tips.hidden=true;
    },
    // レシピ紹介POPの表示
    dispPop(lnk){
      this.rspid = lnk.rsp_id;
      this.title = lnk.rsp_name;
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

      if( this.activePhtGrp < 0 ) this.activePhtGrp = this.phtall.length-1;
      if( this.activePhtGrp > this.phtall.length-1 ) this.activePhtGrp = 0;

      if(this.currentCat !== this.phtall[this.activePhtGrp].cat_id){
        this.currentCat = this.phtall[this.activePhtGrp].cat_id
        this.setInit( this.currentCat );
      }else{
        this.getCurLbls()
      }

      this.slideMoved = true
      // 显示CM
      this.isInit=false;
      this.slideModel = this.activePhtGrp

    },
    getCurLbls(){
      //console.log("getCurLbls, this.lbls.length:" + this.lbls.length)
      this.curLbls = []
      for(var i in this.lbls){
        console.log("this.lbls[i].cat_id:" + this.lbls[i].cat_id)
        if( this.lbls[i].catimg_id == this.phtall[this.activePhtGrp].catimg_id){
          console.log("getCurLbls add lbl")
          this.curLbls.push( this.lbls[i])
        }

      }
    },
    getGoodsItems( gid ){
      console.log("getGoodsItems start")
      var itms = []
      for(var i in this.itemall){
        if( this.itemall[i].goods_id == gid ){
          console.log("getGoodsItems add item")
          itms.push( this.itemall[i])
        }
      }
      return itms
    },
    async getGoodsRsp( gid ){
      console.log("getGoodsRsp start")
      // var rsps = []
      var sql = "select distinct a.rsp_id, a.rsp_name, a.rep_desp ,a.rsp_img, a.rsp_metial"
      sql += " from ns_rsp a"
      sql += " left join ns_rspgoods g on g.rsp_id = a.rsp_id and g.goods_id = " + gid
      sql += " where (a.delflg is null or a.delflg <> '1') and g.goods_id = " + gid
      var req = {
        "mode":"select",
        "selectsql":sql
      }
      await this.axios.post(this.$baseUrl + '/web.do',req).then((response)=>{
        console.log(response.data)
        this.rsps = response.data.data
      }).catch((response)=>{
        console.log("Homepage getGoodsRsp  error!" + response);
      })
      return this.rsps 
    },
    getLblImg(sales_type){
      var nImg = "lbl/tag.gif"
      for(var i in this.lbltypelist){
        if( this.lbltypelist[i].sales_type == sales_type ){
          nImg =  this.lbltypelist[i].lbl_path
        }
      }
      return nImg
    },
    slideChange(value){
      //alert("slideChange:"+value)
      this.slideImgShow = 'none'
      this.activePhtGrp = this.slideModel
      //currentCat取得
      if( this.currentCat !== this.phtall[this.activePhtGrp].cat_id){
        this.currentCat = this.phtall[this.activePhtGrp].cat_id
        this.setInit(this.currentCat)
      }else{
        this.getCurLbls()
      }

      // 显示CM
      this.isInit=false;

    },
    formatSlideTip(val) {
        //return val / 100
        var str = this.phtall[val].catimg_mini
        console.log("this.phtall[val]", this.phtall[val])
        //return document.createElement(str)
        this.nowSlideImg = str
        // slideImgLeft
        this.imgwidth=imgbox.clientWidth;
        this.slideImgLeft = this.imgwidth * val / this.slideAmount
        if( this.slideImgLeft > this.imgwidth - 120) this.slideImgLeft = this.imgwidth - 120
        if( val == 0 && !this.slideMoved ) this.slideImgShow = 'none'
        else{
          this.slideImgShow = 'block'
          this.slideMoved = true
        }
        return ''
    },
    bigImgClick(){
      if( this.slideShow === 'block'){
         this.lblShow = 'block'
         this.slideShow = 'none'
      }else{
         this.lblShow = 'none'
         this.slideShow = 'block'
      }
    },
    async setInit( cat_id ){
      console.log( "Homepage setInit cat_id:" + cat_id )
      console.log( "i am there")
      var req = {
        "mode":"select",
        "selectsql":"select catimg_id, catimg_path, catimg_mini,cat_id from ns_catimg where cat_id=" + cat_id
      }

      // labelを取得する
      console.log("i am here")
      this.lbls = [];
      var sql = 'select l.lbl_id,l.catimg_id,l.sales_type, l.goods_id,l.lbl_pst_x,l.lbl_pst_y,c.cat_id'
      sql += ',g.goods_name'
      sql += ' from ns_label l'
      sql += ' left join ns_catimg c on c.catimg_id = l.catimg_id'
      sql += ' left join ns_goods g on g.goods_id = l.goods_id'
      sql += ' where (l.delflg is null or l.delflg <> 1) and c.cat_id = ' + cat_id
      var req = {
        'mode': 'select',
        'selectsql': sql
      }
      await this.axios.post(this.$baseUrl + '/web.do',req).then((response)=>{
        console.log(response.data)
        this.lbls = response.data.data
      }).catch((response)=>{
        console.log("Homepage setInit get ns_lbl error!" + response);
      })
      this.getCurLbls()

      //商品品目を取得する
      this.items = [];
      var sql = "select a.item_id,a.item_name,a.goods_id,g.cat_id"
      sql += " ,a.item_desp,a.price,a.taxprice,a.itemimg"
      sql += " from ns_item a"
      sql += " left join ns_goods g on g.goods_id = a.goods_id"
      sql += " where (a.delflg is null or a.delflg <> '1') and g.cat_id = " + cat_id
      req = {
        "mode":"select",
        "selectsql":sql
      }
      await this.axios.post(this.$baseUrl + '/web.do',req).then((response)=>{
        console.log(response.data)
        this.itemall = response.data.data
      }).catch((response)=>{
        console.log("Homepage setInit get ns_lbl error!" + response);
      })

      //広告を取得する
      this.items = [];
      var sql = "select a.cm_id,a.cat_id,a.cm_title,a.cm_img"
      sql += " from ns_cm a"
      sql += " where a.cat_id = " + cat_id
      req = {
        "mode":"select",
        "selectsql":sql
      }
      await this.axios.post(this.$baseUrl + '/web.do',req).then((response)=>{
        console.log(response.data)
        this.cmall = response.data.data
      }).catch((response)=>{
        console.log("Homepage setInit get ns_cm error!" + response);
      })

      // 显示CM
      this.isInit=false;
    },
    async addToCart(addItem){
      this.cartList = []

      //await this.axios.get(this.$baseUrl + '/cat-info').then((response)=>{
        console.log('get cat info')
        //console.log(response.data)
        //this.cartList = response.data.tableData
        //localStorage.removeItem('tableData')
        var records = localStorage.getItem('cartList')
        console.log(records)
        this.cartList = JSON.parse(records)
        console.log(this.cartList)
        var hasRecord = false;
        for(var i in this.cartList){
          if( this.cartList[i].itemId == addItem.item_id ){
            this.cartList[i].num += 1
            hasRecord = true
            break
          }
        }
        if(hasRecord === false){
          if(this.cartList == null){
            this.cartList = []
          }
          let str = Number((addItem.taxprice/addItem.price)-1)
          var sui = str.toFixed(2)
          var cartRecord = {'src':this.$webUrl + '/shopping/upimg/'+addItem.itemimg,'itemId':addItem.item_id,'prodName':addItem.item_name,'price':addItem.price,'num':1,'sui':sui}
          console.log("new record")
          console.log(cartRecord)
          this.cartList.push(cartRecord)
        }

        console.log("latest cartList")
        console.log(this.cartList)
        localStorage.setItem('cartList',JSON.stringify(this.cartList));
        //console.log(JSON.stringify(this.cartList))
        this.axios.post(this.$baseUrl + '/cat-modify',JSON.stringify(this.cartList)).then((response)=>{

          console.log(response.data)
        }).catch((response)=>{
          console.log("cat-modify error!" + response);
        })

      //}).catch((response)=>{
      //  console.log("cat-info error!" + response);
      //})

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodslbl{
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position:absolute;
    width:120px;
    height:80px;
    opacity:0.9;
    display:table-cell;
}
.slidediv{
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position:absolute;
    width:100%;
    height:20px;
    opacity:0.9;
    display:table-cell;
    top: 5px;
    left: 10px;
}
.slideImg{
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position:absolute;
    width:100px;
    height:100px;
    opacity:0.9;
    display:table-cell;
    top: 30px;
    left: 30px;
}
.lblfont{
  font-size: 16px;
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
.scoll-1::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
.scoll-1::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
         -webkit-box-shadow: inset 0 0 2px rgba(99, 218, 44, 0.5);
        background: #aae4b7;
    }
.scoll-1::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 2px rgba(99, 218, 44, 0.5);
        border-radius: 5px;
        background: #e9dede;
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
</style>
