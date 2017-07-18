<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Miner</th>
          <th>Hash</th>
          <th>Prev Block</th>
          <th>Markle Root</th>
          <th>Timestamp</th>
          <th>Bits</th>
          <th>Version</th>
          <th>Nonce</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="block in blocks">
          <td v-if="block.isMined">{{ block.minerId }}</td><td v-else>Not Found</td>
          <td v-if="block.isMined">{{ block.resultBlock }}</td><td v-else>Not Found</td>
          <td>{{ block.prevBlock }}</td>
          <td>{{ block.markleRoot }}</td>
          <td>{{ block.prevTimestamp }}</td>
          <td>{{ block.bits }}</td>
          <td>{{ block.version }}</td>
          <td v-if="block.isMined">{{ block.nonce }}</td><td v-else>Not Found</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>Calc start</th>
          <th>Calc end</th>
          <th>Prev block</th>
          <th>Session Id</th>
        </tr>
      </thead>
      <tbody class="history-list">
        <tr v-for="history in histories">
            <td>{{ history.nonceStart }}</td>
            <td>{{ history.nonceEnd }}</td>
            <td>{{ history.prevBlock }}</td>
            <td>{{ history.sessionId }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .history {
    margin: auto;
  }
  .block-list {
    list-style: none;
  }
</style>

<script>
  import indexField from './index_field';

  export default indexField;
</script>
