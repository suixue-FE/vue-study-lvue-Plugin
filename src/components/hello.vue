<template>
    <div class='hello'>
        <!-- 新增特性 -->
        <p><input type="text" @keydown.enter="addFeature"></p>
        <!-- ts特性列表 -->
        <ul>
            <li v-for="feature in features" :key="feature.id">
                {{feature.name}}
            </li>
        </ul>
        <p>共{{count}}条</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import {Feature} from '../types/index'
import {getFeatures} from '../api/feature'

@Component
export default class hello extends Vue{
    // 属性就是data
    features: Feature[] = []

    // 测试
    // 括号中的配置是给vue的
    // 变量附近的配置是给ts的
    @Prop({type:String,required:true})
    msg!:string;

    // 直接声明就行
    addFeature(e: KeyboardEvent):void{
        // target的类型是 eventTarget 但是我确定 e.target是继承于它的子类HTMLInputElement所以我可以用一个断言
      const inp =  e.target as HTMLInputElement
      this.features.push({id:this.features.length+1,name:inp.value})
      inp.value = ''
    }

    // 生命周期也可以直接声明
    created(){
        // getFeatures().then(res =>{
        //     this.features = res.data
        // })
        this.$axios.get<Feature[]>('/api/list').then(res =>{
            this.features = res.data
        })
        // this.features = [{name:'类型注释',id:1}]
    }

    // 计算属性
    get count(){
        return this.features.length
    }
}
</script>


<style lang="scss" scope>

</style>