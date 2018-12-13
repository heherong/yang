// pages/comment/comment.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
      format: 0,  //文件类型 1是图片，2是PPT，3是word ，4是视频
      id:0,   //文件id
      hiddenmodalput: true,  //弹框
      list:[],  //文件具体信息
      userInfo:{},  //用户信息
      comment_textarea:''
  },

  /**
   * 生命周期函数--监听页面加载 1是图片，2是PPT，3是word ，4是视频
   */
  onLoad: function (options) {
        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        })
        let allList = this.getData(options.format, options.id);
        // console.log(allList);
        this.setData({
            format: options.format,
            id: options.id,
            list: allList
        })
        wx.setNavigationBarTitle({
            title: allList[0].name
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
    // 获取对应数据
    getData(format, id){
        if (format == 1 ){
            let list =[ {
                // 图片
                id: 1,
                format:1,
                name: '英语学习小图片',
                scan:56,
                content:[
                    {id: 1,  course:'../../../images/12.jpg' },
                    { id: 2, course: '../../../images/13.jpg' },
                    { id: 3, course: '../../../images/14.jpg' },
                    { id: 4, course: '../../../images/15.jpg' },
                ],
                comment:[
                    { id: 1, name: '用户1', evaluate: '很喜欢，很不错' , image:'../../../images/12.jpg' },
                    { id: 2, name: '用户2', evaluate: '学到了很多，希望以后可以经常更新', image: '../../../images/15.jpg' },
                    { id: 3, name: '用户3', evaluate: '喜欢', image: '../../../images/13.jpg' },
                    { id: 4, name: '用户4', evaluate: '还好，有待改善', image: '../../../images/14.jpg'},
                    { id: 5, name: '用户5', evaluate: '一般般,浏览量的圣诞节是你就会产生多吃点的教科书的经适房的所发生的和副驾驶的回复就收到货加拿大后发生大幅度咦借记卡霍建华共和国高回报', image: '../../../images/16.jpg' }
                ]
            }]
            return list;
        } else if (format == 2 || format == 3){
            // PPT
            let list = [{
                id: 2,
                format: 2,
                name: '英语学习word',
                scan: 33,
                picture:'../../../images/12.jpg',
                link:'www.baidu.com',
                comment: [
                    { id: 1, name: '用户11', evaluate: '很喜欢，很不错', image: '../../../images/12.jpg' },
                    { id: 2, name: '用户22', evaluate: '学到了很多，希望以后可以经常更新', image: '../../../images/15.jpg' },
                    { id: 3, name: '用户33', evaluate: '喜欢', image: '../../../images/13.jpg' },
                    { id: 4, name: '用户44', evaluate: '还好，有待改善', image: '../../../images/14.jpg' },
                    { id: 5, name: '用户55', evaluate: '一般般,浏览量的圣诞节是你就会产生多吃点的教科书的经适房的所发生的和副驾驶的回复就收到货加拿大后发生大幅度咦借记卡霍建华共和国高回报', image: '../../../images/16.jpg' }
                ]
            }]
            return list;
        } else if(format == 4){
            let list = [{
                id: 3,
                name: '英语学习小视频',
                scan:1024,
                content: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
                comment: [
                    { id: 1, name: '用户11', evaluate: '很喜欢，很不错', image: '../../../images/12.jpg' },
                    { id: 2, name: '用户22', evaluate: '学到了很多，希望以后可以经常更新', image: '../../../images/15.jpg' },
                    { id: 3, name: '用户33', evaluate: '喜欢', image: '../../../images/13.jpg' },
                    { id: 4, name: '用户44', evaluate: '还好，有待改善', image: '../../../images/14.jpg' },
                    { id: 5, name: '用户55', evaluate: '一般般,浏览量的圣诞节是你就会产生多吃点的教科书的经适房的所发生的和副驾驶的回复就收到货加拿大后发生大幅度咦借记卡霍建华共和国高回报', image: '../../../images/16.jpg' }
                ]
            }]
            return list;
        }

    },
    // toComment 留言
    toComment:function(e){
        let that = this;
        let third_session = wx.getStorageSync("third_session");
        // 判断third_session是否存在，存在便弹框留言内容，不存在便弹框授权内容
        if (third_session.length>0){

            console.log(this.data.userInfo);
            this.setData({
                hiddenmodalput: !this.data.hiddenmodalput
            })
        }else{
            // 过期的话就需要重新获取了
        }
        
    },
    bindinput: function (e) {
        this.setData({
            comment_textarea: e.detail.value
        });

    },
    //取消按钮
    cancel: function () {
        this.setData({
            hiddenmodalput: true
        });
    },
    //确认
    confirm: function () {
        
        if (this.data.comment_textarea){
            console.log(this.data.comment_textarea);
            // 关闭
            this.setData({
                hiddenmodalput: true
            })
            // 调接口
            app.successShowok("评论成功");
            // 清空评论数据
            this.setData({
                comment_textarea: ''
            });
        }
        
    }

    // loading
    // wx.showLoading({
    //     mask: true,
    //     title: '努力加载中...',
    // });
    // wx.hideLoading();

})