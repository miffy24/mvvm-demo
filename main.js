$('#addOne').on('click',function(){
    var oldNumber = $('#number').text()
    var newNumber = oldNumber-0+1
    $('#number').text(newNumber)
  })

  $('#minusOne').on('click',function(){
    var oldNumber = $('#number').text()
    if(oldNumber>0){
      var newNumber = oldNumber-0-1
      $('#number').text(newNumber)
     
    }else{
      alert('没有库存了')
    }
  })
  
  $('#reset').on('click',function(){
    $('#number').text(0)
  })