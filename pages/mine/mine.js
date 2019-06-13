// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getuserinfo();
  },
  getuserinfo(){
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success(res) {
        // console.log(res.data)
        that.setData({
          userinfo: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  toaboutus(){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus'
    })
  },
  logout(){
    var that = this;
    wx.removeStorage({
      key: 'userinfo',
      success(res) {
        console.log(res)
        wx.showToast({
          title: '退出登录',
          icon: 'success',
          duration: 2000,
          success:function(){
            that.setData({
              userinfo:""
            })
            that.onLoad()
          }
        })
      }
    })
    wx.removeStorage({
      key: 'token',
      success: function(res) {},
    })
  },
  //去编辑资料
  toeditinfo(){
    wx.navigateTo({
      url: '/pages/editinfo/editinfo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //广告管理
  advermanager(){
    wx.navigateTo({
      url: '/pages/advermanager/advermanager',
    })
  },
  // 跳转到实名认证
  realname(){
    var that = this;
    if(that.data.userinfo==''){
      wx.showToast({
        title: '请登录',
        icon:"none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/realname/realname?state=' + that.data.userinfo.is_cert,
      })
    }
  },
  // 跳转到申请经纪人页面
  tobebroker(){
    wx.navigateTo({
      url: '/pages/tobebroker/tobebroker',
    })
  },
  //跳转到我的债事
  tomyclaims() {
    var that = this;
    if (that.data.userinfo == ''){
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/myclaims/myclaims',
      })
    }
  },
  // 跳转债事关联
  claimabout(){
    var that = this;
    if (that.data.userinfo == '') {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/claimabout/claimabout',
      })
    }
  },
  // 我的接单
  totakeorder(){
    var that = this;
    if (that.data.userinfo == '') {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
    } else {
      wx.navigateTo({
        url: '/pages/takeordered/takeordered',
      })
    }
  }
})