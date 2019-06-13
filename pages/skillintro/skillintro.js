// pages/skillintro/skillintro.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlogin:false,
    showclaim:false,
    showfind:false,
    showcase:false,
    shownews:false,
    showreal:false,
    showbroker:false,
    showclaims:false,
    showorder:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  showorhidelogin(){
    if(this.data.showlogin==false){
      this.setData({
        showlogin:true
      })
    }else{
      this.setData({
        showlogin: false
      })
    }
  },
  showorhideclaim(){
    if (this.data.showclaim == false) {
      this.setData({
        showclaim: true
      })
    } else {
      this.setData({
        showclaim: false
      })
    }
  },
  showorhidefind(){
    if (this.data.showfind == false) {
      this.setData({
        showfind: true
      })
    } else {
      this.setData({
        showfind: false
      })
    }
  },
  showorhidecase(){
    if (this.data.showcase == false) {
      this.setData({
        showcase: true
      })
    } else {
      this.setData({
        showcase: false
      })
    }
  },
  showorhidenews(){
    if (this.data.shownews == false) {
      this.setData({
        shownews: true
      })
    } else {
      this.setData({
        shownews: false
      })
    }
  },
  showorhidereal(){
    if (this.data.showreal == false) {
      this.setData({
        showreal: true
      })
    } else {
      this.setData({
        showreal: false
      })
    }
  },
  showorhidebroker(){
    if (this.data.showbroker == false) {
      this.setData({
        showbroker: true
      })
    } else {
      this.setData({
        showbroker: false
      })
    }
  },
  showorhideclaims(){
    if (this.data.showclaims == false) {
      this.setData({
        showclaims: true
      })
    } else {
      this.setData({
        showclaims: false
      })
    }
  },
  showorhideorder(){
    if (this.data.showorder == false) {
      this.setData({
        showorder: true
      })
    } else {
      this.setData({
        showorder: false
      })
    }
  }
})