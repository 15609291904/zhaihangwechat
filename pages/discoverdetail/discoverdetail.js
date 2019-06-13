// pages/discoverdetail/discoverdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articaldetail:{
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const discoverid = options.id;
    console.log(discoverid);
    that.getdiscoverdetail(discoverid);
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
  getdiscoverdetail: function (id){
    var that = this;
    wx.request({
      url: 'https://app.zhaihang.com/api/article/artDetails?artId='+id,
      data: {

      },
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          articaldetail: res.data.data
        })
      },
      fail: function () {
        console.log("error")
      }
    })
  }
})