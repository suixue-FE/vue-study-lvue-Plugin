// 保存构造函数引用，避免import
let Vue;

class Store {
  constructor(options) {
    // this.$options = options;
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._getters = options.getters
    const computed = {}
    this.getters = {}
    const that = this
    Object.keys(this._getters).forEach(value => {
      const fn = that._getters[value]
      // 构造计算属性
      computed[value] = function (){
        return fn(that.state)
      }
      // 代理 每次获取getters的属性时从vm中取
      Object.defineProperty(that.getters,value,{
        get:()=> that._vm[value]
      })
    })
    // console.log(this.getters);
    // 响应化处理state
    // this.state = new Vue({
    //   data: options.state
    // })
    this._vm = new Vue({
      data: {
        // 加两个$，Vue不做代理
        $$state: options.state
      },
      computed
    })
    // Object.keys(this._getters).forEach(value => {

    // })
    // 绑定commit、dispatch的上下文问store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 存取器， store.state
  get state() {
    console.log(this._vm);

    return this._vm._data.$$state
  }

  set state(v) {
    console.error('你造吗？你这样不好！');

  }

  // store.commit('add', 1)
  // type: mutation的类型
  // payload：载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }

  getters(){

  }

}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })

}

// Vuex
export default {
  Store,
  install
}
