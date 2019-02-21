 require(['./js/main.js'], function() {
     require(['util'], function(url) {
         console.log(url);		 
		 
		 var cz = document.querySelector("#ul")
		 mui('.mui-scroll-wrapper').scroll({
		 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		 });		 
		 
		 //默认加载
		 
		 
		 mui.ajax('/moren',{
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型	              
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(document.querySelector("#ul"))
				var html = ""
				data.data.forEach(function (e){
					html+=`<li class="mui-table-view-cell" data-id = "${e._id}">
					<div>${e.name}</div>
					<div class="">
						<button type="button" class="mui-btn mui-btn-primary">详情</button>
						<button type="button" class="mui-btn mui-btn-success">删除</button>
					</div>
				</li>`				
				});
				cz.innerHTML = html
			}
		});


		//点击详情
		
		mui(".mui-table-view").on('tap','.mui-btn-primary',function(){
		  console.log(this.parentNode.parentNode.dataset.id)
		  var idx = this.parentNode.parentNode.dataset.id
		  window.location.href = "http://localhost:8080/page/details.html?id="+idx
		}) 
		
		
		//点击添加
		
		document.querySelector(".mui-pull-right").addEventListener('tap',function(){		  
		  window.location.href = "http://localhost:8080/page/message.html"
		})
		
		//点击删除
		
		
		mui(".mui-table-view").on('tap','.mui-btn-success',function(){
		  console.log(this.parentNode.parentNode.dataset.id)
		  var idx = this.parentNode.parentNode.dataset.id
		  var info = document.getElementById("info");
		  var btnArray = ['取消', '确定'];
		  var _this = this
		  mui.confirm('确定要删除吗？', '删除', btnArray, function(e) {
			  
		  	if (e.index == 1) {
		  		mui.ajax('/rome',{
					data:{
						id:idx
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型					              
					success:function(data){
						//服务器返回响应，根据响应结果，分析是否登录成功；
						if(data.code == 0) {
							console.log(_this)
							
							cz.removeChild(_this.parentNode.parentNode)
							mui.toast('删除成功');
						}else if(data.code == 1) {
							mui.toast('删除失败');
						}
					},				
				});
		  	}
			
		  })	  
		}) 
		
     })
 })