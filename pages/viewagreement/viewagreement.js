// pages/viewagreement/viewagreement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      claimId:"",
      broker_uid:"",
      entrust_uid:''
    },
    agreement:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.form.claimId= options.claim_id;
    that.data.form.broker_uid = options.broker_uid;
    that.data.form.entrust_uid = options.entrust_uid
    // console.log(options.claim_id)
    that.getagreement()
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
  getagreement(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/etruesInfo',
          data: {
            claimId: that.data.form.claimId,
            broker_uid: that.data.form.broker_uid,
            entrust_uid: that.data.form.entrust_uid
          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            // console.log(res.data.data)
            that.setData({
              agreement: res.data.data
            })
          }
        })
      },
    })
  }
})