// pages/addadvert/addadvert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelList:[],
    form: {
      money: '',
      labels: [],
      bio: ''
    },
    index:"",
    advinfo:{

    },
    title_id:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.onReady()
    that.getadv()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.gettitle()
  },

  getadv() {
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
            console.log(res.data);
            // that.data.form.money = res.data.data.consult_amount;
            // that.data.form.bio = res.data.data.bio;
            // console.log(that.data.form)
            that.setData({
              advinfo:res.data.data
            })
          }
        })
      },
    })
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
  //获取服务标签
  gettitle(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          token: res.data
        })
        wx.request({
          url: 'https://app.zhaihang.com/api/broker/advView',
          data:{
            
          },
          methods:"GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            // console.log(res.data);
            that.setData({
              labelList:res.data.data
            })
          }
        })
      }
    })
  },
  getadvert_init(){
    var that = this;
  },
  selecttitle(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var lables=[];
    lables.push(id)
    that.setData({
      'form.labels': lables
    })
  },
  priceblur(e){
    // console.log(e.detail.value)
    var that = this;
    that.setData({
      'form.money': e.detail.value 
    })
  },
  bindTextAreaBlur(e) {
    var that = this;
    that.setData({
      'form.bio': e.detail.value
    })
  },
  addadvert_btn(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        that.setData({
          token: res.data
        })
        console.log(that.data.form)
        var data1 = {}
        data1.money = that.data.form.money;
        for (var i = 0; i < that.data.form.labels.length; i++) {
          data1["labels[" + i + "]"] = that.data.form.labels[i];
        }
        data1.bio = that.data.form.bio;
        wx.request({
          url: 'https://app.zhaihang.com/api/broker/advAdd',
          data:data1,
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'token': res.data
          },
          success(res) {
            console.log(res.data);
            wx.showToast({
              title: '广告发布成功',
              icon:'success'
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      },
    })
  },

})