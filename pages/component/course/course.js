// pages/comment/comment.js
//获取应用实例
const app = getApp();
const url = app.data.url;
const imgUrl = app.data.imgUrl

Page({
    /**
     * 页面的初始数据
     */
    data: {
        format: 0, //文件类型 1是图片，2是PPT，3是word ，4是视频
        id: 0, //文件id
        hiddenmodalput: true, //弹框
        list: [], //文件具体信息
        userInfo: {}, //用户信息
        imageUrl: imgUrl,
        comment_textarea: '',
        commentNull: true,
    },

    /**
     * 生命周期函数--监听页面加载 1是图片，2是PPT，3是word ，4是视频
     */
    onLoad: function(options) {
        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        })
        // 获取浏览数
        this.toGetScan(options.format, options.id);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    // 获取对应数据
    getData(format_, id_) {
        let that = this;
        // 设置数据
        that.setData({
            format: format_,
            id: id_,
        })
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: url + '/study/api/getData.json', //请求接口的url
            data: {
                access_token: wx.getStorageSync('token'),
                id: id_
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            complete() { //请求结束后隐藏 loading 提示框
                wx.hideLoading();
            },
            success: res => {
                let allData = [{}];
                allData[0].id = res.data.data.id;
                allData[0].format = format_;
                allData[0].name = res.data.data.title;
                allData[0].scan = res.data.data.scan;
                allData[0].comment = [];

                if (format_ == 1) {
                    // 图片  1是图片，2是PPT，3是word ，4是视频
                    for (var i = 0; i < res.data.data.pictureList.length; i++) {
                        res.data.data.pictureList[i] = that.data.imageUrl + res.data.data.pictureList[i] + "&access_token=" + wx.getStorageSync('token');
                    }
                    allData[0].content = res.data.data.pictureList;
                    // 获取评论
                    that.toGetPinglun(allData, id_, format_);
                } else if (format_ == 2 || format_ == 3) {
                    // ppt word
                    allData[0].picture = that.data.imageUrl + res.data.data.image + "&access_token=" + wx.getStorageSync('token');
                    allData[0].file = res.data.data.file;
                    // 获取评论
                    that.toGetPinglun(allData, id_, format_);
                } else if (format_ == 4) {
                    // 视频
                    allData[0].content = that.data.imageUrl + res.data.data.file + "&access_token=" + wx.getStorageSync('token');
                    // 获取评论
                    that.toGetPinglun(allData, id_, format_);
                }
            }
        });
    },
    // 获取浏览数
    toGetScan: function(format, id_) {
        let that = this;
        wx.request({
            url: url + '/study/api/addScan.json', //请求接口的url
            data: {
                access_token: wx.getStorageSync('token'),
                id: id_
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: res => {
                // 获取内容及评论
                that.getData(format, id_);
            }
        });
    },
    // 获取评论
    toGetPinglun: function(allData, id_, format_, status) {
        let that = this;
        wx.request({
            url: url + '/study/api/listComment.json', //请求接口的url
            data: {
                access_token: wx.getStorageSync('token'),
                id: id_
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            complete() { //请求结束后隐藏 loading 提示框
                wx.hideLoading();
            },
            success: res => {
                if (res.data.data && res.data.data.length > 0) {
                    allData[0].comment = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        allData[0].comment[i] = {};
                        allData[0].comment[i].name = res.data.data[i].userName;
                        allData[0].comment[i].image = res.data.data[i].headImgUrl;
                        allData[0].comment[i].evaluate = res.data.data[i].content;
                        allData[0].comment[i].dateCreated = app.timeChange(res.data.data[i].dateCreated);
                    }

                    that.setData({
                        commentNull: false
                    })
                } else {
                    that.setData({
                        commentNull: true
                    })
                }
                // 设置数据
                that.setData({
                    list: allData
                })
               
                wx.setNavigationBarTitle({
                    title: allData[0].name
                })

            }
        });
        //判断是否是评论成功
        if (status == 1) {
            setTimeout(function () {
                wx.showToast({
                    title: '评论成功！',
                    icon: 'success',
                    duration: 2000
                })
            }, 1000)
        }
    },
    // toComment 留言
    toComment: function(e) {
        let that = this;
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },
    bindinput: function(e) {
        this.setData({
            comment_textarea: e.detail.value
        });

    },
    //取消按钮
    cancel: function() {
        this.setData({
            hiddenmodalput: true
        });
    },
    //确认
    confirm: function() {
        let that = this;
        if (that.data.comment_textarea != "") {
            // 调接口
            wx.request({
                url: url + '/study/api/creatComment.json', //请求接口的url
                data: {
                    access_token: wx.getStorageSync('token'),
                    id: that.data.id,
                    content: that.data.comment_textarea
                },
                method: 'POST', //请求方式
                header: {
                    "Content-Type": "application/x-www-form-urlencoded" // 默认值
                },
                complete() { //请求结束后隐藏 loading 提示框
                    wx.hideLoading();
                    // 关闭
                    that.setData({
                        hiddenmodalput: true
                    })
                },
                success: res => {
                    wx.showLoading({
                        title: '加载中',
                    })
                    // 获取评论
                    that.toGetPinglun(that.data.list, that.data.id, that.data.format, 1)
                }
            });

            // app.successShowok("评论成功");
            // 清空评论数据
            that.setData({
                comment_textarea: ''
            });
        }
    },
    // 下载
    toDownload: function() {
        let that = this;
        wx.showLoading({
            title: '加载中',
        })

        let url_ = 'https://herongnizi.cn/study/data/file?path=' + this.data.list[0].file + '&access_token=' + wx.getStorageSync('token');
        let filetype_ = 'ppt';
        if (that.data.format == 3) {
            filetype_ = 'doc';
        }else{
        	filetype_ = 'ppt';
        }
        that.downloadFun(url_,filetype_,1)
        wx.hideLoading();
    },
    //下载方法
    downloadFun:function(url_,filetype_,count_){
    	let that = this;
    	if(count_<=2){
    		wx.downloadFile({
	        url: url_,
	        success: function(res) {
	            console.log(res);
	            var filePath = res.tempFilePath
	            wx.openDocument({
	                filePath: filePath,
	                fileType: filetype_,
	                success: function(res) {
	                    console.log('打开文档成功')
	                },
	                fail: function(res) {
	                  that.downloadFun(url_,filetype_+'s',count_++)
	                },
	                complete: function(res) {
	                }
	            })
	        },
	        fail: function(res) {},
	        complete: function(res) {}
	      })
    	}
    	
    }
    // loading
    // wx.showLoading({
    //     mask: true,
    //     title: '努力加载中...',
    // });
    // wx.hideLoading();

})