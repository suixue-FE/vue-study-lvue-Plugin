module.exports = {
  devServer:{
    before(app){
      app.get('/api/list',(req,res)=>{
        res.json([{name:'类型注释',id:1}])
      })
    }
  }
}