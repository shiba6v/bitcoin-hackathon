<template>
  <div class="hello">
    <img src="logo.png" class="logo">
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
    <div class="exec" @click="startCalc()">Start Mining <i class="fa fa-spinner fa-pulse fa-fw" v-if="isCalculating"></i></div>
    <div class="result-list">
      <div class="result">
        <span class="result__label">Calc Times</span>
        <span class="result__content"> {{ calcTimesView }}</span>
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
    margin-bottom: 20px;
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
  .logo {
    margin: auto;
    display: block;
  }
  .result-list {
    width: 60%;
    margin: auto;
    font-size: 1.1rem;
    text-align: center;
  }
</style>

<script>
  import indexField from './index_field';

  export default indexField;
</script>
