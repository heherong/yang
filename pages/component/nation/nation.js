// pages/nation/nation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        hiddenmodalput: true  //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    },

    /**
     * 生命周期函数--监听页面加载 1是图片，2是PPT，3是word ，4是视频
     */
    onLoad: function (options) {
        let allData = this.getNaturalData();
        this.setData({
            list: allData,
        })
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
    getNaturalData: function () {
        let list = [
                {
                    id: 1,
                    name: '学习区',
                    content: [
                        {
                            id: 1,
                            name: '图片',
                            data: [
                                { id: 1, name: '学习区图片分享', mount: 12, image: '../../../images/12.jpg', vip: true },
                                { id: 2, name: '学习区图片分享', mount: 34, image: '../../../images/12.jpg', vip: false },
                                { id: 3, name: '学习区图片分享', mount: 56, image: '../../../images/13.jpg', vip: false }
                            ]
                        },
                        {
                            id: 2,
                            name: 'PPT',
                            data: [
                                { id: 1, name: '学习区图片分享', mount: 12, image: '../../../images/14.jpg', vip: true },
                                { id: 1, name: '学习区图片分享', mount: 12, image: '../../../images/14.jpg', vip: false },
                                { id: 2, name: '学习区图片分享', mount: 34, image: '../../../images/15.jpg', vip: true }
                            ]
                        },
                        {
                            id: 3,
                            name: 'word文档',
                            data: [
                                { id: 1, name: '学习区图片分享', mount: 12, image: '../../../images/12.jpg', vip: false },
                                { id: 2, name: '学习区图片分享', mount: 34, image: '../../../images/12.jpg', vip: false },
                                { id: 3, name: '学习区图片分享', mount: 56, image: '../../../images/13.jpg', vip: true },
                                { id: 4, name: '学习区图片分享', mount: 78, image: '../../../images/14.jpg', vip: true },
                                { id: 5, name: '学习区图片分享', mount: 99, image: '../../../images/15.jpg', vip: false },
                            ]
                        },
                        {
                            id: 4,
                            name: '视频',
                            data: [
                                { id: 1, name: '学习区图片分享', mount: 12, image: '../../../images/12.jpg', vip: false },
                                { id: 2, name: '学习区图片分享', mount: 34, image: '../../../images/12.jpg', vip: false },
                                { id: 3, name: '学习区图片分享', mount: 56, image: '../../../images/12.jpg', vip: false },
                                { id: 4, name: '学习区图片分享', mount: 78, image: '../../../images/12.jpg', vip: false },
                                { id: 5, name: '学习区图片分享', mount: 99, image: '../../../images/12.jpg', vip: false },
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    name: '听力区',
                    content: [
                        {
                            id: 1,
                            name: '图片',
                            data: [
                                { id: 1, name: '学习区图片分享', mount: 12, image: '../../../images/12.jpg', vip: false },
                                { id: 2, name: '学习区图片分享', mount: 34, image: '../../../images/12.jpg', vip: false },
                                { id: 3, name: '学习区图片分享', mount: 56, image: '../../../images/12.jpg', vip: false },
                                { id: 4, name: '学习区图片分享', mount: 78, image: '../../../images/12.jpg', vip: false },
                                { id: 5, name: '学习区图片分享', mount: 99, image: '../../../images/12.jpg', vip: false },
                            ]
                        }

                    ]
                },
            ];
            return list;
        
    },
    //   切换栏目
    onChangeTap: function (event) {
        let that = this;
        let allData = that.getNaturalData(id);
        that.setData({
            list: allData,
        })
    },
    // 显示弹框
    openTip: function (event) {
        // 不是VIP
        if (event.currentTarget.dataset.vip) {
            this.setData({
                hiddenmodalput: !this.data.hiddenmodalput
            })
        } else {
            // 是VIP
            let format = event.currentTarget.dataset.format;
            let id = event.currentTarget.dataset.id;
            // console.log(format);
            wx.navigateTo({
                url: "../course/course?format=" + format + "&id=" + id
            })
        }

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