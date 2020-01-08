// import Link from "./krouter-link";

let _vue

class LVueRouter {
  constructor(options){
    this.$options = options
    // console.log(_vue)
    _vue.util.defineReactive(this,'current','/')

    window.addEventListener('hashchange',this.onHashChange.bind(this))
    window.addEventListener('load',this.onHashChange.bind(this))
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })

  }
  onHashChange() {
    
    this.current = window.location.hash.slice(1)
  }
}

LVueRouter.install = function (vue) {
  _vue = vue
  // console.log(vue)
  // console.log(_vue)
  vue.mixin ({
    beforeCreate(){
      if (this.$options.router) {
        vue.prototype.$router = this.$options.router
      }
    }
  })
  vue.component('router-link', {
    props:{
      to:{
        type:String,
        required: true
      }
    },
    // template: '<div style="height: 100px"/>'
    render(h) {
      // <a href="#/about">abc</a>
      // <router-link to="/about">xxx</router-link>
      // h(tag, data, children)
      // console.log(this.$slots);
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
      // return <a href={'#' + this.to}>{this.$slots.default}</a>
    }
  })
  vue.component('router-view', {
    render(h) {
      console.log(this.$router)
      const {routeMap, current} = this.$router;
      // console.log(this.$slots);
      const components = routeMap[current].component || null
      // console.log(components)
      return h(components)
      // return <a href={'#' + this.to}>{this.$slots.default}</a>
    }
  })
}

export default LVueRouter
