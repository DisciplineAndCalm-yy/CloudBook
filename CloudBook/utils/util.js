const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        }
      });
    })
  },
  get(url, data){
    return this.http(url, 'GET' ,data);
  }
}

exports.fetch = fetch;