// pages/editnickname/editnickname.js
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
    that.getuserinfo()    
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
  setnickname(){

  },
  edit(e){
    var that = this;
    // console.log(e.detail.value)
    that.data.userinfo.nickname = e.detail.value;
  },
  setnickname() {
    var that = this;
    wx.setStorage({
      key: 'userinfo',
      data: that.data.userinfo,
      success(res) {
        // console.log(that.data.userinfo)
        wx.getStorage({
          key: 'token',
          success: function (res) {
            // console.log(res.data)
            that.setData({
              token: res.data
            })
            wx.request({
              url: 'https://app.zhaihang.com/api/user/profile',
              data: {
                avatar: that.data.userinfo.avatar,
                nickname: that.data.userinfo.nickname,
                bio: that.data.userinfo.bio,
                gender: that.data.userinfo.gender
              },
              method: "GET",
              header: {
                'content-type': 'application/json', // 默认值
                'token': res.data
              },
              success(res) {
                console.log(res.data)
                wx.navigateBack({
                  delta: 1,
                })

              }
            })
          },
        })
      }
    })
  }
})