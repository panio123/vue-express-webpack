<template>
  <div class="page">
    <hello></hello>
  </div>
</template>
<script>
  import Hello from '@/Hello.vue';
  export default {
    name: '',
    components: {
      Hello
    },
    props: {},
    data() {
      return {

      }
    }
  }
</script>
<style>
  .page {
    width: 100vw;
    height: 100vh;
  }
</style>