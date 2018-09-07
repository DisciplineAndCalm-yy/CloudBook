// pages/user/user.js
Page({

  data: {
    isLoading: false,
    userInfo: {}
  },

  onLoad: function(options){
    this.setData({
      isLoading: true
    })
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  },

  onReady: function() {
    this.setData({
      isLoading: false
    })
  },

  onShareAppMessage: function () {
  
  }
})