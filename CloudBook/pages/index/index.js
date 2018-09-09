//index.js
//获取应用实例
import { fetch, login } from '../../utils/util.js';

const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    isLoading: false,
    pn: 1,
    hasMore: true
  },

  onLoad() {
    login();
    this.getData(),
    this.getContent()
  },

  getData() {
    return new Promise ((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      fetch.get(`/swiper`).then(res => {
        console.log("swiper", res);
        resolve();
        this.setData({
          swiperData: res.data,
          isLoading: false
        })
      }).catch(err => {
        reject(reject)
        this.setData({
          isLoading: false
        })
      })
    })
  },
  getContent() {
    return new Promise ((resolve, reject) => {
      fetch.get(`/category/books`).then(res => {
        resolve();
        console.log("content", res)
        this.setData({
          mainContent: res.data
        })
      })
    })
  },
  getAllData() {
    return new Promise ((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      Promise.all([this.getData(), this.getContent()]).then(()=>{
        resolve();
        this.setData({
          isLoading: false
        })
      }).catch(()=>{
        this.setData({
          isLoading: false
        })
      })
    })
  },

  onPullDownRefresh() {
    this.setData({
      pn: 1,
      hasMore: true
    });
    this.getAllData().then(()=>{
      wx.stopPullDownRefresh();
    });
  },

  getMoreContent() {
    return fetch.get('/category/books', {
      pn: this.data.pn
    })
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      console.log(this.data.pn)
      this.getMoreContent().then(res => {
        let newArr = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: newArr
        })
        if (res.data.length < 2) {
          this.setData({ hasMore: false })
        }
      })
    }
  },

  jumpBook(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/detail?id=${id}`,
    })
  },

  onShareAppMessage: function () {
  }
})