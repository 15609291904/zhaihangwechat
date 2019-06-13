// pages/advermanager/advermanager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advinfo:{},
    consult_amount:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getadv();
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
  getadv(){
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://app.zhaihang.com/api/broker/getAdv',
          data: {
            
          },
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            console.log(res.data.data);
            that.setData({
              advinfo:res.data.data,
              consult_amount: parseInt(res.data.data.consult_amount)
            })
            // console.log(that.data.consult_amount)
          }
        })
      },
    })
  },
  //删除
  deleteadv() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除这个广告',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.getStorage({
            key: 'token',
            success: function (res) {
              // console.log(res.data)
              that.setData({
                token: res.data
              })
              wx.request({
                url: 'https://app.zhaihang.com/api/broker/advDel',
                data: {

                },
                method: "GET",
                header: {
                  'content-type': 'application/json', // 默认值
                  'token': res.data
                },
                success(res) {
                  console.log(res.data);
                  if(res.data.code==0){
                    wx.showToast({
                      title: '删除失败',
                      icon:'none'
                    })
                  }else{
                    wx.showToast({
                      title: '删除成功',
                    })
                    that.onLoad();
                  }
                }
              })
            },
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
          return;
        }
      }
    })
    
  },
  //刷新
  reload(){
    var that = this;
    that.onLoad();
  },
  //编辑修改
  editadv(){
    wx.navigateTo({
      url: '/pages/addadvert/addadvert',
    })
  }
})