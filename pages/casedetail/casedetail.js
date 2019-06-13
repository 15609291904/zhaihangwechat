// pages/casedetail/casedetail.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    claimdetail:{},
    createtime:"",
    createtime_data:"",
    createtime_time:"",
    // consulttime:"",
    // donetime:"",
    ordertime_data:"",
    ordertime_time:"",
    donetime_data:"",
    donetime_time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const claim_Id = options.claim_id;
    that.getcasedetail(claim_Id);
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
  getcasedetail(claim_id){
    var that = this;
    wx.request({
      url: 'https://app.zhaihang.com/api/claim/detail?claim_id=' + claim_id,
      data: {

      },
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        // app.globalData.allData = res.data.data;
        console.log(res.data.data)
        that.setData({
          claimdetail: res.data.data,
          createtime: util.formatTime(res.data.data.createtime, "Y-M-D"),
          createtime_data: util.formatTime(res.data.data.createtime, "M-D"),
          createtime_time: util.formatTime(res.data.data.createtime, "h:m"),
          ordertime_data: util.formatTime(res.data.data.ordertime, "M-D"),
          ordertime_time: util.formatTime(res.data.data.ordertime, "h:m"),
          donetime_data: util.formatTime(res.data.data.donetime, "M-D"),
          donetime_time: util.formatTime(res.data.data.donetime, "h:m"),
        })
      },
      fail: function () {
        console.log("error")
      }
    })
  }
})