<template>
  <table>
    <thead>
      <tr>
        <th>Nonce start</th>
        <th>Nonce end</th>
        <th>Prev block</th>
        <th>Finish</th>
        <th>Session Id</th>
      </tr>
    </thead>
    <tbody class="history-list">
      <tr v-for="history in histories">
          <td>{{ history.nonceStart }}</td>
          <td>{{ history.nonceEnd }}</td>
          <td>{{ history.prevBlock }}</td>
          <td>{{ history.finish }}</td>
          <td>{{ history.sessionId }}</td>
        </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
  .history {
    margin: auto;
  }
</style>

<script>
  import indexField from './index_field';

  export default indexField;
</script>
