// pages/caseshow/caseshow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    claimlist:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.getcaseshow();
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
  todetail:function(e){
    var casedetailid = e.currentTarget.dataset.casedetailid;
    console.log(casedetailid)
    wx.navigateTo({
      url: '/pages/casedetail/casedetail?claim_id=' + casedetailid
    })
  },
  getcaseshow:function(){
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
        // app.globalData.allData = res.data.data;
        // console.log(res.data.data.claim.list)
        that.setData({
          claimlist: res.data.data.claim.list
        })
      },
      fail: function () {
        console.log("error")
      }
    })
  },
  rounding(num){
    return parseInt(num);
  }
})