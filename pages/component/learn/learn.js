//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    list: [
      {
        id: 'read',
        name: '阅读小课堂',
        open: true,
        pages: ['学习英语小窍门', '元音辅音大区分', '口语技巧', '笔记应该怎么写']
      },{
        id: 'view',
        name: '视频小课堂',
        open: true,
        pages: ['视频1', '视频2', '视频3', '视频4']
      },
    ]
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      }
      //  else {
      //   list[i].open = false
      // }
    }
    this.setData({
      list
    })
  },
  onLoad: function () {
    
  }
})
