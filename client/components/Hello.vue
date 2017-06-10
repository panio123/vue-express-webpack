<template>
  <div class="hello">
    {{msg}}
    <button @click="getJson">点击请求测试接口</button>
  </div>
</template>
<script>
  import API from 'API'
  export default {
    name: '',
    props: {},
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      getJson() {
        API.getJson.get().then(result => {
          console.log(result);
          this.msg = result.body.title;
        });
      }
    }
  }
</script>
<style>

</style>