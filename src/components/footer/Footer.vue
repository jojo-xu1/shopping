<template>
  <div class="footer" id="footer">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
    <el-menu-item index="1">カード</el-menu-item>
    <el-menu-item index="2">配送状況</el-menu-item>
    <el-menu-item index="3">注文履歴</el-menu-item>
    <el-menu-item index="4">個人設定</el-menu-item>
    <el-menu-item index="5">問い合わせ</el-menu-item>
  </el-menu>
  <!-- カード -->
  <div class="submain" v-show="shoppingcardShow">
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

      <el-button type="success" style="margin-top: 20px;" @click="dialogFormVisible = true">注文へ</el-button>
    <!-- ご注文手続き -->
      <el-dialog title="ご注文手続き" :visible.sync="dialogFormVisible" width=80%>
        <el-form :model="form">
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

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">キャンセル</el-button>
          <el-button type="primary" @click="OrderInfo">お注文内容の確認に進む</el-button>
        </div>
      </el-dialog>
    <!-- 注文確認 -->
      <el-dialog title="ご注文内容を確認してください" :visible.sync="dialogFormVisible2" width=80%>
        <el-form :model="form">
          <el-form-item label="お届け先" :label-width="formLabelWidth" >
            <el-select v-model="form.address" placeholder="お届け先">
              <el-option
                v-for="address in userAddressList"
                :key="address.address_id"
                :label="address.address"
                :value="address.address"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="お支払方法" :label-width="formLabelWidth">
            <el-select v-model="form.pay" placeholder="お支払方法">
              <el-option
                v-for="paymeth in paymethData"
                :key="paymeth.Id"
                :label="paymeth.name"
                :value="paymeth.name"
              />
            </el-select>
          </el-form-item>           
        </el-form>
        <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="prodName" label="商品名" width="200" />
              <el-table-column prop="price" label="商品価格" width="350" />
              <el-table-column prop="num" label="数量" width="125" />
              <el-table-column  label="合計" width="50" >
                <template slot-scope="scope">
                  {{scope.row.sum =scope.row.price*scope.row.num}}
                </template>
              </el-table-column>
            </el-table>
             <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="お支払金額：">
                  <span>{{orderPrice}}円</span>
              </el-form-item>
             </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bktSetOrd">戻る</el-button>
          <el-button type="primary" @click="onSubmit">注文を確定する</el-button>
        </div>
      </el-dialog>
  </div>
  <!-- 配送状況 -->
  <div v-if="deliveryHistoryShow">
    <div class="kago">
      <div class="line"></div><span>配送状況</span>
    </div>
      <el-table
        :data="dlvHistoryData"
        border
        :header-cell-style="{background:'#F2F6FC'}"
        style="width:80%;margin-left:100px">
        <el-table-column
          label="配送状態更新時間"
          width="240px"
          align="center"
        >
        <template slot-scope="scope">
          <div style="text-align: right;margin-top:25px" >
            <span>{{scope.row.createtime |formatDate()}}</span>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="注文番号"
          width="240px"
          align="center"
        >
         <template slot-scope="scope">
          <div class="prodName">
              <div style="margin-left: 0.5rem;text-align: left;margin-top:25px">
                <span>{{scope.row.order_info_id}}</span>
              </div>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="配送状况"
          width="240px"
          align="center"
        >
        <template slot-scope="scope">
          <div style="text-align: right;margin-top:25px">
            <span>{{scope.row.status}}</span>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="お届け先"
          align="center"
        >
        <template slot-scope="scope">
          <div style="text-align: right;margin-top:25px">
            <span>{{scope.row.dlv_address}}</span>
          </div>
        </template>
        </el-table-column>
       </el-table>
  </div>
  <!-- 注文履歴 -->
  <div v-if="orderHistoryShow">
    <div class="kago">
      <div class="line"></div><span>注文履歴</span>
    </div>
      <el-table
        :data="orderHistoryData"
        border
        :header-cell-style="{background:'#F2F6FC'}"
        style="width: 80%;margin-left:100px">
        <el-table-column
          label="注文日付"
          width="240px"
          align="center"
        >
        <template slot-scope="scope">
          <div style="text-align: right;margin-top:25px" >
            <span>{{scope.row.createtime | formatDate()}}</span>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="注文番号"
          width="300px"
          align="center"
        >
        <template slot-scope="scope">
          <div class="prodName">
              <div style="margin-left: 0.5rem;text-align: left;margin-top:25px">
                <span>{{scope.row.order_info_id}}</span>
              </div>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="支払金額">
          <template slot-scope="scope">
            <div style="text-align: right;margin-top:25px;margin-bottom: 10px;">
                {{scope.row.price}}円
            </div>
           </template>
        </el-table-column>
        <el-table-column
          label="注文状况"
          align="center"
        >
        <template slot-scope="scope">
          <div style="text-align: right;margin-top:25px">
            <span>{{scope.row.orderStatus == '1' ? '注文完了': '注文キャンセル'}}</span>
          </div>
        </template>
        </el-table-column>
                <el-table-column
          label="配送状况"
          align="center"
        >
        <template slot-scope="scope" >
          <div @click="dlvInfo(scope.row.order_id)" style="text-align: right;margin-top:25px"> 
            <span>{{scope.row.status}}</span>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
        <template slot-scope="scope">
          <div style="text-align: right;margin-top:25px">
           <el-button size="mini" type="danger" @click="orderDetail(scope.row.order_id)">商品詳細</el-button>
          </div>
        </template>
        </el-table-column>
       </el-table>
       <div>
          <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="showDetail" width = 60% @close="this.showDetail = false">
            <el-table :data="orderDetailData" style="width: 100%">
              <el-table-column prop="item_name" label="品目名" width="200" />
              <el-table-column prop="item_desp" label="品目詳細" width="350" />
              <el-table-column prop="item_price" label="レジ金額(円)" width="125" />
              <el-table-column prop="item_num" label="数量" width="50" />
            </el-table>
             <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="お支払方式：">
                <span>{{paymentMethod}}</span>
              </el-form-item>
              <el-form-item label="お支払金額：">
                  <span>{{payment}}円</span>
              </el-form-item>
             </el-form>
          </el-dialog>
       </div>
  </div>

  </div>
 
