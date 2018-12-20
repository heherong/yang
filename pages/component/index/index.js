//index.js
//获取应用实例
//获取应用实例
const app = getApp();
const url = app.data.url;

Page({
  data: {
    title:'123',
    noticeContent:'  321 ',
    ewmImg : '../../../images/ewm.jpg',
    dictionaryUrl : '/study/api/getTypeKeyValue.json',  //数据字典接口 
    InformUrl: '/study/api/getNotice.json',  //通知接口
  },
  onLoad: function () {
        // 获取数据字典
        this.toGetToken(this.data.dictionaryUrl);
        
  },
    // 获取数据字典
    toGetToken: function (url_) {
    	let that = this;
//      wx.showLoading({
//          title: '加载中',
//      })
        wx.request({
            url: url+url_, //请求接口的url
            data: {
                access_token: wx.getStorageSync('token')
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
//          complete() {  //请求结束后隐藏 loading 提示框
//              wx.hideLoading();
//          },
            success: res => {
              app.openConfirm(res);
              //  获取公告
        			that.toGetInfo(that.data.InformUrl);
            },
            fail:res=>{
                console.log(res);
            }
        });
    },

    // 获取通知公告
    toGetInfo: function (url_) {
        let that = this;
        wx.request({
            url: url + url_, //请求接口的url
            data: {
                access_token: wx.getStorageSync('token')
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: res => {
                let res_ = app.openConfirm(res);
                if (res_){
                    that.setData({
                        title: res_.data.data.title,
                        noticeContent: res_.data.data.content
                    })
                }
                
            },
            fail: res => {
                console.log(res);
            }
        });
    },


})
