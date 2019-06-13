// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payimg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.store_id)
    that.getpayimg(options.store_id)
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
  getpayimg(store_id){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/storeCodeImg',
          data: {
            store_id: store_id
          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            // console.log(res.data.data)
            that.setData({
              payimg:res.data.data
            })
          }
        })
      },
    })
  }
})