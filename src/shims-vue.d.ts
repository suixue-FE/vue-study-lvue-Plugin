import Vue from 'vue'
import {AxiosInstance} from 'axios'
import VueRouter from 'vue-router'
import {Store} from 'vuex'

declare module '*.vue' {
  // import Vue from 'vue'
  export default Vue
}

// 模块化拓展vue

declare module "vue/types/vue"{
  interface Vue{
    $axios: AxiosInstance
  }
}

// 扩展ComponentOptions 选项
declare module "vue/types/options"{
  interface ComponentOptions<V extends Vue>{
    router?: VueRouter;
    store?: Store<any>;

  }
}