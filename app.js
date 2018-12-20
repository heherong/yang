//app.js
App({
    /**
     * 页面的初始数据
     */
    data: {
        third_session:'',
        userInfo:[],
        url: "https://herongnizi.cn",
      imgUrl:'https://herongnizi.cn/study/data/img?path='
    },
    onLaunch: function () {
      
    },
    openConfirm: function (res) {
    	if(res.statusCode == 401){
    		wx.removeStorageSync('token');
    		wx.removeStorageSync('userInfo');
    		//登录超时
    		wx.showToast({
				  title: '登录超时，请重新授权',
                  icon:'none',
			})
            setTimeout(function () {
                wx.navigateTo({
                    url: "../shouquan/shouquan",
                })
            }, 1000)
            
    	}else{
    		return res;
    	}
        
    },
    // success
    successShowok: function (content) {
        wx.showToast({
            title: content,
            icon: 'success',
            duration: 2000
        })
    },
    // 时间转换
      timeChange:function(time){
        let data = time.substring(0,10);
        return data;
    }
})