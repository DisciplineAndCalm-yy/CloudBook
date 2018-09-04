//index.js
import {fetch} from "../../utils/util.js";

const app = getApp()

Page({
  data: {
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500
  },
  onLoad(){
    this.getData();
    this.getContent();
  },
  getData (){
    fetch.get('/swiper').then(res => {
      this.setData({
        swiperData:res.data
      })
    })
  },
  getContent() {
    fetch.get('/category/books').then(res =>{
      console.log(res);
      this.setData({
        mainContent:res.data
      })
    })
  },
  jumpBook(id) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/details',
    })
  }
})