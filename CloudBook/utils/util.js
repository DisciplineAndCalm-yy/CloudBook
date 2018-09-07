const baseUrl = 'https://m.yaojunrong.com';

const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method,
        data,
        header,
        success(res) {
          console.log("header--->",res)
          if (res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, "GET", data)
  },
  post(url, data) {
    return this.http(url, "POST", data)
  }
}

const login = () => {
  wx.login({
    success(res){
      fetch.post('/login', {
        code:res.code,
        appid: "wxc6fbc745eef9eeaf",
        secret: "673f5918d9b47003b577e65253e1b11e"
      }).then(res => {
        console.log("login--->",res)
      })
    }
  })
}

exports.login = login;
exports.fetch = fetch;