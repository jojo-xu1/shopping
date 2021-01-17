<template>
    <div class="login-container" v-show="show">
        <bubbles-effect :options="options"></bubbles-effect>
      <el-form ref="form" :model="form" label-width="100px" :rules="form_rules" class="login-form">
        <h2 class="login-title" style="center">ユーザー登録</h2>
        <el-form-item label="メール" class="box" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="パスワード" class="box" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登録</el-button>
          <el-button class="cancel" @click="cancelSubmit">キャンセル</el-button>
        </el-form-item>
      </el-form>
      
    </div>
    
    <!-- <vue-canvas-nest></!-->

</template>


<script>
import vueCanvasNest from "vue-canvas-nest";
//   import bubblesEffect from 'vue-canvas-effect'

export default {
  props: {
        show: {
            type: Boolean,
            default: false
        }
    },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      form_rules: {
        username: [
            { required: true, message: 'メールは必須', trigger: 'blur' },
        ],
        password: [
            { required: true, message: 'パスワードは必須', trigger: 'blur' }
        ]
      },
      options: {
        color: "rgba(225,225,225,0.5)", //Bubble color
        radius: 15, //Bubble radius
        densety: 0.3, // The larger the bubble density, the greater the density (suggest no more than 1).
        clearOffset: 0.2 // The larger the bubble disappears [0-1], the longer it disappears.
      },
      loginError: false
    };
  },
  components: {
    vueCanvasNest
    // bubblesEffect
  },
  methods: {
    async onSubmit() {
      this.loginError = false
      console.log("submit!");
      //http://13.112.112.160:8080/test/login?mail=mail@abc.com&password=Base1234
      console.log(this.form.username);
      console.log(this.form.password);
      await this.axios
        .post(this.$baseUrl + '/login?mail='+this.form.username+'&password='+this.form.password)
        .then(response => {
          console.log('I am here')
          console.log(response.data)
          if (response.data.rscode === 'ok') {
            localStorage.setItem('tttocken',response.data.token)
            localStorage.setItem('userDetails',response.data.data)
            this.$emit('hidePop')
          } else {
            console.log('I am ng')
            this.$message({
            type: 'error',
            message: 'メールまたはパスワードが不正です'
            })
          }
        })
        .catch(response => {
          console.log('response error!' + response)
        })
    },
    cancelSubmit() {
      this.form.username = ""
      this.form.password = ""
      this.$emit('hidePop')
    }
  }
};
</script>


<style scoped>
.login-form {
  width: 350px;
  /* 上下嫌隙 160px，左右自动居中 */
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
  /* border: solid 1px black; */
  box-shadow: 0 0 30px 3px rgba(119,118,118,0.33);
}

.login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
}

.login-title {
  color: #303133;
  text-align: center;
}

.cancel {
    margin-left: 60px; 
}

.box {
     margin-left: 0px; 
}
</style>