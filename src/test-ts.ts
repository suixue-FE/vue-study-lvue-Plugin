// 类型注解问题
let var1: String;
var1 = '开课吧'
// var1 = 1

// 类型推论
let var2 = true
// var2 = 1

// 原始类型-常用： String,Number,Boolean,undefined,  null,symbol
let var3:String | undefined;

// 类型数组
let arr: string[]
arr=['tpo','string']

// 任意类型
let varAny: any
varAny = 'vvv'
varAny = 3

let arrAny: any[]
arrAny = [1,true,'free']

function greet(person:string):string {
    return `hello ${person}`
}

const msg = greet('tom')

// void 类型 （执行逻辑但是没有返回值）
function warn():void {
    
}

// 对象object,不是原始类型的就是对象类型
function fn1(o:object){ //不太正确的姿势

}
fn1({prop:0})
// fn1(1)  定义了object就不能传原始类型

// z正确姿势
function fn2(o:{prop:number}){
    console.log(o.prop);
}

fn2({prop:1})


// 类型别名 type ，自定义类型

type Prop = {prop:number}
function fn3(o:Prop){}

// type和接口interface区别不大，兼容性上不同

interface Prop2 {
    prop:number
}

// 类型断言
const someValue : any = 'this is a string'
const strLen = (someValue as string).length // 告知编译环境你就把他当成字符串解析，我确认

// 联合类型
let union: string | number;
union = '1'
union = 1      // 相当于或语句

// 交叉类型（拓展）
type First = {first:number}
type Second = {second:number}
type FirstAndSecond = First & Second// 拓展新的type(First 和 Second 的属性必须要都有)
function fn4():FirstAndSecond{
    return {first:1,second:2}
}

// ts里的函数
// 1.参数设置了就是必填参数
// 2.设置默认参数可不传
function greeting(person: string,msg = 'abc'):string{
    return person+msg
}
greeting('tom')
// 可选参数 加个问号，也可以不传，放在最后
function greeting2(person: string,msg = 'abc',name?:string):string{
    return person+msg
}
greeting2('tom')

// 函数重载:源码、框架中多，函数用参数的个数、类型或者返回值的类型，来区分 同名函数
// 先声明、再实现
function watch(cb1:()=>void):void
// 同名声明有多个
function watch(cb1:()=>void,cb2:(v1:any,v2:any)=>void):void
// 声明完之后实现
function watch(cb1:()=>void,cb2?:(v1:any,v2:any)=>void){
    if(cb1 && cb2){
        console.log('执行重载2');
        
    }else{
        cb1()
    }
}

// 接口
interface Person{
    firstName:String,
    secondName:String
}

// 泛型
// 非泛型，返回类型不定需要定义多个？？！！？？
// interface Result {
//     ok: 0|1;
//     data: Person
// }
// 泛型，返回类型根据传入内容设置，复用性，灵活性
interface Result<T>{
    ok: 0|1
    data:T
}
function getResult<T>(data:T):Result<T>{
    return {ok:1,data}
}
// 尖括号形式指定T为string类型
getResult<string>('hello')
// 类型推断为number
getResult(1)