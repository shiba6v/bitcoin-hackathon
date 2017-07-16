import Vue from 'vue';
import page from './../utils/page';
import indexField from './index_field.vue';

page('histories', 'index', () => {
  new Vue({
    el: '#history-field',
    render(createElement) {
      return createElement(indexField);
    }
  });
});
