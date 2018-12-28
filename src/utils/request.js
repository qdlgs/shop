// 封装一个promise函数 它可以用来请求后台数据
function request(url,methods = 'GET',data = {}){
    return new Promise((resolve,reject) =>{
        wx.request({
            url:url,
            methods:methods,
            data,
            success:function(res){
                resolve(res)
            }
        })
    })
}

// get请求
request.get = function(url, data){
    return request(url, "GET", data);
}
// 定向request请求
export default request;