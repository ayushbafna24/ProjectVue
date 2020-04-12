import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css'
import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper';
import {
  Chart,
  Sparkline,
  StockChart,
  ChartInstaller
} from '@progress/kendo-charts-vue-wrapper';

import { Menu, LayoutInstaller, TabStrip } from '@progress/kendo-layout-vue-wrapper';
import { DropDownList } from '@progress/kendo-vue-dropdowns';
import CommandCell from './Views/LogKeeping/LogsAction.vue';

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { ApiService } from './service/api.service';

Vue.use(ChartInstaller);
Vue.use(LayoutInstaller);
Vue.config.productionTip = false;
Vue.component('dropdownlist', DropDownList);
Vue.use(SchedulerInstaller);

// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.prototype.$ApiService = ApiService;
// Vue.prototype.$CommandCell = Vue.component("template-component", CommandCell);

new Vue({
  router,
  components: {
    Chart,
    Sparkline,
    CommandCell,
    TabStrip,
    Menu,
    StockChart
  },
  render: h => h(App),
}).$mount('#app')