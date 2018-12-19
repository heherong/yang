// pages/shouquan/shouquan.js
//获取应用实例
const app = getApp();
const url = app.data.url;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 查看是否授权
        let that = this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权
                    if (wx.getStorageSync('token') && wx.getStorageSync("userInfo") ){
                         wx.reLaunch({
                            url: '../index/index',
                         })
                    }
                }
            }
        })
    },
    // 授权登录
    bindGetUserInfo: function (e) {
       var that = this;
        wx.login({
            success: res => {
                wx.setStorageSync("userInfo", e.detail.userInfo);
                if (e.detail.userInfo && res.code) {
                    // 获取token
                    var code_ = res.code;
                    var encryptedData = e.detail.encryptedData;
                    var iv = e.detail.iv;

                    that.toGetToken(url+'/study/api/getToken.json', code_, iv, encryptedData);
                }else{
                    wx.showModal({
                        title: '警告',
                        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                        success: function (res) {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: (res) => {
                                        if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录                     
                                            that.bindGetUserInfo();
                                        }
                                    }, fail: function (res) {
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    // 请求
    toGetToken: function (url_, code_, iv_, encryptedData_) {
        wx.request({
            url: url_, //请求接口的url
            data: {
                code: code_,
                encryptedData: encryptedData_,
                iv: iv_
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            complete() {  //请求结束后隐藏 loading 提示框
                wx.hideLoading();
            },
            success: res => {
                // 保存token
                wx.setStorageSync("token",res.data.token);
                wx.reLaunch({
                  url: '../index/index',
                })
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})