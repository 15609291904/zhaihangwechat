// pages/takeorder/takeorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    takeorderlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.gettakeorder()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.gettakeorder()

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
  // 跳转到已接单
  toyijd(){
    wx.navigateBack({
      delta: 1,
    })
  },
  gettakeorder(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/myInvited',
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
              takeorderlist: res.data.data.list
            })
          }
        })
      },
    })
  },
  //接单
  takeorder(e) {
    var that = this;
    var claim_id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    console.log(claim_id+"..."+type);
    wx.showModal({
      title: '提示',
      content: '确定接单？',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          // claim / createOrder
          wx.getStorage({
            key: 'token',
            success: function (res) {
              wx.request({
                url: 'https://app.zhaihang.com/api/claim/createOrder',
                data: {
                  claim_id: claim_id,
                  type:type
                },
                method: "GET",
                header: {
                  'content-type': 'application/json', // 默认值
                  'token': res.data
                },
                success(res) {
                  console.log(res)
                  if(res.data.code===1){
                    wx.showToast({
                      title: '接单成功',
                    })
                    that.onLoad()
                    that.gettakeorder()
                  }else{
                    wx.showToast({
                      title: '接单失败',
                      icon:"none"
                    })
                  }
                }
              })
            },
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 去详情
  todetail(e){
    wx.navigateTo({
      url: '/pages/casedetail/casedetail?claim_id='+e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})