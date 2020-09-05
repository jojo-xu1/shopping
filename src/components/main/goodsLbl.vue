<template>
        <div class="goodslbl" :style="{ top: 390 + 'px', left: 360 + 'px' }"  >
            <table height=100% width=100%><tr><td align=center>
              ok
            </td></tr></table>
        </div>
</template>

<script>
export default {
  name: 'goodsLbl',
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
.clslbl{
    background-image: url(/static/img/timg.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position:absolute;
    width:40px;
    height:30px;
    opacity:0.9;
    display:table-cell;
}
</style>
