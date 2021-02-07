<template>
  <div class="signup-container" v-show="show">
    <bubbles-effect :options="options"></bubbles-effect>
    <el-form
      ref="form"
      :model="form"
      label-width="140px"
      :rules="form_rules"
      class="signup-form"
    >
      <h2 class="signup-title" style="center">サインアップ</h2>
      <el-form-item label="メール" class="box" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="パスワード" class="box" prop="passwd">
        <el-input v-model="form.passwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="パスワードの認証" class="box" prop="confirmPasswd">
        <el-input v-model="form.confirmPasswd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">サインアップ</el-button>
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
      default: false,
    },
  },
  data() {
    var validateConfirm = (rule, value, callback) => {
      if (value !== this.form.passwd) {
        callback(new Error("パスワードとパスワードの認証は一致しません!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        passwd: "",
      },
      form_rules: {
        username: [
          { required: true, message: "ユーザーは必須", trigger: "blur" },
        ],
        passwd: [
          { required: true, message: "パスワードは必須", trigger: "blur" },
        ],
        confirmPasswd: [
          {
            required: true,
            message: "パスワードの認証は必須",
            trigger: "blur",
          },
          { validator: validateConfirm, trigger: "blur" },
        ],
      },
      options: {
        color: "rgba(225,225,225,0.5)", //Bubble color
        radius: 15, //Bubble radius
        densety: 0.3, // The larger the bubble density, the greater the density (suggest no more than 1).
        clearOffset: 0.2, // The larger the bubble disappears [0-1], the longer it disappears.
      },
    };
  },
  components: {
    vueCanvasNest,
    // bubblesEffect
  },
  methods: {
    async onSubmit(formName) {
      var validRslt = false
      this.$refs[formName].validate((valid) => {
        validRslt = valid
      });
      if (!validRslt) {
        return
      }
      var req = {
        rscode: 'ok',
        mode: 'insert',
        tableName: 'sys_users',
        data: { username: this.form.username, password: this.form.passwd }
      }
      await this.axios
        .post(this.$baseUrl + '/web.do', req)
        .then(response => {
          if (response.data.rscode === 'ok') {
            this.$message({
              type: 'success',
              message: 'サインアップできました'
            })
          }
        })
        .catch(response => {
          console.log('Homepage getGoodsRsp  error!' + response)
        })
      this.$emit("hidePop");
    },
    cancelSubmit() {
      this.$emit("hidePop");
      console.log(this)
    },
  },
};
</script>


<style scoped>
.signup-form {
  width: 420px;
  /* 上下嫌隙 160px，左右自动居中 */
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
  /* border: solid 1px black; */
  box-shadow: 0 0 30px 3px rgba(119, 118, 118, 0.33);
}

.signup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.signup-title {
  color: #303133;
  text-align: center;
}

.cancel {
  margin-left: 35px;
}

.box {
  margin-left: 0px;
}
</style>