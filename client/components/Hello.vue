<template>
  <div class="hello">
    {{msg}}
    <button @click="getJson">点击请求测试get接口</button>
    <button @click="postJson">点击请求测试post接口</button>
    <a href="/api/get/file" download>
      <button>点击下载测试文件</button>
    </a>
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
      },
      postJson() {
        API.postJson.save({
          title: this.msg
        }).then(result => {
          console.log(result);
          this.msg = result.body.msg;
        });
      }
    }
  }
</script>
<style>

</style>