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
        <span class="result__label">Hash created</span>
        <span class="result__content"> {{ calcTimesView }}</span>
      </div>
    </div>
    <div class="result-message" v-if="resultMesage">{{ resultMesage }} <span class="golden-text">{{result}}</span></div>
    <transition name="golden">
      <img src="ticket.jpeg" alt="" class="ticket" v-if="resultMesage">
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .golden-enter-active, .golden-leave-active {
    transition: opacity 1.5s;
  }
  .golden-enter, .golden-leave-to {
    opacity: 0;
  }
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
    font-size: 1rem;
    text-align: center;
  }
  .result-message {
    text-align: center;
    line-height: 3;
    font-size: 1.1rem;
  }
  .golden-text {
    color:#755d41;
    text-shadow:0 2px 0 #755d41,0 2px 1px rgba(0,0,0,0.8);
    &:before {
      color:#b6a57a;
      -webkit-mask-image:-webkit-linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%, rgba(0,0,0,0));
    }
    &:after {
      color: #fff;        
      -webkit-mask-image:-webkit-linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,0) 20%, rgba(0,0,0,0.2) 36%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 44%, rgba(0,0,0,0) 60%, rgba(0,0,0,0));
    }
  }
  .ticket {
    width: 40%;
    margin: auto;
    display: block;
  }
</style>

<script>
  import indexField from './index_field';

  export default indexField;
</script>
