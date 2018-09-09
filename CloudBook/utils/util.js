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
          if (res.header.Token || res.header.token){
            wx.setStorageSync('token', res.header.Token || res.header.token)
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
  },
  delete(url, data) {
    return this.http(url, "DELETE", data)
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

const transformtime = function (t) {
  var date = new Date(t);
  var updatetime = date.getTime();
  let time = new Date().getTime() - updatetime
  let arr = []
  let str = 999;
  let str2 = "刚刚"
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 365)))
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 30)))
  arr.push(Math.floor(time / (1000 * 3600 * 24)))
  arr.push(Math.floor(time / (1000 * 3600)))
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      str = i;
      switch (i) {
        case 0:
          str2 = "年"
          break
        case 1:
          str2 = "月"
          break
        case 2:
          str2 = "天"
          break
        case 3:
          str2 = "小时"
          break
        default:
          str2 = "刚刚"
          break
      }
      break
    }
  }
  if (str == 999) {
    return str2
  }
  return arr[str] + str2 + "前"
}

exports.login = login;
exports.fetch = fetch;
exports.transformtime = transformtime;