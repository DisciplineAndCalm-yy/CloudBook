// pages/details/detail.js
import {fetch} from '../../utils/util.js';
Page({

  data: {
    booId: '',
    bookData: {},
    isLoading: false
  },

  onLoad: function (options) {
    console.log("Detaile--->detail---->",options)
    this.setData({
      bookId: options.id
    });
    this.getData();
  },

  getData() {
    this.setData({
      isLoading: true
    });
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      console.log("Detaile--->Data--->",res)
      this.setData({
        bookData: res,
        isLoading: false
      })
      console.log("Detail--->bookData", this.data.bookData);
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },

  toggleCollect() {
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      wx.showToast({
        title: '收藏成功!',
        type: "success",
        duration: 1000
      })
      let bookData = {...this.data.bookData}
      bookData.isCollect = 1
      this.setData({
        bookData: bookData
      })
    })
  },

  jumpCatalog() {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },

  onShareAppMessage: function () {
    return {
      title: this.data.bookData.data.title,
      path: `/pages/details/detail?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.data.img
    }
  }
})