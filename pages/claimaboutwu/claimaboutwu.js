// pages/claimabout/claimabout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    claimabout: [],
    searchForm: {
      type: 2,
      cache: 'false'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getcalimabout()
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
  // claim/debtList
  getcalimabout() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/debtList',
          data: {

          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            console.log(res.data.data.list)
            that.setData({
              claimabout: res.data.data.list
            })
          }
        })
      },
    })
  },
  //查看进度
  todetail(e) {
    var claim_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/casedetail/casedetail?claim_id=' + claim_id,
    })
  },
  handlesuccess() {
    wx.showToast({
      title: '该订单已完成',
      icon: "none"
    })
  },
  tozhaiwu() {
    wx.navigateBack({
      url: '/pages/claimabout/claimabout',
    })
  }
})