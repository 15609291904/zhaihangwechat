// pages/myclaims/myclaims.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    searchForm: {
      type: 2,
      cache: 'false'
    },
    claimslist: [],
    userinfo: "",
    cancleclaim: false,
    broker: [],
    broker_id: "",
    entrust_uid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getclaims();
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          userinfo: res.data
        })
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
  getclaims() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://app.zhaihang.com/api/claim/myClaims',
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
              claimslist: res.data.data.list
            })
          }
        })
      },
    })
  },
  handlepay(e) {
    var that = this;
    if (!that.data.userinfo || !that.data.userinfo.group_id) {
      wx.navigateTo({
        url: '/pages/realname/realname',
      })
      return
    } else if (e.currentTarget.dataset.store_id == null) {
      wx.showToast({
        title: '请选择经纪人',
        icon: "none"
      })
      return
    } else if (e.currentTarget.dataset.completion === 1) {
      wx.showToast({
        title: '该订单已完成',
        icon: "none"
      })
      return
    } else if (e.currentTarget.dataset.completion === 0) {
      wx.navigateTo({
        url: '/pages/pay/pay?store_id=' + e.currentTarget.dataset.store_id,
      })
    }
  },
  //查看进度
  todetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/casedetail/casedetail?claim_id=' + id,
    })
  },
  //取消订单
  cancleclaim(e) {
    var that = this;
    var is_invited = e.currentTarget.dataset.is_invited;
    var real_name = e.currentTarget.dataset.real_name;
    if (real_name) {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          // console.log(res.data)
          that.setData({
            token: res.data
          })
          wx.request({
            url: 'https://app.zhaihang.com/api/claim/chanelOrder',
            data: {
              claim_id: e.currentTarget.dataset.id
            },
            method: "GET",
            header: {
              'content-type': 'application/json', // 默认值
              'token': res.data
            },
            success(res) {
              // console.log(res)
              wx.showToast({
                title: '订单取消成功',
                icon: "none"
              })
              that.onLoad()
            }
          })
        },
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          // console.log(res.data)
          that.setData({
            token: res.data
          })
          wx.request({
            url: 'https://app.zhaihang.com/api/claim/closeClaim',
            data: {
              claim_id: e.currentTarget.dataset.id
            },
            method: "GET",
            header: {
              'content-type': 'application/json', // 默认值
              'token': res.data
            },
            success(res) {
              // console.log(res.data)
              wx.showToast({
                title: '订单取消成功',
                icon: "none"
              })
              that.onLoad()
            }
          })
        },
      })
    }
  },
  // 查看协议
  lookagreement(e) {
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
            // console.log(res.data.data.list)
            that.setData({
              broker: res.data.data.list
            })
            var datas = that.data.broker
            // console.log(e.currentTarget.dataset.realname)
            for (var i = 0; i < datas.length; i++) {
              if (datas[i].real_name == e.currentTarget.dataset.realname) {
                that.setData({
                  broker_id: datas[i].id
                })
              }
            }
            wx.navigateTo({
              url: '/pages/viewagreement/viewagreement?claim_id=' + e.currentTarget.dataset.id + "&broker_uid=" + that.data.broker_id + "&entrust_uid=" + that.data.entrust_uid,
            })
          }
        })
      },
    })

  },
  //债权
  tozhaiquan() {
    wx.navigateBack({
      url: '/pages/myclaims/myclaims',
    })
  },
  tochoosebroker(e) {
    var claim_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/choosebroker/choosebroker?claim_id=' + claim_id,
    })
  }
})