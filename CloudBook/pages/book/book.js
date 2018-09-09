// pages/book/book.js
import {fetch} from '../../utils/util.js';

Page({

  data: {
    titleId: '',
    bookId: '',
    article: {},
    title: '',
    index: '',
    catalog: [],
    isShow: false,
    font: 40,
    isLoading: false
  },

  onLoad: function(options) {
    console.log("Book--->bookOptions--->", options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    });
    this.getData();
    this.getCatalog();
    console.log("Book--->article--->", this.data.article)
  },

  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      console.log("Book--->Data--->", res)
      this.setData({
        article: res.data.article.content,
        title: res.data.title,
        index: res.data.article.index,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },

  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log("Book--->catalog--->", res)
      this.setData({
        catalog: res.data,
      })
    })
  },

  toggleCatalog() {
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },

  handleGet(event) {
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId: id,
      isShow: !this.data.isShow
    })
    this.getData()
    console.log("Book--->titleId", this.data.titleId)
  },

  handleAdd() {
    if (this.data.font >= 80) {
      wx.showModal({
        title: '温馨怒斥',
        content: '这么大还看不见你瞎吗？',
        showCancel: false
      })
    } else {
      this.setData({
        font: this.data.font + 2
      })
    }
  },

  handleRuduce() {
    if (this.data.font <= 24) {
      wx.showModal({
        title: '温馨提示',
        content: '字体太小伤眼睛哦！',
        showCancel: false
      })
    } else {
      this.setData({
        font: this.data.font - 2
      })
    }
  },

  handleNext() {
    let catalog = this.data.catalog;
    if(catalog[this.data.index + 1]){
      this.setData({
        titleId: catalog[this.data.index + 1]._id
      })
      this.getData()
    } else {
      wx.showToast({
        title: '恭喜读完本书！',
      })
    }
  },

  handlePrev() {
    let catalog = this.data.catalog;
    if(this.data.index - 1 < 0){
      wx.showToast({
        title: '已经是第一章了',
      })
    } else {
      this.setData({
        titleId: catalog[this.data.index - 1]._id
      })
      this.getData()
    }
  },

  onShareAppMessage: function() {

  }
})