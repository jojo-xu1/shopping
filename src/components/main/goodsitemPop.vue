<template>
	<div class="modal-bg" v-show="show" @mousemove="modalMove" @mouseup="cancelMove">
        <div class="modal-subcont">
            <div class="modal-header" @mousedown="setStartingPoint">
                商品入れ替え
            </div>
            <div class="modal-main">
                <slot></slot>
                <div v-for="(item, key) in gdsitems"  v-bind:key="key">
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
                        <el-button type="success" plain >入替</el-button>
                    </td>
                  </tr>
                  </table>
                  </center>
                </div>

            </div>
            <div class="modal-footer">
                <el-button type="primary" round @click="hideSubPop">閉じる</el-button>
            </div>
        </div>
    </div>
</template>

<script>
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
    data() {
        return {
            x: 0,
            y: 0,
            node: null,
            isCanMove: false,
            rspname:'',
            rsptext:'',
            gdsitems:[
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
            oldrspid:'',
        }
    },
    mounted() {
        this.node = document.querySelector('.modal-subcont');
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
        hideSubPop() {
            this.$emit('hideSubPop')
        },

        submitSubPop() {
            this.$emit('submitSubPop')
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
.modal-subcont {
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
}
.goodsfont{
  font-size: 10px;
}
</style>
