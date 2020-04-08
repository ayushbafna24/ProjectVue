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

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ChartInstaller);
Vue.use(LayoutInstaller);
Vue.config.productionTip = false;
Vue.component('dropdownlist', DropDownList);
Vue.use(SchedulerInstaller);

// Install BootstrapVue
Vue.use(BootstrapVue)

new Vue({
  router,
  components: {
    Chart,
    Sparkline,
    TabStrip,
    Menu,
    StockChart
  },
  render: h => h(App),
}).$mount('#app')