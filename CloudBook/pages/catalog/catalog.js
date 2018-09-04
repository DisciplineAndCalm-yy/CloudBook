// pages/catalog/catalog.js
import {fetch} from '../../utils/util.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId:'',
    catalogData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    })
    this.getData();
  },
  
  getData(){
    fetch.get(`/titles/${this.data.bookId}`).then(res =>{
      console.log(res);
      this.setData({
        catalogData:res.data
      })
    })
  },
  onShareAppMessage: function () {
  
  }
})