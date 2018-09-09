// pages/collect/collect.js
import { fetch } from '../../utils/util.js';

Page({

  data: {
    isLoading: false,
    collectData: []
  },

  onLoad: function (options) {
    console.log('Collect--->--->options',options)
    this.getData()
  },

  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get('/collection').then(res => {
      console.log("Collect--->collect--->", res);
      this.setData({
        collectData: res.data,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },

  jumpBook(event) {
    this.data.collectData.forEach(item => {
      let id = item.book._id
      wx.navigateTo({
        url: `/pages/details/detail?id=${id}`,
      })
    }) 
  },

  onReachBottom() {
    this.getData();
  },

  onShareAppMessage: function () {
  
  }
})