// pages/book-home/book-home.js
import {fetch} from '../../utils/util.js'; 
Page({

  data: {
    isLoading: false,
    readBook: [],
    bookId: '',
    num: ''
  },

  onLoad: function(options) {
    this.getData();
  },

  getData() {
    this.setData({
      isLoading:true
    })
    fetch.get('/readList').then(res => {
      console.log('Home--->readList--->',res)
      this.setData({
        readBook: res.data,
        isLoading: false
      })
      res.data.forEach(item => {
        item.num = Math.round((item.title.index / item.title.total) * 100)
        this.setData({
          num: item.num
        });
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    });
  },

  jumpBook() {
    this.data.readBook.forEach(item => {
      let bookId = item.title.bookId
      wx: wx.navigateTo({
        url: `/pages/details/detail?id=${bookId}`,
      })
    })
  },

  jumpContinue(event) {
    console.log(event)
    let id = event.currentTarget.dataset.id
    let titleid = event.currentTarget.dataset.titleid
    console.log(id)
    console.log(titleid)
    fetch.get(`/titles/${id}`).then(res => {
      console.log("Book-home--->catalog--->", res)
      wx.navigateTo({
        url: `/pages/book/book?bookId=${id}&id=${titleid}`,
      })
    })
  },
  
  onPullDownRefresh() {
    this.getData();
  },

  onShow() {
    this.getData();
  },

  onShareAppMessage: function() {

  }
})