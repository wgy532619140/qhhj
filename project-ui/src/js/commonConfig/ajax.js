(function(){
    var XHR = {
        creatStandarXHR:function(){
            return new XMLHttpRequest();//标准浏览器
        },
        creatIEXHR:function(){
            return new ActiveXObject("Microsoft.XMLHTTP");//IE浏览器
        },
        creatErrorXHR:function(){
            alert("您的浏览器out了,换一个吧");
            return null;
        },
        creatXHR:function(){
            var xhr = null;//函数的返回值
            if(window.XMLHttpRequest){
                this.creatXHR = this.creatStandarXHR;
            }else{
                this.creatXHR = this.creatIEXHR;
            }

            try{
                xhr = this.creatXHR();
            }catch(e){
                this.creatXHR = this.creatErrorXHR;
                xhr = this.creatXHR();
            }
            return xhr;
        },
        ajax:function(opts){
            var defaults = { 
                type:"get",
                asy:true,
                dataType:"json"
            };
            var options = Object.assign({},defaults,opts); 
            var xhr = this.creatXHR(),//第一步创建ajax
                method = (options.type || "GET").toUpperCase(),
                isPost = method == "POST",
                data = this.param(options.data),
                url = this.buildUrlParam(options.url,data,isPost);
            xhr.open(method,url,options.asy==undefined?true:options.asy);
            
            if(isPost){
                xhr.setRequestHeader("content-type","application/www-form-urlencoded")
            }
            xhr.send(isPost?data:null);
            var statechange = this.statechange;
            xhr.onreadystatechange = function(){
                statechange(xhr,options,options.success,options.error)
            }        
        },
        buildUrlParam:function(url,data,ispost){
            if(data && !ispost){
                if(url.indexOf("?")<0){
                    url += "?" + data;
                }else{
                    url += "&" + data;
                }
            }
            return url;
        },
        param:function(data){
            if(!data){
                return null;
            }

            if(typeof(data)!=="object"){
                return data;
            }

            var paramArray = [];
            for(var key in data){
                paramArray.push(key+"="+data[key]);
            }
            return paramArray.join("&");
        },
        statechange:function(xhr,obj,success,error){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    var resultData = null;

                    if(obj.dataType == "json"){
                        resultData = eval("("+xhr.responseText+")")
                    }else if(obj.dataType == "xml"){
                        resultData = xhr.responseXML;
                    }else{
                        resultData = xhr.responseText;
                    }
                    success(resultData);
                }else{
                    if(error){
                        erronFn.call(xhr,statusText,status);
                    }
                }
            }else{
                if(error){
                    errorFn.call(xhr,statusText,status);
                }
            }
        }
    }
    window.ajax = function(opts){
        XHR.ajax.call(XHR,opts);
    }
})()

