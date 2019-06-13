// pages/claimbind/claimbind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      {
        id: 1,
        name: '债权人'
      },
      {
        id: 2,
        name: '债务人'
      }
    ],
    form: {
      claim_id:"",
      type: 1,
      mobile: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.form.claim_id = options.claim_id;
    // console.log(that.data.form)
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
  bindtype(e){
    var that = this;
    that.setData({
      'form.type': e.currentTarget.dataset.type
    })
    // console.log(that.data.form.type)
  },
  phoneblur(e){
    var that = this;
    var value = e.detail.value;
    if(value.length<11){
      wx.showToast({
        title: '手机号长度不能小于11位',
        icon:'none'
      })
    }else if(value.length>11){
      wx.showToast({
        title: '手机号长度不能超过11位',
        icon: 'none'
      })
    }else{
      that.data.form.mobile=value;
      console.log(that.data.form)
    }
  },
  bindclaim(){
    var that = this;
    if(that.data.form.mobile==""){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    }else{
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: 'https://app.zhaihang.com/api/claim/bindContact',
            data: {
              form:{}
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
                  title: '绑定成功',
                  icon: 'success'
                })
              }else{
                wx.showToast({
                  title: '该用户不存在',
                  icon: 'none'
                })
              }
            }
          })
        }
      })
    }
  }
})