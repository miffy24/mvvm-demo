fakeData()

function Model(options){
  this.data = options.data
  this.resource = options.resource
}
Model.prototype.fetch = function(id){
  return axios.get(`/${this.resource}s/${id}`).then((response)=>{
    this.data = response.data
    return response
    
  })
}

Model.prototype.update = function(data){
  let id = this.data.id
  return axios.put(`/${this.resource}s/${id}`,data).then((response)=>{
    this.data = response.data
      console.log('response')
      console.log(response.data)
    return response
    
  })
}

function View({el,template}){
  this.el = el
  this.template = template
}
View.prototype.render = function(data){

  let html = this.template
  for(let key in data){
    html = html.replace(`__${key}__`,data[key])
  }
  $(this.el).html(html)

}


// ----------  上面是 MVC 类，下面是对象
let model = new Model({
  data:{
    name: '',
    number: 0,
    id: ''
  },
  resource:'book'
})

let view = new Vue({
  el: '#app',
    data:{
    book:{
      name: '未命名',
      number: 0,
      id: ''
    },
  n:1,
  },
  template: `
    <div>
        <div>
        书名：《{{book.name}}》
        数量：<span id=number>{{book.number}}</span>
        </div>
        <div>
          <input v-model="n">
        </div>
        <div>
          <button v-on:click="addOne">加{{n}}</button>
          <button v-on:click="minusOne">减{{n}}</button>
          <button v-on:click="reset">归零</button>
        </div>
    </div> 
  `,
  created(){
    model.fetch(1).then(()=>{
      this.book = model.data
    })
  },
  
  methods:{
    addOne(){
      model.update({
        number: this.book.number + (this.n - 0)
      }).then(()=>{
        this.view.book = model.data
      
      })
    },
    minusOne(){
        model.update({
          number:this.book.number - (this.n - 0) 
        }).then(()=>{
          this.view.book = this.model.data
        })      
      

    },
    reset(){
      model.update({
        number:0
      }).then(()=>{
        this.view.book = this.model.data
      })
    }
  }
})




//不要看

function fakeData(){
  let book =  {
        'name':'JavaScript高级程序设计',
        number:1,
        id:1
      }

// 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // let config = response.config
    // console.log(config)
    // let {method,url,data} = config //data 是请求的data 
    let{config:{method,url,data}} = response
    if(url ==='/books/1' && method ==='get'){
      response.data = book
    }else if(url ==='/books/1' && method ==='put'){
      //将字符串data转化为数字
      
      data = JSON.parse(data)
      Object.assign(book,data)
      
      response.data = book
    }
    return response;
  });
}