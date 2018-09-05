// pages/details/details.js
import { fetch } from '../../utils/util.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId: '',
    bookData: {},
    isLoading: false
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      bookId: options.id
    })
    this.getData()
  },
  getData() {
    this.setData({
      isLoading: true
    }),
      fetch.get(`/book/${this.data.bookId}`).then(res => {
        this.setData({
          bookData: res,
          isLoading: false
        });
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
  },
  jumpCatalog() {
    wx.navigateTo({
      url: '/pages/catalog/catalog?id=${this.data.bookId}',
    })
  },
  getLoading() {
    this.setData({
      isLoading: !this.data.isLoading
    })
  },
  onShareAppMessage: function () {

  }
})