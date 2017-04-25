<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <input type="text" class="input" v-verify:opt.change.fn="[{'fn':'diy'},{'dd':'vanow'}]" tag="登录密码" v-model.trim="Password" name="mydiy">
    <input type="text" class="input" v-verify="[{'aa':'bb'},{'dd':'vanow'}]" tag="登录密码2" v-model.trim="checkPassword" name="mydiy2">
    <a v-va-submit>提交</a>
  </div>
</template>

<script>
/*eslint-disable */
import '../directives/verify';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      Password: "123",
      checkPassword: "2",
      diy(v){
        alert(v)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
