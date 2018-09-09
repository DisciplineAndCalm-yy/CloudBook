// pages/user/user.js
import { fetch } from '../../utils/util.js';

Page({

  data: {
    isLoading: false,
    userInfo: {},
    collectData: []
  },

  onLoad: function(options){
    this.setData({
      isLoading: true,
    });
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      }
    });
    this.getData();
  },

  onReady: function() {
    this.getData();
  },

  getData() {
    fetch.get('/collection').then(res => {
      console.log("User--->collect--->",res);
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

  jumpCollect() {
      wx.navigateTo({
        url: `/pages/collect/collect`,
      })
  },

  chickText() {
    wx.showModal({
      title: '点我干嘛？',
      content: '好玩吗？',
      showCancel: false      
    })
  },

  onPullDownRefresh() {
    this.getData();
  },

  onShareAppMessage: function () {
  
  }
})