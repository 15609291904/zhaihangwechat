// pages/takeordered/takeordered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    orderlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getorder()
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
  getorder(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/myOrder',
          data: {

          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            // console.log(res)
            that.setData({
              orderlist: res.data.data.list
            })
          }
        })
      },
    })
  },
  // claim/claimSucc
  suresuccess(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认完成该债事',
      success(res) {
        if (res.confirm) {
          var claimID = e.currentTarget.dataset.id;
          // console.log(claimID)
          wx.getStorage({
            key: 'token',
            success: function (res) {
              // console.log(res.data)
              that.setData({
                token: res.data
              })
              wx.request({
                url: 'https://app.zhaihang.com/api/claim/claimSucc',
                data: {
                  claimID: claimID
                },
                method: "GET",
                header: {
                  'content-type': 'application/json', // 默认值
                  'token': res.data
                },
                success(res) {
                  console.log(res.data)
                  if(res.data.code==1){
                    wx.showToast({
                      title: '完成债事',
                    })
                    that.onLoad()
                  } else {
                    wx.showToast({
                      title: '操作失败',
                      icon:"none"
                    })
                  }
                }
              })
            },
          })

          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 跳转到待处理
  toweijd(){
    wx.navigateTo({
      url: '/pages/takeorder/takeorder',
    })
  },
  //债事绑定
  claimbind(e){
    wx.navigateTo({
      url: '/pages/claimbind/claimbind?claim_id='+e.currentTarget.dataset.id,
    })
  },
  //委托协议
  toviewagree(e){
    wx.navigateTo({
      url: '/pages/viewagreement/viewagreement?claim_id=' + e.currentTarget.dataset.id,
    })
  },
  // 查看订单详情
  toorderdetail(e) {
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?claim_id=' + e.currentTarget.dataset.id,
    })
  }
})