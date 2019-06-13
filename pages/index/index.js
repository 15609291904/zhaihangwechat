//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls: [
      'http://pic12.zhaihang.com/uploads/20190326/a3a6d50e15dcabcbeb7c5f4893b64624.jpg',
      'http://pic12.zhaihang.com/uploads/20190419/61a26584e4ff17acc6e72507c5aa0ea4.jpg',
      'http://pic12.zhaihang.com/uploads/20190326/a3a6d50e15dcabcbeb7c5f4893b64624.jpg',
      'http://pic12.zhaihang.com/uploads/20190419/61a26584e4ff17acc6e72507c5aa0ea4.jpg'
    ],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    indicatorDots: true,
    indicatorColor: "rgba(246, 168, 2, 0.2)",
    indicatorActiveColor: "#F6A802",
    indexinfo:{},
    userinfo:""
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          userinfo:res.data
        })
      },
    })
    that.getHomeConfigMethod();
  },
  getHomeConfigMethod: function () {
    var that = this;
    wx.request({
      url: 'https://app.zhaihang.com/api/index/index',
      data: {

      },
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        app.globalData.allData = res.data.data;
        console.log(res)
        that.setData({
          indexinfo: res.data.data
        })
      },
      fail: function () {
        console.log("error")
      }
    })
  },
  topage: function (pageurl) {
    var that = this;
    if (that.data.userinfo == "") {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/caseshow/caseshow'
      })
    }
  },
  tofindbroker: function () {
    var that = this;
    if (that.data.userinfo == "") {
      wx.showToast({
        title: '请登录后操作',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '/pages/findbroker/findbroker'
      })
    }
  },
  toreleaseclaim() {
    var that = this;
    if(that.data.userinfo==""){
      wx.showToast({
        title: '请登录后操作',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/releaseclaim/releaseclaim',
      })
    }
  }
  
});
