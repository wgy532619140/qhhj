require(['../js/main.js'], function() {
    require(['util'], function(url) {
        console.log(url.getUrlParam('id'))
		mui.ajax('/cx',{
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型	
			data:{
				id:url.getUrlParam('id')
			},
			success:function(data){				
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(data.data)
				document.querySelector(".name").children[0].innerHTML = data.data[0].name
				document.querySelector(".age").children[0].innerHTML = data.data[0].age
			}
		});
		document.querySelector(".mui-btn-primary").addEventListener('tap',function(){
		  console.log(url.getUrlParam('id'))
		  var idx = url.getUrlParam('id')
		  window.location.href = "http://localhost:8080/page/message.html?id="+idx
		}) 
    })
})