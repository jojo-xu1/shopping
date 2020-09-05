<template>
	<div class="modal-bg" v-show="show" @mousemove="modalMove" @mouseup="cancelMove">
        <div class="modal-container">
            <div class="modal-header"  @mousedown="setStartingPoint">
                {{ title }}
            </div>
            <div class="modal-main">
                <slot></slot>
                <div class="content" >

                  <div class="infoC" >

                  <div class="imgInfo">

                    <img :src="rspData.img" width="250px" height="250px" alt="">
                    <div>
                      {{rspData.text}}
                    </div>
                  </div>
                  <div class="msgInfo" >
                    <div style="margin-top:0px">
                        <table width=100%>
                          <tr>
                            <td colspan=3>
                              <span class="rsp-desp">{{rspData.psncnt}}</span>
                            </td>
                            <td colspan=4>
                              <span>お薦め商品</span>
                            </td>
                          </tr>
                          <tr v-for="(item,key) in rspData.items" :key="key">
                            <td  >
                                &nbsp;&nbsp;{{item.goodsname}}
                            </td>
                            <td align=right>{{item.need}}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><el-checkbox change='update'></el-checkbox>
                              <a class="itemdesp" @click="dispPop(key)">{{item.gdsitemname}}</a>
                            </td>
                            <td>{{item.price}}円/{{item.unit}}</td>
                            <td align=center><el-button type="success" plain @click="submit">-</el-button>
                              1{{item.unit}}
                            </td>
                            <td><el-button type="success" plain @click="submit">+</el-button></td>

                          </tr>
                          <tr><td colspan=7 align=center>
                            <el-button type="success" plain @click="submit">カードに追加</el-button>
                            </td></tr>
                        </table>

                    </div>
                  </div>
                  </div>
                </div>

            </div>
            <div class="modal-footer">
                <el-button type="primary" round @click="hidePop">閉じる</el-button>
            </div>
        </div>

  <goodsitemPop :show="gdsitmshow" @hideSubPop="hideSubPop" @submitSubPop="submitSubPop">

  </goodsitemPop>

    </div>

  <!-- レシビPOP -->


</template>

<script>
import goodsitemPop from '@/components/main/goodsitemPop.vue'
export default {
    name: 'modal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        rspid: {
            type: String,
            default: ''
        },
    },
    components: {
          goodsitemPop
    },
    data() {
        return {
            x: 0,
            y: 0,
            node: null,
            isCanMove: false,
            rspname:'',
            rsptext:'',
            items: {},
            oldrspid:'',
            gdsitmshow:false,
        }
    },
    mounted() {
        this.node = document.querySelector('.modal-container');
        this.rspname = "";
        this.rsptext = "";
        this.items = {'黄ピーマン':'300g','ピーマン':'100g','豚こま肉':'380g','★酢':'大さじ３'};
    },
    computed: {
      // 计算属性的 getter
      rspData: function () {
        var rsp = {};

          rsp.img = "http://netengine.co.jp/static/upimg/rsp/rspkyuri01.jpg";
          rsp.psncnt = "材料（2人分）";
          rsp.text = "きゅうりを炒めておつまみやお弁当にぴったりのおかずにしました。簡単なので1品追加したい時にもおすすめです。";
          rsp.items = [
              {
              'goodsname':'きゅうり',
              'need':'300g',
              'gdsitemid':'yu231',
              'gdsitemname':'茨城産きゅうり',
              'price':'68',
              'unit':'本',
              },
              {
              'goodsname':'ちくわ',
              'need':'1本',
              'gdsitemid':'yu231',
              'gdsitemname':'あかさ　竹輪',
              'price':'150',
              'unit':'袋',
              },
              {
              'goodsname':'ごま油',
              'need':'小さじ2',
              'gdsitemid':'yu231',
              'gdsitemname':'はまや　ごま油',
              'price':'350',
              'unit':'本',
              },
              {
              'goodsname':'砂糖',
              'need':'小さじ1',
              'gdsitemid':'yu231',
              'gdsitemname':'いきし　砂糖',
              'price':'200',
              'unit':'袋',
              },
              {
              'goodsname':'醤油',
              'need':'小さじ1',
              'gdsitemid':'yu231',
              'gdsitemname':'にひみ　醬油',
              'price':'380',
              'unit':'本',
              },
              {
              'goodsname':'ラー油',
              'need':'少量',
              'gdsitemid':'yu231',
              'gdsitemname':'うくす　ラー油',
              'price':'300',
              'unit':'本',
              },
            ];

        // `this` 指向 vm 实例
        return rsp;
      }
   },
    methods: {
        hidePop() {
            this.$emit('hidePop')
        },

        submitPop() {
            this.$emit('submitPop')
        },

        setStartingPoint(e) {
            this.x = e.clientX - this.node.offsetLeft
            this.y = e.clientY - this.node.offsetTop
            this.isCanMove = true
        },

        modalMove(e) {
            if (this.isCanMove) {
                this.node.style.left = e.clientX - this.x + 'px'
			    this.node.style.top = e.clientY - this.y + 'px'
            }
        },

        cancelMove() {
            this.isCanMove = false
        },
        // 商品入替POPの表示
        dispPop(key){
          this.gdsitmshow = true;
        },
        hideSubPop() {
            // 取消弹窗回调
            this.gdsitmshow = false
        },

        submitSubPop() {
            // 确认弹窗回调
            this.gdsitmshow = false
        },
        submit(){

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rsp-desp{
  color:rgba(172, 71, 67, 0.5);
  font-size:16px;
}
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
}
.modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.modal-header {
    height: 56px;
    background: #409EFF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
}
.modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;
}
.modal-footer button {
    width: 100px;
}
.modal-main {
    padding: 15px 40px;
}

.content{
  display: flex;
  justify-content: center;
}
.infoC{
  display: flex;
  justify-content: center;
  width: 800px;
  background: white;
  margin-top: 00px;
  height: 100%;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
}
.msgInfo{
  width: 550px;
  font-size: 12px;
}
.imgInfo{
  width: 250px;
  color: #00cccc;
}
.item-c{
  display: flex;
  justify-content:space-between;
}
.itemdesp{
  color: rgb(151, 54, 130);
  font-size: 12px;
  text-decoration:underline
}
</style>
