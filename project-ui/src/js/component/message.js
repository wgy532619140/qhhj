require(["../js/main.js"],function() {
	require(["util"],function(url) {
		console.log(url.getUrlParam('id'))
		var id = url.getUrlParam('id')
		if(id){
			document.querySelector(".mui-title").innerHTML = "修改信息"
			mui.ajax('/cx',{
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型	
				data:{
					id:url.getUrlParam('id')
				},
				success:function(data){				
					//服务器返回响应，根据响应结果，分析是否登录成功；
					console.log(data.data)
					document.querySelector(".name").children[1].value = data.data[0].name
					document.querySelector(".age").children[1].value  = data.data[0].age
				}
			});
		}
			
				

		document.querySelector(".mui-btn-primary").addEventListener('tap',function(){
			var pan = {
				name:document.querySelector(".name").children[1].value,
				age:document.querySelector(".age").children[1].value
			}
			if(id) {
				pan.id = url.getUrlParam('id')
			}
			mui.ajax('/data',{
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型	
				data:pan,
				success:function(data){				
					//服务器返回响应，根据响应结果，分析是否登录成功；
					console.log(data)
					if(data.code == 0) {
						 window.location.href = "http://localhost:8080/"
					}else if(data.code == 3){
						mui.toast('用户名存在');
					}
				}
			});
		}) 	
	})
})