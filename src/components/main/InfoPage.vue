<template>
  <div >

    <div class="content" >
      <div class="infoC" >
      <div class="imgInfo">
        <div style="font-size:2em;margin-bottom: 20px;">
          黄ピーマンと肉の炒め
        </div>
        <img src="../../assets/cai.jpg" width="95%" height="300px" alt="">
      </div>
      <div class="msgInfo">
        <div style="font-size:2em;margin-bottom: 20px;">
          &nbsp;
        </div>
        <div>
          豚ロース肉とたっぷりの野菜をご家庭にある基本的な調味料で味付けした炒め物です。ごはんのおかずにぴったりですし、ごはんにかけて丼ものにしても、ビールのおつまみにしても合います。ぜひ作ってみてくださいね。
        </div>
        <div style="margin-top:30px">
            <h3 style="color:blanchedalmond;">材料（3人分）</h3>
            <div v-for="(item,key) in items" :key="key">
              <div class="item-c" >
                  <el-checkbox change='update'>{{key}}</el-checkbox>
                  <div>{{item}}</div>
              </div>
              <hr>

            </div>
            <el-button type="success" plain @click="submit">カードに追加</el-button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPage',
  data () {
    return {
      items: {'黄ピーマン':'300g','ピーマン':'100g','豚こま肉':'380g','★酢':'大さじ３',
      '★しょうゆ':'大さじ１.5','塩コショウ':'少々'},
      checked:true,
      loading: false,
    }
  },
  methods:{
    update(e){

    },
    submit(){
      this.loading=true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  display: flex;
  justify-content: center;
}
.infoC{
  display: flex;
  justify-content: center;
  width: 800px;
  background: white;
  margin-top: 20px;
  height: 100%;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
}
.msgInfo{
  width: 400px;

}
.imgInfo{
  width: 400px;

  color: #00cccc;
}
.item-c{
  display: flex;
  justify-content:space-between;
}
</style>
