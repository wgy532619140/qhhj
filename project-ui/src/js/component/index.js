 require(['./js/main.js'], function() {
     require(['util'], function(url) {
         		 
		var cz = document.querySelector("#ul")
		var page= 1;
			pagesize = 5;
			tital = 0;
		var count = 0; 
		
		mui('.mui-scroll-wrapper').scroll({
		 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});		 
		
		
		//默认加载
		mui.init({
				 	pullRefresh: {
				 		container: '#pullrefresh',
						
		// 		 		down: {
		// 		 			callback: pulldownRefresh
		// 		 		},
				up: {
					auto:true,
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				},
			}
		});
		//上拉加载		
		function pullupRefresh() {
			console.log(count)
			mui.ajax('/mhcx',{
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				data:{
					val:document.querySelector(".mui-input-clear").value,
					page:page,
					pagesize:pagesize
				},
				success:function(data){
					//服务器返回响应，根据响应结果，分析是否登录成功；
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
					cz.innerHTML += html
					
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= data.pages)); //参数为true代表没有更多数据了。
					console.log(data.data)
				}
			});
			page++
		}
		//搜索		 
		document.querySelector(".mui-input-clear").onkeydown = function(e) {
		    if (e.keyCode == 13 && this.value !== '') {
				cz.innerHTML = ""
				page = 1
				count = 0
				mui.ajax('/mhcx',{
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					data:{
						val:this.value,
						page:page,
						pagesize:pagesize
					},
					success:function(data){
						//服务器返回响应，根据响应结果，分析是否登录成功；
						console.log(data)
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
				page++
		    }
		} 

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
		
		
		 
		 
// 		document.querySelector(".mui-input-clear").oninput = function(e) {
// 		    if (this.value == '') {	
// 				page = 1
// 				cz.innerHTML = ""
// 		        mui.ajax('/moren',{
// 				dataType:'json',//服务器返回json格式数据
// 				type:'post',//HTTP请求类型
// 				data:{
// 					val:document.querySelector(".mui-input-clear").value,
// 					page:page,
// 					pagesize:pagesize
// 				},
// 				success:function(data){
// 					//服务器返回响应，根据响应结果，分析是否登录成功；
// 									console.log(data)
// 					var html = ""
// 					data.data.forEach(function (e){
// 						html+=`<li class="mui-table-view-cell" data-id = "${e._id}">
// 						<div>${e.name}</div>
// 						<div class="">
// 							<button type="button" class="mui-btn mui-btn-primary">详情</button>
// 							<button type="button" class="mui-btn mui-btn-success">删除</button>
// 						</div>
// 					</li>`				
// 					});
// 					cz.innerHTML += html
// 					
// 					mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= data.pages)); //参数为true代表没有更多数据了。
// 					console.log(data.data)
// 				}
// 			});
// 		    }
// 		}				
				
     })
 })
 
 
 
