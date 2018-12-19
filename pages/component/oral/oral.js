// pages/nation/nation.js
const app = getApp();
const url = app.data.url;
const imgUrl = app.data.imgUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        hiddenmodalput: true,  //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
        imageUrl: imgUrl,
    },

    /**
     * 生命周期函数--监听页面加载 1是图片，2是PPT，3是word ，4是视频
     */
    onLoad: function (options) {
        this.getNaturalData(this.data.status);
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

    },
    //   获取列表信息
    getNaturalData: function (status) {
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: url + '/study/api/listData.json', //请求接口的url
            data: {
                typeId: 3,
                access_token: wx.getStorageSync('token')
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            complete() { //请求结束后隐藏 loading 提示框
                wx.hideLoading();
            },
            success: res => {
                let that = this;
                if (res.data.data) {
                    // 重新拼装
                    let allData = [{ id: 1, name: '学习区', content: [{ id: 1, name: '图片', data: [] }, { id: 2, name: 'PPT', data: [] }, { id: 3, name: 'word文档', data: [] }, { id: 4, name: '视频', data: [] }] }, { id: 2, name: '练习区', content: [{ id: 1, name: '图片', data: [] }, { id: 2, name: 'PPT', data: [] }, { id: 3, name: 'word文档', data: [] }, { id: 4, name: '视频', data: [] }] }, { id: 3, name: '听力区', content: [{ id: 1, name: '图片', data: [] }, { id: 2, name: 'PPT', data: [] }, { id: 3, name: 'word文档', data: [] }, { id: 4, name: '视频', data: [] }] },];
                    let data_ = res.data.data;
                    for (let i = 0; i < data_.length; i++) {
                        data_[i].image = that.data.imageUrl + data_[i].image + "&access_token=" + wx.getStorageSync('token');
                        if (data_[i].typeRegion.id == 11) {
                            // 学习区
                            if (data_[i].typeFile.id == 7) {
                                // 图片
                                allData[0].content[0].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 8) {
                                // 视频
                                allData[0].content[3].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 9) {
                                // PPT
                                allData[0].content[1].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 10) {
                                // word
                                allData[0].content[2].data.push(data_[i]);
                            }

                        } else if (data_[i].typeRegion.id == 12) {
                            // 练习区
                            if (data_[i].typeFile.id == 7) {
                                // 图片
                                allData[1].content[0].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 8) {
                                // 视频
                                allData[1].content[3].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 9) {
                                // PPT
                                allData[1].content[1].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 10) {
                                // word
                                allData[1].content[2].data.push(data_[i]);
                            }

                        } else if (data_[i].typeRegion.id == 13) {
                            // 听力区
                            if (data_[i].typeFile.id == 7) {
                                // 图片
                                allData[2].content[0].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 8) {
                                // 视频
                                allData[2].content[3].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 9) {
                                // PPT
                                allData[2].content[1].data.push(data_[i]);
                            } else if (data_[i].typeFile.id == 10) {
                                // word
                                allData[2].content[2].data.push(data_[i]);
                            }

                        }
                    }
                    // 去除为空的内容
                    var index_ = allData.length;
                    while (index_--) {
                        if (allData[index_].content[0].data.length <= 0 && allData[index_].content[1].data.length <= 0 && allData[index_].content[2].data.length <= 0 && allData[index_].content[3].data.length <= 0) {
                            allData.splice(index_, 1);
                        }
                    }
                    for (let i = 0; i < allData.length; i++) {
                        let index_type = allData[i].content.length;
                        while (index_type--) {
                            if (allData[i].content[index_type].data.length <= 0) {
                                allData[i].content.splice(index_type, 1);
                            }
                        }
                    }
                    this.setData({
                        list: allData,
                    })
                }
            }
        });




    },
    // 显示弹框
    openTip: function (event) {
        // id event.currentTarget.dataset.id;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: url + '/study/api/getData.json', //请求接口的url
            data: {
                access_token: wx.getStorageSync('token'),
                id: event.currentTarget.dataset.id
            },
            method: 'GET', //请求方式
            header: {
                'content-type': 'application/json' // 默认值
            },
            complete() {  //请求结束后隐藏 loading 提示框
                wx.hideLoading();
            },
            success: res => {
                if (res.data.status == 403) {
                    //会员
                    this.setData({
                        hiddenmodalput: !this.data.hiddenmodalput
                    })
                } else {
                    let format = event.currentTarget.dataset.format;
                    let id = event.currentTarget.dataset.id;
                    wx.navigateTo({
                        url: "../course/course?format=" + format + "&id=" + id
                    })
                }
            }
        });

    },
    // 取消按钮
    cancel: function () {
        this.setData({
            hiddenmodalput: true
        });
    },
    // 确认按钮
    confirm: function () {
        this.setData({
            hiddenmodalput: true
        });
    }



})