//app.js
App({
    /**
     * 页面的初始数据
     */
    data: {
        third_session:'',
        userInfo:[],
        url: "https://herongnizi.cn"
    },
    onLaunch: function () {
      
    },
    openConfirm: function () {
        // wx.showModal({
        //     content: '检测到您没打开获取用户信息权限，是否去设置打开？',
        //     confirmText: "确认",
        //     cancelText: "取消",
        //     success: function (res) {
        //         console.log(res);
        //         //点击“确认”时打开设置页面
        //         if (res.confirm) {
                    console.log('用户点击确认')
                    wx.openSetting({
                        success: (res) => {
                            wx.reLaunch({
                                url: "pages/component/shouquan/shouquan",
                            })
                        }
                    })
        //         } else {
        //             console.log('用户点击取消')
        //         }
        //     }
        // });
    },
    // success
    successShowok: function (content) {
        wx.showToast({
            title: content,
            icon: 'success',
            duration: 2000
        })
    }

})