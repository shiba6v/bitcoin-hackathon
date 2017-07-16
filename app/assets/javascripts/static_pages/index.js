import Vue from 'vue';
import page from './../utils/page';
import indexField from './index_field.vue';

page('static_pages', 'index', () => {
  new Vue({
    el: '#index-field',
    render(createElement) {
      return createElement(indexField);
    }
  });
});
