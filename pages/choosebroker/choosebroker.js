// pages/choosebroker/choosebroker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brokerlists: [],
    brokerid:[],
    claim_id:'',
    user_info:''
  },

  getbrokerlists() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'https://app.zhaihang.com/api/broker/lists',
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
              brokerlists: res.data.data.list
            })
          }
        })
      },
    })
  },
  selectradio(e){
    wx.showToast({
      title: '只能邀请一位经纪人',
      icon:'none'
    })
    var broker_id=e.currentTarget.dataset.id;
    // this.setData({
    //   brokerid:broker_id,
    // })
    this.data.brokerid.push(broker_id)
    console.log(this.data.brokerid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getbrokerlists();
    that.setData({
      claim_id: options.claim_id
    })
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          user_info:res.data
        })
        console.log(res.data);
        console.log(that.data.user_info)
      },
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
  invitebroker() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(that.data)
        var data1 = {}
        data1.claim_id = that.data.claim_id
        for(var i=0;i<that.data.brokerid.length;i++){
          data1["broker_ids[" +i + "]"] = that.data.brokerid[i];
        }

          wx.request({
            url: 'https://app.zhaihang.com/api/broker/invite',
            method: 'POST',
            data: data1,
            header: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'token': res.data
            },
            success(res) {
              console.log(res.data)
              console.log(that.data.user_info.id)
                wx.navigateTo({
                  url: '/pages/agreement/agreement?claim_id=' + that.data.claim_id + "&broker_uid=" + that.data.brokerid[0] + "&entrust_uid=" + that.data.user_info.id,
                })              
            }
          })
      },
    })
  },
  todetail(e){
    wx.navigateTo({
      url: '/pages/brokerdetail/brokerdetail?id='+e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})