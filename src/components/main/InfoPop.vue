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

                    <img :src="rspjson.rsp_img" width="250px" height="250px" alt="">
                    <div>
                      {{ rspjson.rep_desp }}
                    </div>
                  </div>
                  <div class="msgInfo" >
                    <div style="margin-top:0px">
                        <table width=100%>
                          <tr>
                            <td colspan=3>
                              <span class="rsp-desp">{{ rspjson.rsp_metial }}{{ rspData }}</span>
                            </td>
                            <td colspan=4>
                              <span>お薦め商品</span>
                            </td>
                          </tr>
                          <tr v-for="item in itemList" :key="item.goods_id">
                            <td  >
                                &nbsp;&nbsp;{{item.goods_name}}
                            </td>
                            <td align=right>{{item.rgds_amount}}</td>
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
            itemList: [],
            rspjson: {},
        }
    },
    mounted() {
        this.node = document.querySelector('.modal-container');
        this.init()
    },
    computed: {
      // 计算属性的 getter
      rspData: function () {
        this.init()
        return ''
      }
   },
    methods: {
       init: async function() {
      var rsp = {}
      var req1 = {
        mode: 'select',
        selectsql:
            "select rsp_id, rsp_name, rep_desp, rsp_img, rsp_metial from ns_rsp where (delflg is null or delflg <> '1') and rsp_id=" + this.rspid
      }
      await this.axios
        .post(this.$baseUrl + '/web.do', req1)
        .then(response => {
          console.log('Before RspPop show')
          console.log(response.data)
          rsp = response.data.data[0]
        })
        .catch(response => {
          console.log('Before Update select   error!' + response)
        })
      this.title = rsp.rsp_name
      rsp.rsp_img = this.$webUrl + '/shopping/upimg/' + rsp.rsp_img

      // 材料明細取得
     var req2 = {
        mode: 'select',
        selectsql:
            "select a.rgds_id, a.goods_id, a.rsp_id, a.rgds_amount, g.goods_name from ns_rspgoods a left join ns_goods g on g.goods_id = a.goods_id where (a.delflg is null or a.delflg <> '1') and a.rsp_id=" + this.rspid
      }
      var that = this
      await this.axios
        .post(this.$baseUrl + '/web.do', req2)
        .then(response => {
          console.log('rspGoods List')
          console.log(response.data)
          that.itemList = response.data.data
        })
        .catch(response => {
          console.log('Before Update select   error!' + response)
        })
        //
        for (var item in that.itemList) {
          var goods_id =that.itemList[item].goods_id
                   var req3 = {
                      mode: 'select',
                      selectsql:
                          "select item_name,price,unit from ns_item where goods_id = " +goods_id 
                    }
              await this.axios
                      .post(this.$baseUrl + '/web.do', req3)
                      .then(response => {
                        console.log(response.data)
                        that.itemList[item].gdsitemname = response.data.data[0].item_name
                        that.itemList[item].price = response.data.data[0].price
                        that.itemList[item].unit = response.data.data[0].unit
                      })
                      .catch(response => {
                        console.log('Before Update select   error!' + response)
                      })
        }

      // `this` 指向 vm 实例
      this.rspjson = rsp
      return this.rspjson
    },
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