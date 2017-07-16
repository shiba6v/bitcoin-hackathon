<template>
  <div class="history-list">
    <div class="history" v-for="history in histories">{{ history }}</div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import indexField from './index_field';

  export default indexField;
</script>
