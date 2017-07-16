<template>
  <div class="hello">
    <div class="info-list">
      <div class="info">
        <div class="info__label">Version</div>
        <div class="info__content">{{ info.version }}</div>
      </div>
      <div class="info">
        <div class="info__label">Previous Block</div>
        <div class="info__content">{{ info.prevBlock }}</div>
      </div>
      <div class="info">
        <div class="info__label">Markle Root</div>
        <div class="info__content">{{ info.markleRoot }}</div>
      </div>
      <div class="info">
        <div class="info__label">Timestamp</div>
        <div class="info__content">{{ info.timestamp }}</div>
      </div>
      <div class="info">
        <div class="info__label">Bits</div>
        <div class="info__content">{{ info.bits }}</div>
      </div>
    </div>
    <div class="exec" @click="exec">Start Mining</div>
    <div class="result-list">
      <div class="result">
        <div class="result__label">Calc Times</div>
        <div class="result__content">{{ calcTimesView }}</div>
      </div>
      <div class="result">
        <div class="result__label">Calc Speed</div>
        <div class="result__content">{{ calcSpeed }}</div>
      </div>
      <div class="result">
        <div class="result__label">Trying at</div>
        <div class="result__content">{{ tryingAt }}</div>
      </div>
    </div>
    <div class="result-message" v-if="resultMesage">{{ resultMesage }}</div>
    <div class="andy">{{ result }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .exec {
    width: 10%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: auto;
    background-color: #F7931A;
    color: white;
    cursor: pointer;
    border-radius: 3px;
    transition: .3s;
    &:hover {
      opacity: .6;
    }

  }
  .info-list {
    width: 60%;
    margin: 0 auto 20px;
  }
  .info {
    margin-bottom: 10px;
    line-height: 22px;
    height: 22px;
    &__label {
      width: 30%;
      float: left;
    }
    &__content {
      width: 70%;
      float: left;
    }
  }
</style>

<script>
  import indexField from './index_field';

  export default indexField;
</script>
