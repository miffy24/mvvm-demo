// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // let config = response.config
  // console.log(config)
  // let {method,url,data} = config //data 是请求的data 
  let{config:{method,url,config}} = response
  if(url ==='/books/1' && method ==='get'){
    response.data = {
      'name':'JavaScript高级程序设计',
      number:1,
      id:1
    }
  }
  return response;
});
// 创建请求

axios.get('/books/1')
.then(({data})=> {
  let orginalHtml = $('#app').html()
  let newHtml = orginalHtml.replace('__name__',data.name)
  .replace('__number__',data.number)
  $('#app').html(newHtml)
});

$('#app').on('click','#addOne',function(){
var oldNumber = $('#number').text()
var newNumber = oldNumber-0+1
$('#number').text(newNumber)
})

$('#app').on('click','#minusOne',function(){
var oldNumber = $('#number').text()
if(oldNumber>0){
  var newNumber = oldNumber-0-1
  $('#number').text(newNumber)
}else{
  alert('没有库存了')
}
})
$('#app').on('click','#reset',function(){
$('#number').text(0)
})