</template>

<script>
import lj from '@/assets/lj.jpg'
import tmt from '@/assets/tmt.jpg'
import rg from '@/assets/rg.jpg'
import dk from '@/assets/dk.jpg'

export default {
  name: 'Footer',
  data () {
    return {
      activeIndex: '1',
      orderHistoryData:[],
      userAddressList :[],
      orderDetailData:[],
      dlvHistoryData:[],
      // tableData:[],
              tableData:[{'src':lj,'itemId':311,'prodName':'オランダなどの外国産 パプリカ（黄）1個','price':128,'num':2,'sui':0.08,'date':20201220,'state':'完了'},
                 {'src':tmt,'itemId':312,'prodName':'トップバリグリーンアイ有機野菜 北海道などの国内産 350g 1袋','price':398,'num':1,'sui':0.08,'date':20201220,'state':'配達中'},
                 {'src':rg,'itemId':313,'prodName':'茨城県などの国内産 レンコン 200g 1袋','price':496,'num':1,'sui':0.08,'date':20201220,'state':'完了'},
                 {'src':dk,'itemId':314,'prodName':'青森・千葉県などの国内産 だいこん 1/2カット （葉の部分）','price':99,'num':1,'sui':0.08,'date':20201220,'state':'完了'},
                ],
                paymethData:[
                  {'Id': 'P01','name':'クレジットカード'},
                  {'Id': 'P02','name':'代金引換'},
                  {'Id': 'P03','name':'ネット銀行でお支払い'},
                ],
      userId:'1',
      shoppingcardShow:true,
      orderHistoryShow:false,
      showDetail:false,
      payment :'',
      paymentMethod :'',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      orderPrice : '',
      tempOrderId :'',
      deliveryHistoryShow:false,
      form: {
          address: '',
          pay: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    }
  },
   mounted() {
     this.init()
   },
   

  methods: {
      handleSelect(key, keyPath) {
         if(key == 1){
          this.shoppingcardShow = true
          this.deliveryHistoryShow = false
          this.orderHistoryShow = false
           }else if(key == 2){
          this.setAllOrdhis()
          this.shoppingcardShow =false
          this.deliveryHistoryShow = true
          this.orderHistoryShow = false
        }else if(key == 3){
          this.shoppingcardShow =false
          this.deliveryHistoryShow = false
          this.orderHistoryShow = true
        }
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
  init: async function() {
    this.setAllOrdhis()
        //注文履歴初期化
      var req = {
            mode: 'select',
            selectsql:
              "select rd.createtime,rd.order_info_id,rd.order_id,rd.price,rd.orderStatus,dv.status from ns_order rd"
              +" left join ns_dlv dv on rd.order_id = dv.order_id where  (rd.delflg is null or rd.delflg <> '1') "
              +"and dv.last_flg = '1' and rd.user_id ="+this.userId
              +" order by rd.createtime DESC"
          }
        console.log(req)
      await this.axios
        .post(this.$baseUrl + '/web.do', req)
        .then(response => {
          console.log(response.data)
          this.orderHistoryData = response.data.data
        })
        .catch(response => {
          console.log('Homepage getGoodsRsp  error!' + response)
        })
        for (var item in this.orderHistoryData) {
          switch(this.orderHistoryData[item].status){
            case '0':
              this.orderHistoryData[item].status = "未出荷"
              break;
            case '1':
              this.orderHistoryData[item].status = "出荷済み"
              break;
            case '2':
              this.orderHistoryData[item].status = "配達済み"
              break;
            case '3':
              this.orderHistoryData[item].status = "キャンセル"
              break;
          }
        }
        //ユーザー住所取得
       var req2 = {
            mode: 'select',
            selectsql:
              "select * from ns_user_address where user_id ="+this.userId 
          }
      await this.axios
        .post(this.$baseUrl + '/web.do', req2)
        .then(response => {
          console.log(response.data)
          this.userAddressList = response.data.data
        })
        .catch(response => {
          console.log('Homepage getGoodsRsp  error!' + response)
        })
        //配送状況データ取得
         
      },
    orderDetail: async function(id) {
        this.showDetail = true
        //注文詳細表示
          var req = {
        mode: 'select',
        selectsql:
          "select dtl.item_name, dtl.item_price, dtl.item_num,itm.item_desp from ns_order_detail dtl "
          +"left join ns_item itm on dtl.item_id = itm.item_id where  order_id =" + id
     }

     console.log(req)
      await this.axios
        .post(this.$baseUrl + '/web.do', req)
        .then(response => {
          console.log(response.data)
          this.orderDetailData = response.data.data
        })
        .catch(response => {
          console.log('Homepage getGoodsRsp  error!' + response)
        })
        var req2 = {
        mode: 'select',
        selectsql:
          "select * from ns_order where order_id =" + id
      }
      await this.axios
        .post(this.$baseUrl + '/web.do', req2)
        .then(response => {
          console.log(response.data)
          this.payment = response.data.data[0].price
          this.paymentMethod = response.data.data[0].payMeth
        })
        .catch(response => {
          console.log('Homepage getGoodsRsp  error!' + response)
        })

      },
  onSubmit : async function() {
       if (!this.form.address) {
        alert('お届け先を入力して下さい。')
        return
      }
       if (!this.form.pay) {
        alert('お支払方法を入力して下さい。')
        return
      }
          //システム時間取得
          var  date1 =new Date();
          var dateTime = this.formatDate(Date.parse(date1))
          var orderInfoId = Math.round(Math.random()*10000000000) 
          console.log(orderInfoId)
          //注文履歴登録
          var req1 = {
          mode: 'insert',
          tableName: 'ns_order',
          data: {
            order_info_id:orderInfoId,
            user_id: this.userId,
            price: this.orderPrice,
            payMeth: this.form.pay,
            dlv_address: this.form.address,
            orderStatus: "1",
            delflg: "0",
            createtime: dateTime,
            createuser: "admin",
          }
        }
        await this.axios
          .post(this.$baseUrl + '/web.do', req1)
          .then(response => {
            console.log(response.data.data)
            this.tempOrderId = response.data.data
          })
          .catch(response => {
            console.log('Homepage getGoodsRsp  error!' + response)
          })

          //配送状況登録
         var req2 = {
          mode: 'insert',
          tableName: 'ns_dlv',
          data: {
            order_id: this.tempOrderId,
            status: "0",
            last_flg: 1,
            createtime: dateTime,
            createuser: "admin",
          }
        }
        await this.axios
          .post(this.$baseUrl + '/web.do', req2)
          .then(response => {
            console.log(response.data)
          })
          .catch(response => {
            console.log('Homepage getGoodsRsp  error!' + response)
          })

        //注文内訳ループ登録
        for (var item in this.tableData) {
          this.tableData[item].sales_type 
          var req3 = {
            mode: 'insert',
            tableName: 'ns_order_detail',
            data: {
              order_id: this.tempOrderId,
              item_id: this.tableData[item].itemId,
              item_name: this.tableData[item].prodName,
              item_price: this.tableData[item].price,
              item_num: this.tableData[item].num,
              createtime: dateTime,
              createuser: "admin",
          }
        }
        await this.axios
          .post(this.$baseUrl + '/web.do', req3)
          .then(response => {
            console.log(response.data)
          })
          .catch(response => {
            console.log('Homepage getGoodsRsp  error!' + response)
          })
        }
          this.dialogFormVisible2 = false
          this.dialogFormVisible = false
        console.log('submit!')
        this.init()
        this.form.pay = ''
        this.form.address = ''
        //TODO
        //购物车刷新

      },
      dlvInfo: function (id){
         this.handleSelect(2)
        this.setDlvhis(id)
          console.log("-----------goto---配送状况")
          console.log(id)
      },
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },
  OrderInfo() {
         this.dialogFormVisible = false
         this.dialogFormVisible2 = true
         var sumPrice = 0
         for (var item in this.tableData) {
          sumPrice +=this.tableData[item].price*this.tableData[item].num*(1+this.tableData[item].sui)
          }
         this.orderPrice = Math.ceil(sumPrice)
      },
  bktSetOrd() {
         this.dialogFormVisible = true
         this.dialogFormVisible2 = false
         this.form.pay=''
         this.form.address=''
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
         hidePop() {
        // 取消弹窗回调
        this.visibleComponent = false
      },
      submitPop() {
          // 确认弹窗回调
          this.visibleComponent = false
      },
      
      // 加载所有订单配送状况
      async setAllOrdhis(){
          var req = {
            mode: 'select',
            selectsql:
              " select d.createtime, d.order_id, d.status, o.order_info_id,o.dlv_address from ns_dlv d "
              + " left join ns_order o on d.order_id = o.order_id where (o.delflg is null or o.delflg <> '1') " 
              + " order by o.createtime desc "
          }
        console.log("SLELCT TEST")
        console.log(req)
      await this.axios
        .post(this.$baseUrl + '/web.do', req)
        .then(response => {
          console.log(response.data)
          this.dlvHistoryData = response.data.data
        })
        .catch(response => {
          console.log('Homepage getGoodsRsp  error!' + response)
        })
        console.log(req)
        for (var item in this.dlvHistoryData) {
          switch(this.dlvHistoryData[item].status){
            case '0':
              this.dlvHistoryData[item].status = "未出荷"
              break;
            case '1':
              this.dlvHistoryData[item].status = "出荷済み"
              break;
            case '2':
              this.dlvHistoryData[item].status = "配達済み"
              break;
            case '3':
              this.dlvHistoryData[item].status = "キャンセル"
              break;
          }
        }
      },
      // 配送状況検索
      async setDlvhis(order_id){
      var req = {
            mode: 'select',
            selectsql:
              " select d.createtime, d.order_id, d.status, o.order_info_id from ns_dlv d "
              + " left join ns_order o on d.order_id = o.order_id where (o.delflg is null or o.delflg <> '1') "
              + " and d.order_id = " + order_id 
              + " order by d.createtime desc "
          }
        console.log("--------------0000000000000000000-------------")
        console.log(req)
      await this.axios
        .post(this.$baseUrl + '/web.do', req)
        .then(response => {
          console.log(response.data)
          this.dlvHistoryData = response.data.data
        })
        .catch(response => {
          console.log('Homepage getGoodsRsp  error!' + response)
        })
        console.log(req)
        for (var item in this.dlvHistoryData) {
          switch(this.dlvHistoryData[item].status){
            case '0':
              this.dlvHistoryData[item].status = "未出荷"
              break;
            case '1':
              this.dlvHistoryData[item].status = "出荷済み"
              break;
            case '2':
              this.dlvHistoryData[item].status = "配達済み"
              break;
            case '3':
              this.dlvHistoryData[item].status = "キャンセル"
              break;
          }
        }
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
