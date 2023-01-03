<template>
  <div>
    <v-btn v-for="(item, index) in titles" :key="index" :color="item.color" @click="$router.push(item.path)">{{item.text}}</v-btn>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: { titles: Array }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>