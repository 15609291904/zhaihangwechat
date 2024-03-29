// pages/orderdetail/orderdetail.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    claim_id:"",
    orderdetail:{},
    createtime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      claim_id: options.claim_id
    })
    that.getorderdetail()
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
  // claim/order
  getorderdetail(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/order',
          data: {
            claim_id: that.data.claim_id
          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            console.log(res)
            that.setData({
              orderdetail:res.data.data,
              createtime: util.formatTime(res.data.data.createtime, "Y-M-D"),
            })
          }
        })
      },
    })
  }
})