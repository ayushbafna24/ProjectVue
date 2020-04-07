import Vue from 'vue'
import App from './App.vue'
import {router} from './router';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css'
import { DropDownList } from '@progress/kendo-vue-dropdowns';
import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper';

Vue.config.productionTip = false;
Vue.component('dropdownlist', DropDownList);
Vue.use(SchedulerInstaller);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
