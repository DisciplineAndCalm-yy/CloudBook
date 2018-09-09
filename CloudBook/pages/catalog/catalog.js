// pages/catalog/catalog.js
import {fetch} from '../../utils/util.js';
Page({

  data: {
    bookId: '',
    catalogData: [],
  },

  onLoad: function (options) {
    console.log("Catalog--->options--->",options)
    this.setData({
      bookId: options.id
    });
    this.getCatalog();
  },

  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log("Catalog--->getCatalog--->",res)
      this.setData({
        catalogData: res.data
      })
      console.log("Catalog--->CatalogData",this.data.catalogData)
    })
  },

  onShareAppMessage: function () {
  
  }
})